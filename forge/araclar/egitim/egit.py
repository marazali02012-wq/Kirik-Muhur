"""Forge-Mini: kendi eğittiğimiz küçük, koşullu gizli-uzay (latent) difüzyon modeli.

Veri: yalnızca Forge'un kendi prosedürel 3B savaşçı çizimleri (veri_uret.js). Dış resim, dış model çıktısı yok.
Gizli uzay: TAESD (MIT lisanslı, madebyollin/taesd) kodlayıcı/çözücü — SD uyumlu 4 kanallı, 1/8 çözünürlük.
Model: ~5M parametreli UNet, v-tahmini, kosinüs gürültü takvimi, 9 kategorik koşul (yön, silah, zırh, miğfer,
pelerin, kalkan, kumaş rengi, metal tonu, poz), %10 koşul düşürme (sınıflandırıcısız rehberlik için).
Çıktılar: unet.onnx, taesd_decoder.onnx, config.json (takvim, ölçek, sözlük) — tarayıcıda ONNX Runtime Web (WASM, CPU) ile çalışır.

Kullanım:
  python egit.py kodla  <veri_klasörü> <taesd_klasörü> <çıktı>
  python egit.py egit   <çıktı> [adım] [dakika]
  python egit.py aktar  <çıktı> <taesd_klasörü>
  python egit.py ornek  <çıktı>
"""
import json, math, os, sys, time
import numpy as np
import torch, torch.nn as nn, torch.nn.functional as Fn
from PIL import Image

torch.set_num_threads(int(os.environ.get('FORGE_THREADS', '4')))

# ---------------- TAESD mimarisi (MIT, madebyollin/taesd ile birebir aynı katmanlar) ----------------
def conv(n_in, n_out, **kw): return nn.Conv2d(n_in, n_out, 3, padding=1, **kw)
class Clamp(nn.Module):
    def forward(self, x): return torch.tanh(x / 3) * 3
class Block(nn.Module):
    def __init__(self, n_in, n_out):
        super().__init__()
        self.conv = nn.Sequential(conv(n_in, n_out), nn.ReLU(), conv(n_out, n_out), nn.ReLU(), conv(n_out, n_out))
        self.skip = nn.Conv2d(n_in, n_out, 1, bias=False) if n_in != n_out else nn.Identity()
        self.fuse = nn.ReLU()
    def forward(self, x): return self.fuse(self.conv(x) + self.skip(x))
def Encoder():
    return nn.Sequential(conv(3, 64), Block(64, 64), conv(64, 64, stride=2, bias=False), Block(64, 64), Block(64, 64), Block(64, 64),
                         conv(64, 64, stride=2, bias=False), Block(64, 64), Block(64, 64), Block(64, 64),
                         conv(64, 64, stride=2, bias=False), Block(64, 64), Block(64, 64), Block(64, 64), conv(64, 4))
def Decoder():
    return nn.Sequential(Clamp(), conv(4, 64), nn.ReLU(),
                         Block(64, 64), Block(64, 64), Block(64, 64), nn.Upsample(scale_factor=2), conv(64, 64, bias=False),
                         Block(64, 64), Block(64, 64), Block(64, 64), nn.Upsample(scale_factor=2), conv(64, 64, bias=False),
                         Block(64, 64), Block(64, 64), Block(64, 64), nn.Upsample(scale_factor=2), conv(64, 64, bias=False),
                         Block(64, 64), conv(64, 3))
def load_taesd(d):
    e, dd = Encoder(), Decoder()
    e.load_state_dict(torch.load(os.path.join(d, 'taesd_encoder.pth'), map_location='cpu', weights_only=True))
    dd.load_state_dict(torch.load(os.path.join(d, 'taesd_decoder.pth'), map_location='cpu', weights_only=True))
    return e.eval(), dd.eval()

# ---------------- Koşul sözlüğü ----------------
ATTR_KEYS = ['dir', 'weapon', 'armor', 'helmet', 'cape', 'shield', 'clothHue', 'metal', 'pose']
ATTR_SIZES = [8, 8, 4, 3, 2, 2, 15, 4, 3]

# ---------------- UNet ----------------
def gn(c): return nn.GroupNorm(8, c)
class Res(nn.Module):
    def __init__(self, cin, cout, emb):
        super().__init__()
        self.n1, self.c1 = gn(cin), nn.Conv2d(cin, cout, 3, padding=1)
        self.e = nn.Linear(emb, cout)
        self.n2, self.c2 = gn(cout), nn.Conv2d(cout, cout, 3, padding=1)
        self.skip = nn.Conv2d(cin, cout, 1) if cin != cout else nn.Identity()
    def forward(self, x, e):
        h = self.c1(Fn.silu(self.n1(x))) + self.e(e)[:, :, None, None]
        h = self.c2(Fn.silu(self.n2(h)))
        return h + self.skip(x)
class Attn(nn.Module):
    def __init__(self, c):
        super().__init__(); self.n = gn(c); self.qkv = nn.Conv2d(c, c * 3, 1); self.o = nn.Conv2d(c, c, 1); self.c = c
    def forward(self, x):
        B, C, H, W = x.shape
        q, k, v = self.qkv(self.n(x)).reshape(B, 3, C, H * W).unbind(1)
        a = torch.softmax(torch.bmm(q.transpose(1, 2), k) / math.sqrt(C), dim=-1)
        h = torch.bmm(v, a.transpose(1, 2)).reshape(B, C, H, W)
        return x + self.o(h)
class UNet(nn.Module):
    def __init__(self, ch=(64, 128, 192), emb=256):
        super().__init__()
        self.temb = nn.Sequential(nn.Linear(128, emb), nn.SiLU(), nn.Linear(emb, emb))
        self.cemb = nn.ModuleList([nn.Embedding(n + 1, emb) for n in ATTR_SIZES])  # +1: boş (koşulsuz) indeks
        self.inp = nn.Conv2d(4, ch[0], 3, padding=1)
        self.d1 = nn.ModuleList([Res(ch[0], ch[0], emb), Res(ch[0], ch[0], emb)]); self.ds1 = nn.Conv2d(ch[0], ch[0], 3, stride=2, padding=1)
        self.d2 = nn.ModuleList([Res(ch[0], ch[1], emb), Res(ch[1], ch[1], emb)]); self.ds2 = nn.Conv2d(ch[1], ch[1], 3, stride=2, padding=1)
        self.d3 = nn.ModuleList([Res(ch[1], ch[2], emb), Res(ch[2], ch[2], emb)]); self.a3 = Attn(ch[2])
        self.mid1, self.mida, self.mid2 = Res(ch[2], ch[2], emb), Attn(ch[2]), Res(ch[2], ch[2], emb)
        self.u3 = nn.ModuleList([Res(ch[2] * 2, ch[2], emb), Res(ch[2] * 2, ch[2], emb)]); self.ua3 = Attn(ch[2]); self.us3 = nn.Conv2d(ch[2], ch[1], 3, padding=1)
        self.u2 = nn.ModuleList([Res(ch[1] * 2, ch[1], emb), Res(ch[1] * 2, ch[1], emb)]); self.us2 = nn.Conv2d(ch[1], ch[0], 3, padding=1)
        self.u1 = nn.ModuleList([Res(ch[0] * 2, ch[0], emb), Res(ch[0] * 2, ch[0], emb)])
        self.out = nn.Sequential(gn(ch[0]), nn.SiLU(), nn.Conv2d(ch[0], 4, 3, padding=1))
    def forward(self, x, t, cond):
        half = 64
        fr = torch.exp(-math.log(10000) * torch.arange(half, dtype=torch.float32) / half)
        a = t[:, None].float() * 1000.0 * fr[None]
        e = self.temb(torch.cat([torch.sin(a), torch.cos(a)], 1))
        for i, emb in enumerate(self.cemb): e = e + emb(cond[:, i])
        h = self.inp(x); s = []
        for r in self.d1: h = r(h, e); s.append(h)
        h = self.ds1(h)
        for r in self.d2: h = r(h, e); s.append(h)
        h = self.ds2(h)
        for r in self.d3: h = r(h, e); s.append(h)
        h = self.a3(h)
        h = self.mid2(self.mida(self.mid1(h, e)), e)
        for r in self.u3: h = r(torch.cat([h, s.pop()], 1), e)
        h = self.us3(Fn.interpolate(self.ua3(h), scale_factor=2.0, mode='nearest'))
        for r in self.u2: h = r(torch.cat([h, s.pop()], 1), e)
        h = self.us2(Fn.interpolate(h, scale_factor=2.0, mode='nearest'))
        for r in self.u1: h = r(torch.cat([h, s.pop()], 1), e)
        return self.out(h)

# ---------------- Takvim ----------------
T_STEPS = 1000
def cosine_abar(T=T_STEPS, s=0.008):
    t = np.arange(T + 1) / T
    f = np.cos((t + s) / (1 + s) * math.pi / 2) ** 2
    ab = f / f[0]
    betas = np.clip(1 - ab[1:] / ab[:-1], 0, 0.999)
    return np.cumprod(1 - betas).astype(np.float64)  # uzunluk T, indeks k -> t=(k+1)/T
ABAR = cosine_abar()

def ddim_sample(model, cond, steps=20, guidance=1.0, seed=0, shape=(4, 32, 32)):
    g = torch.Generator().manual_seed(seed)
    x = torch.randn((cond.shape[0],) + shape, generator=g)
    ks = np.linspace(T_STEPS - 1, 0, steps).round().astype(int)
    null = torch.tensor(ATTR_SIZES)[None].repeat(cond.shape[0], 1)
    for i, k in enumerate(ks):
        ab = float(ABAR[k]); abp = float(ABAR[ks[i + 1]]) if i + 1 < len(ks) else 1.0
        tt = torch.full((cond.shape[0],), (k + 1) / T_STEPS)
        v = model(x, tt, cond)
        if guidance != 1.0: v = model(x, tt, null) + guidance * (v - model(x, tt, null))
        x0 = math.sqrt(ab) * x - math.sqrt(1 - ab) * v
        eps = math.sqrt(1 - ab) * x + math.sqrt(ab) * v
        x = math.sqrt(abp) * x0 + math.sqrt(1 - abp) * eps
    return x

# ---------------- Komutlar ----------------
def cmd_kodla(data_dir, taesd_dir, out):
    os.makedirs(out, exist_ok=True)
    enc, dec = load_taesd(taesd_dir)
    lab = json.load(open(os.path.join(data_dir, 'labels.json')))
    labels = lab['labels']; N = len(labels)
    lat = np.zeros((N, 4, 32, 32), np.float16); cond = np.zeros((N, len(ATTR_KEYS)), np.int64)
    t0 = time.time(); B = 64
    with torch.no_grad():
        for s in range(0, N, B):
            imgs = [np.asarray(Image.open(os.path.join(data_dir, 'img', f'{i:06d}.png')).convert('RGB'), np.float32) / 255.0 for i in range(s, min(N, s + B))]
            x = torch.from_numpy(np.stack(imgs)).permute(0, 3, 1, 2)
            lat[s:s + len(imgs)] = enc(x).numpy().astype(np.float16)
            if s % 1024 == 0: print('kodlandı', s, '/', N, f'{time.time() - t0:.0f}s', flush=True)
    for i, l in enumerate(labels): cond[i] = [l[k] for k in ATTR_KEYS]
    std = float(lat.astype(np.float32).std()); mean = float(lat.astype(np.float32).mean())
    np.savez(os.path.join(out, 'latents.npz'), lat=lat, cond=cond)
    json.dump({'latentStd': std, 'latentMean': mean, 'count': N}, open(os.path.join(out, 'latent_stats.json'), 'w'))
    # TAESD gidiş-dönüş kalitesi
    with torch.no_grad():
        x = torch.from_numpy(np.stack([np.asarray(Image.open(os.path.join(data_dir, 'img', f'{i:06d}.png')).convert('RGB'), np.float32) / 255.0 for i in range(8)])).permute(0, 3, 1, 2)
        y = dec(enc(x)).clamp(0, 1)
        psnr = float(-10 * torch.log10(((x - y) ** 2).mean()))
    print('bitti', N, 'gizli std', std, 'TAESD gidiş-dönüş PSNR', round(psnr, 2), 'dB', flush=True)

def cmd_egit(out, max_steps=30000, minutes=55):
    d = np.load(os.path.join(out, 'latents.npz')); st = json.load(open(os.path.join(out, 'latent_stats.json')))
    scale = 1.0 / st['latentStd']
    lat = torch.from_numpy(d['lat'].astype(np.float32)) * scale; cond = torch.from_numpy(d['cond'])
    N = lat.shape[0]
    model = UNet(); ema = UNet(); ema.load_state_dict(model.state_dict())
    npar = sum(p.numel() for p in model.parameters())
    print('parametre', npar, flush=True)
    opt = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)
    abar = torch.from_numpy(ABAR).float()
    B = int(os.environ.get('FORGE_BATCH', '32')); t0 = time.time(); step = 0; log = []
    ck = os.path.join(out, 'ckpt.pt')
    if os.path.exists(ck):
        s = torch.load(ck, map_location='cpu', weights_only=False); model.load_state_dict(s['model']); ema.load_state_dict(s['ema']); opt.load_state_dict(s['opt']); step = s['step']; log = s.get('log', [])
        print('devam ediliyor, adım', step, flush=True)
    null = torch.tensor(ATTR_SIZES)
    while step < max_steps and (time.time() - t0) < minutes * 60:
        idx = torch.randint(0, N, (B,))
        x0 = lat[idx]; c = cond[idx].clone()
        drop = torch.rand(B, len(ATTR_SIZES)) < 0.08  # özellik başına düşürme
        alld = torch.rand(B) < 0.08
        c = torch.where(drop | alld[:, None], null[None].expand_as(c), c)
        k = torch.randint(0, T_STEPS, (B,)); ab = abar[k][:, None, None, None]
        n = torch.randn_like(x0)
        xt = ab.sqrt() * x0 + (1 - ab).sqrt() * n
        vt = ab.sqrt() * n - (1 - ab).sqrt() * x0
        lr = 3e-4 * min(1.0, (step + 1) / 500) * (0.15 + 0.85 * 0.5 * (1 + math.cos(math.pi * min(1.0, step / max_steps))))
        for gp in opt.param_groups: gp['lr'] = lr
        pred = model(xt, (k + 1).float() / T_STEPS, c)
        loss = Fn.mse_loss(pred, vt)
        opt.zero_grad(set_to_none=True); loss.backward(); torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0); opt.step()
        with torch.no_grad():
            dec_ = min(0.999, (1 + step) / (10 + step))
            for pe, pm in zip(ema.parameters(), model.parameters()): pe.mul_(dec_).add_(pm, alpha=1 - dec_)
        step += 1
        if step % 100 == 0:
            log.append([step, float(loss.detach()), time.time() - t0])
            print(f'adım {step} kayıp {float(loss):.4f} lr {lr:.2e} {time.time() - t0:.0f}s', flush=True)
        if step % 1000 == 0:
            torch.save({'model': model.state_dict(), 'ema': ema.state_dict(), 'opt': opt.state_dict(), 'step': step, 'log': log}, ck)
    torch.save({'model': model.state_dict(), 'ema': ema.state_dict(), 'opt': opt.state_dict(), 'step': step, 'log': log}, ck)
    json.dump({'steps': step, 'params': npar, 'batch': B, 'seconds': time.time() - t0, 'log': log}, open(os.path.join(out, 'egitim_gunlugu.json'), 'w'))
    print('eğitim bitti, adım', step, flush=True)

def cmd_aktar(out, taesd_dir):
    st = json.load(open(os.path.join(out, 'latent_stats.json')))
    s = torch.load(os.path.join(out, 'ckpt.pt'), map_location='cpu', weights_only=False)
    m = UNet(); m.load_state_dict(s['ema']); m.eval()
    pack = os.path.join(out, 'paket'); os.makedirs(pack, exist_ok=True)
    x = torch.randn(1, 4, 32, 32); t = torch.tensor([0.5]); c = torch.zeros(1, len(ATTR_KEYS), dtype=torch.int64)
    torch.onnx.export(m, (x, t, c), os.path.join(pack, 'unet.onnx'), input_names=['latent', 'timestep', 'cond'], output_names=['v'], opset_version=17,
                      dynamic_axes={'latent': {0: 'b', 2: 'h', 3: 'w'}, 'timestep': {0: 'b'}, 'cond': {0: 'b'}, 'v': {0: 'b', 2: 'h', 3: 'w'}}, dynamo=False)
    _, dec = load_taesd(taesd_dir)
    torch.onnx.export(dec, (torch.randn(1, 4, 32, 32),), os.path.join(pack, 'taesd_decoder.onnx'), input_names=['latent'], output_names=['image'], opset_version=17,
                      dynamic_axes={'latent': {0: 'b', 2: 'h', 3: 'w'}, 'image': {0: 'b', 2: 'H', 3: 'W'}}, dynamo=False)
    cfg = {
        'format': 'forge-mini-ldm/1', 'name': 'Forge-Mini Savaşçı v1', 'license': 'Bu projeye ait. Eğitim verisi: Forge prosedürel 3B çizimleri. Gizli uzay çözücüsü: TAESD (MIT, Ollin Boer Bohan).',
        'latentScale': 1.0 / st['latentStd'], 'latentChannels': 4, 'latentSize': 32, 'imageSize': 256, 'prediction': 'v', 'trainSteps': T_STEPS,
        'alphasCumprod': [round(float(a), 8) for a in ABAR], 'attrKeys': ATTR_KEYS, 'attrSizes': ATTR_SIZES,
        'attrValues': {'weapon': ['sword', 'axe', 'spear', 'staff', 'mace', 'hammer', 'dagger', 'none'], 'armor': ['heavy', 'medium', 'light', 'robe'], 'helmet': ['circlet', 'full', 'none'],
                       'cape': ['var', 'yok'], 'shield': ['yok', 'var'], 'metal': ['steel', 'dark', 'gold', 'bronze'], 'pose': ['idle', 'walk', 'attack'],
                       'clothHue': ['kırmızı', 'turuncu', 'sarı', 'sarı-yeşil', 'yeşil', 'yeşil2', 'turkuaz', 'gök', 'mavi', 'lacivert-mor', 'mor', 'pembe', 'siyah', 'beyaz', 'gri']},
        'trainedSteps': s['step'], 'files': {'unet': 'unet.onnx', 'decoder': 'taesd_decoder.onnx'},
    }
    json.dump(cfg, open(os.path.join(pack, 'config.json'), 'w'), ensure_ascii=False)
    # ONNX Runtime (CPU) ile PyTorch karşılaştırması
    import onnxruntime as ort
    so = ort.InferenceSession(os.path.join(pack, 'unet.onnx'), providers=['CPUExecutionProvider'])
    c = torch.tensor([[2, 0, 0, 0, 0, 0, 8, 0, 0]])
    ref = m(x, t, c).detach().numpy(); got = so.run(None, {'latent': x.numpy(), 'timestep': t.numpy(), 'cond': c.numpy()})[0]
    print('ONNX UNet en büyük fark', float(np.abs(ref - got).max()), 'boyutlar', [os.path.getsize(os.path.join(pack, f)) for f in ('unet.onnx', 'taesd_decoder.onnx')], flush=True)

def cmd_ornek(out):
    st = json.load(open(os.path.join(out, 'latent_stats.json')))
    s = torch.load(os.path.join(out, 'ckpt.pt'), map_location='cpu', weights_only=False)
    m = UNet(); m.load_state_dict(s['ema']); m.eval()
    _, dec = load_taesd(sys.argv[3] if len(sys.argv) > 3 else '/tmp/claude-0/dl/taesd')
    conds = []
    for i in range(16):
        conds.append([i % 8, [0, 1, 2, 3, 4, 0, 0, 0][i // 2 % 8], i % 4 if i % 4 != 3 else 0, i % 3, i % 2, (i // 5) % 2, [8, 0, 4, 10, 12, 13, 6, 2][i % 8], (i // 3) % 4, (i // 4) % 3])
    c = torch.tensor(conds)
    with torch.no_grad():
        z = ddim_sample(m, c, steps=20, seed=1) / (1.0 / st['latentStd'])
        img = dec(z).clamp(0, 1).permute(0, 2, 3, 1).numpy()
    grid = Image.new('RGB', (256 * 8, 256 * 2))
    for i in range(16): grid.paste(Image.fromarray((img[i] * 255).astype(np.uint8)), ((i % 8) * 256, (i // 8) * 256))
    p = os.path.join(out, f'ornek_adim{s["step"]}.png'); grid.save(p); print('örnek:', p, flush=True)

if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'kodla': cmd_kodla(sys.argv[2], sys.argv[3], sys.argv[4])
    elif cmd == 'egit': cmd_egit(sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 30000, float(sys.argv[4]) if len(sys.argv) > 4 else 55)
    elif cmd == 'aktar': cmd_aktar(sys.argv[2], sys.argv[3])
    elif cmd == 'ornek': cmd_ornek(sys.argv[2])

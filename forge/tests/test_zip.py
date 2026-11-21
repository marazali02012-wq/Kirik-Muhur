"""Sprite ZIP doğrulaması (bağımsız araçlarla: Python zipfile + Pillow).
40 sayfa (8 yön x 5 animasyon), her sayfa 1024x512 RGBA, 4x2 düzen, 256x256 kare, şeffaf arka plan,
boş kare yok, sabit ayak hizası, manifest ve GLB mevcut."""
import io, json, sys, zipfile
from PIL import Image

path = sys.argv[1] if len(sys.argv) > 1 else 'ciktilar/ornek_savasci_sprite_40.zip'
out = sys.argv[2] if len(sys.argv) > 2 else 'ciktilar/test_zip.json'
z = zipfile.ZipFile(path)
bad = z.testzip()
names = z.namelist()
pngs = sorted(n for n in names if n.endswith('.png'))
man = json.loads(z.read('manifest.json'))
res = {'zip': path, 'crcOk': bad is None, 'files': len(names), 'pngSheets': len(pngs), 'hasManifest': 'manifest.json' in names,
       'hasGLB': any(n.endswith('.glb') for n in names), 'sheets': {}, 'errors': []}
S = man['frameWidth']; base = man['footBaselineY']
idle_lowest = {}
for n in pngs:
    im = Image.open(io.BytesIO(z.read(n)))
    info = {'size': im.size, 'mode': im.mode}
    if im.size != (S * 4, S * 2): res['errors'].append(f'{n}: boyut {im.size}')
    if im.mode != 'RGBA': res['errors'].append(f'{n}: mod {im.mode}')
    a = im.getchannel('A')
    corners = [a.getpixel((x, y)) for x, y in [(0, 0), (S * 4 - 1, 0), (0, S * 2 - 1), (S * 4 - 1, S * 2 - 1)]]
    if max(corners) != 0: res['errors'].append(f'{n}: köşe şeffaf değil')
    lows, counts = [], []
    for i in range(8):
        fr = a.crop(((i % 4) * S, (i // 4) * S, (i % 4) * S + S, (i // 4) * S + S))
        px = fr.load(); cnt = 0; low = -1
        for y in range(S - 1, -1, -1):
            row = [px[x, y] for x in range(S)]
            if low < 0 and any(v > 200 for v in row): low = y
            cnt += sum(1 for v in row if v > 200)
        lows.append(low); counts.append(cnt)
        if cnt < 800: res['errors'].append(f'{n}: kare {i} neredeyse boş ({cnt} px)')
    info['lowestOpaqueRow'] = lows; info['opaquePixels'] = counts
    res['sheets'][n] = info
    if n.endswith('/idle.png'): idle_lowest[n] = lows
# sabit ayak hizası: boşta animasyonunda her yönde 8 karenin en alt opak satırı aynı (±1 px) ve zemin çizgisine yakın
for n, lows in idle_lowest.items():
    if max(lows) - min(lows) > 1: res['errors'].append(f'{n}: ayak hizası kayıyor {lows}')
    if abs(max(lows) - base) > 12: res['errors'].append(f'{n}: ayak, zemin çizgisinden uzak ({max(lows)} vs {base})')
res['footBaselineY'] = base
res['idleLowestRowPerDirection'] = {k.split('/')[1]: v[0] for k, v in idle_lowest.items()}
if len(pngs) != 40: res['errors'].append(f'40 sayfa bekleniyordu, {len(pngs)} bulundu')
dirs = sorted(set(n.split('/')[1] for n in pngs)); acts = sorted(set(n.split('/')[2] for n in pngs))
res['directions'] = dirs; res['actions'] = acts
res['ok'] = not res['errors'] and res['crcOk']
json.dump(res, open(out, 'w'), indent=1, ensure_ascii=False)
# özet görsel: 40 sayfanın küçültülmüş hali
sheet = Image.new('RGBA', (5 * 256, 8 * 128), (56, 66, 86, 255))
for r, d in enumerate(dirs):
    for c, act in enumerate(['idle', 'walk', 'attack', 'hurt', 'death']):
        im = Image.open(io.BytesIO(z.read(f'directions/{d}/{act}.png'))).resize((256, 128), Image.LANCZOS)
        sheet.alpha_composite(im, (c * 256, r * 128))
sheet.convert('RGB').save(out.replace('.json', '_onizleme.png'))
print('ZIP CRC:', 'tamam' if res['crcOk'] else 'BOZUK', '| dosya', res['files'], '| PNG sayfa', len(pngs), '| manifest', res['hasManifest'], '| GLB', res['hasGLB'])
print('yönler:', dirs); print('animasyonlar:', acts)
print('boşta ayak satırı (yön başına):', res['idleLowestRowPerDirection'], 'zemin çizgisi', base)
print('HATALAR:', res['errors'][:10] if res['errors'] else 'yok')
print('SONUÇ:', 'ZIP testi geçti' if res['ok'] else 'BAŞARISIZ')
sys.exit(0 if res['ok'] else 1)

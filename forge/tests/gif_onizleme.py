"""Sprite ZIP'ten hareketli önizleme: her animasyon için 8 yön yan yana, 8 kare döngü (GIF)."""
import io, sys, zipfile
from PIL import Image
zp = sys.argv[1] if len(sys.argv) > 1 else 'ciktilar/ornek_savasci_sprite_40.zip'
out = sys.argv[2] if len(sys.argv) > 2 else 'ciktilar/hareket_onizleme.gif'
z = zipfile.ZipFile(zp); dirs = sorted(set(n.split('/')[1] for n in z.namelist() if n.startswith('directions/')))
acts = ['idle', 'walk', 'attack', 'hurt', 'death']; S = 128
frames = []
for f in range(8):
    canvas = Image.new('RGBA', (S * 8, S * 5), (44, 56, 78, 255))
    for r, a in enumerate(acts):
        for c, d in enumerate(dirs):
            sh = Image.open(io.BytesIO(z.read(f'directions/{d}/{a}.png'))).convert('RGBA')
            fr = sh.crop(((f % 4) * 256, (f // 4) * 256, (f % 4) * 256 + 256, (f // 4) * 256 + 256)).resize((S, S), Image.LANCZOS)
            canvas.alpha_composite(fr, (c * S, r * S))
    frames.append(canvas.convert('RGB').quantize(colors=255, method=Image.Quantize.MEDIANCUT))
frames[0].save(out, save_all=True, append_images=frames[1:], duration=110, loop=0, optimize=True)
print('GIF:', out, len(frames), 'kare')

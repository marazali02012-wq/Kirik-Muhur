#!/usr/bin/env bash
# Tüm testleri sırayla çalıştırır. Kullanım: bash tests/hepsini_calistir.sh [paket.forgepack]
set -e
cd "$(dirname "$0")/.."
PACK="${1:-yerel-calisma/ForgeMini_Savasci_v1.forgepack}"
node araclar/derle.js
node tests/test_anim.js | tail -1
node tests/test_analiz.js 60 > /dev/null && echo "analiz doğruluğu: ciktilar/test_analiz.json"
node tests/uretim_ornek.js > /dev/null && echo "örnek GLB + ZIP üretildi"
python3 tests/test_zip.py | tail -1
(cd tests && [ -d node_modules ] || npm install --no-audit --no-fund >/dev/null; node test_glb_validator.js | tail -1; node test_threejs.js > /dev/null && echo "three.js GLB açma: geçti")
node tests/test_tarayici.js --pack="$PACK" | tail -1
node tests/test_tarayici.js --pack="$PACK" --throttle=6 --skipv11 --with512 | tail -1

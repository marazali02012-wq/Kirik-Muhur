/* Forge Yerel Rüya (Local Dream) — ana iş parçacığı denetleyicisi.
   - Tek dosyalık model paketi (.forgepack) veya ayrı dosyalar telefondan seçilir; IndexedDB'ye kaydedilir.
     Kurulumdan sonra internet gerekmez (dosya seçimi yeterli; ağ isteği yapılmaz).
   - Çalışma: Web Worker (Blob URL) + ONNX Runtime Web WASM (CPU). GPU gerekmez.
   - İptal, ilerleme, ara durumu kaydedip devam etme, 256 / 512 (donanıma göre) çıktı, PNG kaydetme. */
(function (root) {
  'use strict';
  const DB = 'forge-yerel-v12', STORE = 'kv';
  function idb() { return new Promise((res, rej) => { if (!root.indexedDB) return rej(new Error('IndexedDB yok')); const r = indexedDB.open(DB, 1); r.onupgradeneeded = () => r.result.createObjectStore(STORE); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
  async function kvSet(k, v) { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).put(v, k); tx.oncomplete = () => res(true); tx.onerror = () => rej(tx.error); }); }
  async function kvGet(k) { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction(STORE, 'readonly'), r = tx.objectStore(STORE).get(k); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
  async function kvDel(k) { const db = await idb(); return new Promise(res => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).delete(k); tx.oncomplete = () => res(true); }); }

  // .forgepack: "FORGEPK1" + uint32(LE) başlık uzunluğu + JSON başlık + ardışık dosya baytları
  function parsePack(buf) {
    const u8 = new Uint8Array(buf), magic = new TextDecoder().decode(u8.subarray(0, 8));
    if (magic !== 'FORGEPK1') throw new Error('Bu dosya bir Forge model paketi değil');
    const hl = new DataView(buf).getUint32(8, true), head = JSON.parse(new TextDecoder().decode(u8.subarray(12, 12 + hl)));
    const base = 12 + hl, files = {};
    for (const f of head.files) files[f.name] = buf.slice(base + f.offset, base + f.offset + f.length);
    return { head, files };
  }
  function packFromLoose(map) { // ad -> ArrayBuffer
    const need = ['config.json', 'unet.onnx', 'taesd_decoder.onnx', 'ort.wasm.min.js', 'ort-wasm-simd-threaded.mjs', 'ort-wasm-simd-threaded.wasm'];
    const miss = need.filter(n => !map[n]); if (miss.length) throw new Error('Eksik dosya: ' + miss.join(', '));
    return { head: { format: 'loose', files: Object.keys(map).map(n => ({ name: n, length: map[n].byteLength })) }, files: map };
  }

  // Türkçe metinden model koşullarına (Forge-Mini) — kural tabanlı, desteklenmeyen sözcükler bildirilir
  const nrm = s => (s || '').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i') + ' ';
  function promptToCond(text, cfg) {
    const p = nrm(text), used = [], cond = {};
    const set = (k, v, w) => { if (cond[k] === undefined) { cond[k] = v; used.push(w); } };
    [[/arkadan|arka /, 4], [/sag arka|arka sag/, 3], [/sol arka|arka sol/, 5], [/sag on|on sag|capraz/, 1], [/sol on|on sol/, 7], [/sagdan|sag yan|sag taraf/, 2], [/soldan|sol yan|sol taraf/, 6], [/onden|on /, 0]]
      .forEach(([re, v]) => { if (re.test(p)) set('dir', v, 'yön'); });
    [[/kilic|pala/, 0], [/balta/, 1], [/mizrak|kargi/, 2], [/asa|degnek|buyucu/, 3], [/topuz|gurz/, 4], [/cekic/, 5], [/hancer/, 6], [/silahsiz/, 7]].forEach(([re, v]) => { if (re.test(p)) set('weapon', v, 'silah'); });
    [[/cuppe|buyucu/, 3], [/agir zirh|sovalye|paladin|plaka/, 0], [/hafif zirh|deri zirh|okcu|haydut/, 2], [/zirh/, 1]].forEach(([re, v]) => { if (re.test(p)) set('armor', v, 'zırh'); });
    [[/migfer|kask|tam kask/, 1], [/tac|tacli/, 0], [/basi acik|migfersiz/, 2]].forEach(([re, v]) => { if (re.test(p)) set('helmet', v, 'baş'); });
    if (/pelerinsiz|pelerin yok/.test(p)) set('cape', 1, 'pelerinsiz'); else if (/pelerin/.test(p)) set('cape', 0, 'pelerin');
    if (/kalkan/.test(p)) set('shield', 1, 'kalkan');
    [[/kirmizi|kizil|ates/, 0], [/turuncu/, 1], [/sari /, 2], [/yesil|orman/, 4], [/turkuaz/, 6], [/gok|acik mavi|buz/, 7], [/mavi|deniz/, 8], [/lacivert/, 9], [/mor|golge/, 10], [/pembe/, 11], [/siyah|kara/, 12], [/beyaz|ak /, 13], [/gri/, 14]]
      .forEach(([re, v]) => { if (re.test(p)) set('clothHue', v, 'renk'); });
    [[/altin zirh|altin/, 2], [/bronz|tunc/, 3], [/kara zirh|siyah zirh|karanlik/, 1], [/celik|gumus/, 0]].forEach(([re, v]) => { if (re.test(p)) set('metal', v, 'metal'); });
    [[/yuru|kosu/, 1], [/saldir|vurus|savas/, 2], [/bekle|dur/, 0]].forEach(([re, v]) => { if (re.test(p)) set('pose', v, 'poz'); });
    const R = (k, d) => cond[k] !== undefined ? cond[k] : d;
    const vec = [R('dir', 0), R('weapon', 0), R('armor', 0), R('helmet', 0), R('cape', 0), R('shield', 0), R('clothHue', 8), R('metal', 0), R('pose', 0)];
    const known = /kilic|pala|balta|mizrak|kargi|asa|degnek|topuz|gurz|cekic|hancer|silahsiz|zirh|cuppe|buyucu|sovalye|paladin|plaka|okcu|haydut|migfer|kask|tac|pelerin|kalkan|kirmizi|kizil|ates|turuncu|sari|yesil|orman|turkuaz|gok|mavi|deniz|lacivert|mor|golge|pembe|siyah|kara|beyaz|ak|gri|altin|bronz|tunc|celik|gumus|yuru|kosu|saldir|vurus|savas|bekle|dur|arka|on|sag|sol|onden|arkadan|sagdan|soldan|yan|capraz|savasci|bir|ve|ile|li|lu|lı|lü|basi|acik|agir|hafif|deri|tam|karanlik/;
    const unknown = p.split(/[^a-z]+/).filter(w => w.length > 2 && !known.test(w));
    return { cond: vec, used, unknown };
  }

  const LD = root.ForgeLocalDream = {
    pack: null, worker: null, ready: false, lastState: null, busy: false, info: null,
    async restore() { try { const p = await kvGet('pack'); if (p) { this.pack = p; return p; } } catch (e) { /* depolama yoksa her oturumda seçilir */ } return null; },
    async savePack(p) { try { await kvSet('pack', p); return true; } catch (e) { return false; } },
    async forget() { this.stop(); this.pack = null; try { await kvDel('pack'); await kvDel('ldstate'); } catch (e) { } },
    async loadPackFile(file) { const buf = await file.arrayBuffer(); const p = parsePack(buf); p.source = file.name; p.bytes = buf.byteLength; this.pack = p; p.saved = await this.savePack(p); return p; },
    async loadLoose(fileList) { const map = {}; for (const f of fileList) map[f.name] = await f.arrayBuffer(); const p = packFromLoose(map); p.source = 'ayrı dosyalar'; p.bytes = Object.values(map).reduce((a, b) => a + b.byteLength, 0); this.pack = p; p.saved = await this.savePack(p); return p; },
    async loadFromUrl(base) { // yalnızca sayfa http(s) üzerinden açıldığında (yerel sunucu / PWA) kullanılır
      const r = await fetch(base); if (!r.ok) throw new Error('Paket bulunamadı: ' + base); const buf = await r.arrayBuffer(); const p = parsePack(buf); p.source = base; p.bytes = buf.byteLength; this.pack = p; p.saved = await this.savePack(p); return p;
    },
    config() { return this.pack ? JSON.parse(new TextDecoder().decode(this.pack.files['config.json'])) : null; },
    stop() { if (this.worker) this.worker.terminate(); this.worker = null; this.ready = false; },
    async start(opts) {
      opts = opts || {};
      if (!this.pack) throw new Error('Önce model paketini seçin');
      this.stop();
      const src = document.getElementById('ld-worker-src').textContent;
      const w = this.worker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
      const f = this.pack.files, cfg = this.config();
      const ready = new Promise((res, rej) => {
        w.onmessage = ev => { const m = ev.data; if (m.type === 'ready') { this.ready = true; this.info = m; res(m); } else if (m.type === 'error') rej(new Error(m.message)); else if (this.onMessage) this.onMessage(m); };
        w.onerror = e => rej(new Error(e.message || 'Worker hatası'));
      });
      w.postMessage({ type: 'init', ortJs: new TextDecoder().decode(f['ort.wasm.min.js']), glueMjs: new TextDecoder().decode(f['ort-wasm-simd-threaded.mjs']), wasm: f['ort-wasm-simd-threaded.wasm'].slice(0),
        files: { unet: new Uint8Array(f['unet.onnx'].slice(0)), decoder: new Uint8Array(f['taesd_decoder.onnx'].slice(0)) }, config: cfg, threads: opts.threads || 1, memSaver: !!opts.memSaver });
      const info = await ready;
      w.onmessage = ev => { const m = ev.data; if (m.type === 'state') { this.lastState = Object.assign({ req: this.lastReq }, m.state); try { kvSet('ldstate', this.lastState); } catch (e) { } } if (this.onMessage) this.onMessage(m); };
      return info;
    },
    generate(req) {
      if (!this.ready) throw new Error('Motor hazır değil');
      this.lastReq = req; this.lastState = null;
      this.worker.postMessage(Object.assign({ type: 'generate', id: Date.now() }, req));
    },
    async savedState() { try { return this.lastState || await kvGet('ldstate'); } catch (e) { return this.lastState; } },
    async resume() { const st = await this.savedState(); if (!st || !st.req) throw new Error('Devam edilecek kayıt yok'); this.lastReq = st.req; this.worker.postMessage(Object.assign({ type: 'generate', id: Date.now() }, st.req, { resume: st })); },
    cancel() { if (this.worker) this.worker.postMessage({ type: 'cancel' }); },
    promptToCond, parsePack, kvGet, kvSet, kvDel,
  };
})(typeof self !== 'undefined' ? self : globalThis);

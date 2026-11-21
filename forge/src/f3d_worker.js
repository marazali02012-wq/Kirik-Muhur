/* Forge 3D — Web Worker işleyicisi. Ana iş parçacığı bu kodu, 3B çekirdek kodunun arkasına ekleyip Blob URL ile başlatır.
   Uzun işlemler (40 sprite sayfası, GLB) arayüzü dondurmadan burada çalışır. İptal ve kaldığı yerden devam desteklenir. */
'use strict';
(function () {
  const F = self.Forge3D;
  let cancel = false;
  const post = (m, tr) => self.postMessage(m, tr || []);
  async function png(rgba, w, h) {
    if (typeof OffscreenCanvas !== 'undefined') {
      try {
        const c = new OffscreenCanvas(w, h), x = c.getContext('2d');
        x.putImageData(new ImageData(rgba, w, h), 0, 0);
        const b = await c.convertToBlob({ type: 'image/png' });
        return new Uint8Array(await b.arrayBuffer());
      } catch (e) { /* yedek yola düş */ }
    }
    return F.encodePNGAsync(rgba, w, h);
  }
  function make(src) { const ch = F.createCharacter(src); ch.framing = src.framing || F.computeFraming(ch); return ch; }
  self.onmessage = async ev => {
    const m = ev.data;
    if (m.type === 'cancel') { cancel = true; return; }
    try {
      if (m.type === 'sprites') {
        cancel = false;
        const t0 = performance.now(), ch = make(m.src), have = new Set(m.have || []);
        post({ type: 'framing', framing: ch.framing, manifest: F.spriteManifest(ch) });
        let done = have.size; const total = 8 * F.CLIP_KEYS.length;
        for (let d = 0; d < 8; d++) for (const clip of F.CLIP_KEYS) {
          const name = `directions/dir${d}_${F.DIR_KEYS[d]}/${clip}.png`;
          if (have.has(name)) continue;
          if (cancel) { post({ type: 'cancelled', done, total }); return; }
          const tr = performance.now();
          const sh = F.renderSheet(ch, clip, d, { ss: m.ss || 2 });
          const rMs = performance.now() - tr, te = performance.now();
          const data = await png(sh.rgba, sh.width, sh.height);
          done++;
          post({ type: 'sheet', name, data, footRows: F.footRows(sh, ch.framing.frame), done, total, renderMs: rMs, encodeMs: performance.now() - te }, [data.buffer]);
        }
        post({ type: 'sprites-done', ms: performance.now() - t0 });
      } else if (m.type === 'glb') {
        const t0 = performance.now(), ch = make(m.src);
        const glb = F.exportGLB(ch.skel, ch.mesh, { name: m.name || 'Forge_Savasci' });
        const rep = F.verifyGLB(glb);
        post({ type: 'glb', data: glb, verify: rep, ms: performance.now() - t0 }, [glb.buffer]);
      }
    } catch (e) { post({ type: 'error', message: (e && e.message) || String(e) }); }
  };
})();

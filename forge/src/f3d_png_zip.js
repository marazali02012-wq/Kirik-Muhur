/* Forge 3D — PNG kodlayıcı/çözücü (zlib işlevi dışarıdan verilir) ve ZIP (saklama yöntemi) yazıcı/okuyucu.
   Tarayıcıda zlib için CompressionStream('deflate') kullanılır; Node testlerinde zlib modülü verilir. */
(function (root) {
  'use strict';
  const F = root.Forge3D = root.Forge3D || {};

  const CRC_TABLE = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(buf, start, end) { let c = 0xffffffff; for (let i = start || 0, e = end == null ? buf.length : end; i < e; i++) c = CRC_TABLE[(c ^ buf[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
  function adler32(buf) { let a = 1, b = 0; for (let i = 0; i < buf.length; i++) { a = (a + buf[i]) % 65521; b = (b + a) % 65521; } return ((b << 16) | a) >>> 0; }

  // Sıkıştırmasız zlib (yedek; dosya büyük olur ama her ortamda senkron çalışır)
  function zlibStore(data) {
    const blocks = Math.ceil(data.length / 65535) || 1, out = new Uint8Array(2 + data.length + blocks * 5 + 4);
    out[0] = 0x78; out[1] = 0x01; let o = 2;
    for (let i = 0; i < blocks; i++) {
      const s = i * 65535, len = Math.min(65535, data.length - s), last = i === blocks - 1 ? 1 : 0;
      out[o++] = last; out[o++] = len & 255; out[o++] = len >>> 8; out[o++] = ~len & 255; out[o++] = (~len >>> 8) & 255;
      out.set(data.subarray(s, s + len), o); o += len;
    }
    const ad = adler32(data); out[o++] = ad >>> 24; out[o++] = (ad >>> 16) & 255; out[o++] = (ad >>> 8) & 255; out[o++] = ad & 255;
    return out;
  }

  function pngChunk(type, data) {
    const out = new Uint8Array(12 + data.length), dv = new DataView(out.buffer);
    dv.setUint32(0, data.length); for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
    out.set(data, 8); dv.setUint32(8 + data.length, crc32(out, 4, 8 + data.length)); return out;
  }
  function pngRaw(rgba, w, h) {
    // Filtre: her satır için "Sub" (1) – şeffaf alanlarda iyi sıkışır
    const stride = w * 4, raw = new Uint8Array((stride + 1) * h);
    for (let y = 0; y < h; y++) {
      const o = y * (stride + 1), s = y * stride; raw[o] = 1;
      for (let x = 0; x < stride; x++) raw[o + 1 + x] = (rgba[s + x] - (x >= 4 ? rgba[s + x - 4] : 0)) & 255;
    }
    return raw;
  }
  function pngAssemble(w, h, z, textChunks) {
    const sig = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
    const ihdr = new Uint8Array(13), dv = new DataView(ihdr.buffer);
    dv.setUint32(0, w); dv.setUint32(4, h); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
    const parts = [sig, pngChunk('IHDR', ihdr)];
    for (const [k, v] of Object.entries(textChunks || {})) parts.push(pngChunk('tEXt', new TextEncoder().encode(k + '\0' + v)));
    parts.push(pngChunk('IDAT', z), pngChunk('IEND', new Uint8Array(0)));
    const len = parts.reduce((a, p) => a + p.length, 0), out = new Uint8Array(len); let o = 0;
    for (const p of parts) { out.set(p, o); o += p.length; }
    return out;
  }
  // Senkron (deflateSync verilirse sıkıştırır)
  function encodePNG(rgba, w, h, deflateSync, text) { const raw = pngRaw(rgba, w, h); return pngAssemble(w, h, deflateSync ? deflateSync(raw) : zlibStore(raw), text); }
  // Asenkron, tarayıcıda CompressionStream ile
  async function encodePNGAsync(rgba, w, h, text) {
    const raw = pngRaw(rgba, w, h);
    let z;
    if (typeof CompressionStream !== 'undefined') {
      const cs = new CompressionStream('deflate');
      const stream = new Blob([raw]).stream().pipeThrough(cs);
      z = new Uint8Array(await new Response(stream).arrayBuffer());
    } else z = zlibStore(raw);
    return pngAssemble(w, h, z, text);
  }

  // PNG çözücü (yalnızca 8 bit RGBA/RGB, test ve doğrulama için). inflateSync dışarıdan verilir.
  function decodePNG(buf, inflateSync) {
    const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    let o = 8, w = 0, h = 0, ct = 0, bd = 0; const idat = [];
    const text = {};
    while (o < buf.length) {
      const len = dv.getUint32(o), type = String.fromCharCode(buf[o + 4], buf[o + 5], buf[o + 6], buf[o + 7]);
      const data = buf.subarray(o + 8, o + 8 + len);
      if (type === 'IHDR') { w = dv.getUint32(o + 8); h = dv.getUint32(o + 12); bd = buf[o + 16]; ct = buf[o + 17]; }
      else if (type === 'IDAT') idat.push(data);
      else if (type === 'tEXt') { const s = new TextDecoder().decode(data); const i = s.indexOf('\0'); text[s.slice(0, i)] = s.slice(i + 1); }
      o += 12 + len; if (type === 'IEND') break;
    }
    if (bd !== 8 || (ct !== 6 && ct !== 2)) throw new Error('Desteklenmeyen PNG biçimi');
    const tot = idat.reduce((a, p) => a + p.length, 0), z = new Uint8Array(tot); let p = 0; for (const d of idat) { z.set(d, p); p += d.length; }
    const raw = inflateSync(z), bpp = ct === 6 ? 4 : 3, stride = w * bpp, out = new Uint8ClampedArray(w * h * 4);
    const prev = new Uint8Array(stride), cur = new Uint8Array(stride);
    for (let y = 0; y < h; y++) {
      const f = raw[y * (stride + 1)], s = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
      for (let x = 0; x < stride; x++) {
        const a = x >= bpp ? cur[x - bpp] : 0, b = prev[x], c = x >= bpp ? prev[x - bpp] : 0;
        let v = s[x];
        if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
        else if (f === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
        cur[x] = v & 255;
      }
      for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; out[i] = cur[x * bpp]; out[i + 1] = cur[x * bpp + 1]; out[i + 2] = cur[x * bpp + 2]; out[i + 3] = bpp === 4 ? cur[x * bpp + 3] : 255; }
      prev.set(cur);
    }
    return { width: w, height: h, rgba: out, text };
  }

  // ZIP (saklama) — V11.2'deki makeZip ile aynı biçim; Uint8Array döndürür
  function makeZipBytes(files) {
    const enc = new TextEncoder(); const chunks = []; const central = []; let offset = 0;
    const u16 = n => [n & 255, (n >>> 8) & 255], u32 = n => [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255];
    for (const f of files) {
      const name = enc.encode(f.name), data = f.data, crc = crc32(data);
      const head = new Uint8Array([...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0)]);
      chunks.push(head, name, data);
      central.push(new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(offset)]), name);
      offset += head.length + name.length + data.length;
    }
    const cenLen = central.reduce((a, c) => a + c.length, 0);
    const end = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length), ...u32(cenLen), ...u32(offset), ...u16(0)]);
    const all = [...chunks, ...central, end], total = all.reduce((a, c) => a + c.length, 0), out = new Uint8Array(total);
    let o = 0; for (const c of all) { out.set(c, o); o += c.length; }
    return out;
  }
  // ZIP okuyucu (yalnızca saklama yöntemi) + CRC doğrulaması
  function readZip(buf) {
    const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    let e = buf.length - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error('ZIP sonu bulunamadı');
    const count = dv.getUint16(e + 10, true), cenOff = dv.getUint32(e + 16, true);
    const out = []; let o = cenOff; const dec = new TextDecoder();
    for (let i = 0; i < count; i++) {
      if (dv.getUint32(o, true) !== 0x02014b50) throw new Error('Merkez dizin bozuk');
      const method = dv.getUint16(o + 10, true), crc = dv.getUint32(o + 16, true), size = dv.getUint32(o + 20, true);
      const nl = dv.getUint16(o + 28, true), xl = dv.getUint16(o + 30, true), cl = dv.getUint16(o + 32, true), lo = dv.getUint32(o + 42, true);
      const name = dec.decode(buf.subarray(o + 46, o + 46 + nl));
      const lnl = dv.getUint16(lo + 26, true), lxl = dv.getUint16(lo + 28, true);
      const data = buf.subarray(lo + 30 + lnl + lxl, lo + 30 + lnl + lxl + size);
      out.push({ name, method, crcOk: method === 0 ? crc32(data) === crc : null, data });
      o += 46 + nl + xl + cl;
    }
    return out;
  }

  F.crc32 = crc32; F.encodePNG = encodePNG; F.encodePNGAsync = encodePNGAsync; F.decodePNG = decodePNG; F.zlibStore = zlibStore;
  F.makeZipBytes = makeZipBytes; F.readZip = readZip;
})(typeof self !== 'undefined' ? self : globalThis);

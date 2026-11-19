export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(200).json({ reply: 'Halo Komandan! Saya Cengkudu AI, mirip Meta AI. Mau bikin apa hari ini? Ketik: MODE KODE / MODE VIDEO / MODE CAPTION / Tanya kopi' });
  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch(e){ body = {}; } }
    const pesanRaw = (body?.message || body?.prompt || '').toString().trim();
    const pesan = pesanRaw.toUpperCase();
    const lower = pesanRaw.toLowerCase();

    // 1. MODE KODE - BISA PRODUK APA AJA
    if (pesan.includes('MODE KODE') || pesan.includes('BUATIN HTML') || pesan.includes('BUAT HTML')) {
      let nama = 'Cengkudu Premium 250gr';
      let harga = 'Rp 55.000';
      if (lower.includes('500gr') || lower.includes('500 gr')) { nama = 'Cengkudu Premium 500gr'; harga = 'Rp 95.000'; }
      if (lower.includes('1kg') || lower.includes('1 kg')) { nama = 'Cengkudu Premium 1kg'; harga = 'Rp 175.000'; }
      if (lower.includes('drip') || lower.includes('sachet')) { nama = 'Cengkudu Drip Bag (10pcs)'; harga = 'Rp 45.000'; }
      if (lower.includes('merch') || lower.includes('kaos') || lower.includes('tumbler')) { nama = 'Merch Cengkudu 800mdpl'; harga = 'Rp 85.000'; }
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CENGKUDU 800mdpl</title><style>body{background:#1a120b;color:#fff;font-family:sans-serif;text-align:center;padding:20px}.card{background:#2a1e12;border-radius:16px;padding:20px;margin:14px auto;max-width:360px}.price{font-size:24px;color:#ffcc7a;margin:10px 0;font-weight:bold}a{display:block;background:#b7791f;color:#fff;text-decoration:none;padding:12px;border-radius:10px;font-weight:bold;margin-top:10px}ul{text-align:left}</style></head><body><h1>CENGKUDU 800mdpl</h1><p>Ngopi Sehat, Lambung Aman</p><div class="card"><h2>${nama}</h2><div class="price">${harga}</div><ul><li>100% Arabika Single Origin 800mdpl</li><li>Low Acid - Aman Lambung</li><li>Roast Medium - Rasa Coklat & Gula Aren</li></ul><a href="https://wa.me/6281234567890">Beli via WA</a></div><p>Copy kode ini, simpan jadi .html, langsung jadi web jualan!</p></body></html>`;
      return res.status(200).json({ reply: html });
    }

    // 2. MODE VIDEO / PITCH
    if (pesan.includes('MODE VIDEO') || pesan.includes('VIDEO') || pesan.includes('PITCH') || pesan.includes('IDE KONTEN')) {
      return res.status(200).json({ reply: 'Siap Komandan! Ini 3 ide video pitch ala Meta AI:\n\n1. HOOK 3 DETIK: "STOP beli kopi sachet!"\nMASALAH: Lambung perih, ngantuk lagi\nSOLUSI: Cengkudu 800mdpl, low acid, aman lambung\nCTA: Cek keranjang kuning!\n\n2. HOOK: "Kopi 55 ribu bisa ngopi sebulan?"\nBuktikan seduh V60, tunjukin ampas, closing WA\n\n3. HOOK: "Petani Banyumas vs Kopi Kafe 30rb"\nStory: Dari kebun 800mdpl langsung ke gelas lu\n\nMau gue buatin script lengkap yang mana? Ketik: Script nomor 1' });
    }

    // 3. MODE CAPTION
    if (pesan.includes('CAPTION') || pesan.includes('TIKTOK') || pesan.includes('IG') || pesan.includes('INSTAGRAM')) {
      return res.status(200).json({ reply: 'Ini caption siap posting, Komandan:\n\n☕ Ngopi Sehat, Lambung Aman!\nBukan sekadar kopi, ini Cengkudu 800mdpl dari Banyumas.\n\nLow Acid, jadi aman buat lambung.\nRasa coklat + gula aren, tanpa gula tambahan.\n\nHarga cuma Rp 55.000 / 250gr\nOrder? Klik link di bio / WA!\n\n#kopibanyumas #kopiindonesia #cengkudu800mdpl #ngopisehat #umkm' });
    }

    // 4. TANYA KOPI / HARGA / MANFAAT
    if (pesan.includes('HARGA') || pesan.includes('BERAPA') || pesan.includes('BELI')) {
      return res.status(200).json({ reply: 'Harga Cengkudu 800mdpl, Komandan:\n- 250gr = Rp 55.000\n- 500gr = Rp 95.000\n- 1kg = Rp 175.000\n- Drip Bag 10pcs = Rp 45.000\n\nSemua 100% Arabika 800mdpl, Low Acid. Mau order yang mana? Ketik: MODE KODE buatin HTML 500gr' });
    }
    if (pesan.includes('MANFAAT') || pesan.includes('LAMBUNG') || pesan.includes('ASAM') || pesan.includes('SEHAT')) {
      return res.status(200).json({ reply: 'Manfaat Cengkudu 800mdpl:\n1. Low Acid - Aman buat lambung sensitif\n2. Ditanam 800mdpl - rasa lebih bersih, manis alami\n3. Tanpa campuran - 100% Arabika murni\n4. Bikin fokus, gak bikin jantung deg-degan\n\nCara seduh paling aman: V60 / Tubruk air 90 derajat, jangan mendidih.' });
    }
    if (pesan.includes('HALO') || pesan.includes('HAI') || pesan.includes('HELLO') || pesan.includes('SIAPA')) {
      return res.status(200).json({ reply: 'Halo Komandan! Saya Cengkudu AI, versi mini nya Meta AI yang ada di web lu.\n\nSaya bisa:\n- MODE KODE Buatin HTML [nama produk]\n- MODE VIDEO - ide konten\n- MODE CAPTION - caption TikTok/IG\n- Tanya harga / manfaat / cara seduh\n\nCoba ketik salah satu!' });
    }

    // 5. JAWABAN UMUM ALA META AI
    return res.status(200).json({ reply: 'Siap Komandan, gue tangkep maksud lu: "' + pesanRaw + '".\n\nNih versi ala Meta AI nya:\n\nINTI: ' + pesanRaw + ' itu bisa kita jadiin konten jualan Cengkudu.\n\nCoba gini:\n1. Jadikan HOOK video: "' + pesanRaw + '"\n2. Sambungin ke Cengkudu 800mdpl - Ngopi Sehat, Lambung Aman\n3. Closing: Order via WA, Rp 55.000 / 250gr\n\nKalo mau hasil lebih spesifik, ketik:\n- MODE KODE Buatin HTML produknya\n- MODE VIDEO buat ide videonya\n- MODE CAPTION buat captionnya' });
  } catch (e) {
    return res.status(200).json({ reply: 'Siap Komandan, coba ketik lagi: Halo / Harga / MODE KODE / MODE VIDEO' });
  }
}

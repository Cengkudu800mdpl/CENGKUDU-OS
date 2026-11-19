export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(200).json({ reply: 'Halo Komandan!' });
  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch(e){ body = {}; } }
    const pesan = (body?.message || body?.prompt || '').toString();
    const atas = pesan.toUpperCase();
    if (atas.includes('MODE KODE')) {
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CENGKUDU 800mdpl</title><style>body{background:#1a120b;color:#fff;font-family:sans-serif;text-align:center;padding:20px}.card{background:#2a1e12;border-radius:16px;padding:20px;margin:14px auto;max-width:360px}.price{font-size:22px;color:#ffcc7a;margin:10px 0}a{display:block;background:#b7791f;color:#fff;text-decoration:none;padding:12px;border-radius:10px;font-weight:bold}</style></head><body><h1>CENGKUDU 800mdpl</h1><p>Ngopi Sehat, Lambung Aman</p><div class="card"><h2>Cengkudu Premium 250gr</h2><div class="price">Rp 55.000</div><a href="https://wa.me/6281234567890">Beli via WA</a></div></body></html>`;
      return res.status(200).json({ reply: html });
    }
    return res.status(200).json({ reply: 'Siap, gas! Ide video pitch 30 detik: HOOK: "STOP beli kopi sachet! 55 ribu bisa ngopi premium sebulan!" - MASALAH: Kopi sachet bikin lambung perih - SOLUSI: Cengkudu Premium 250gr Rp 55.000, lambung aman, rasa kafe. CLOSING: Order via WA!' });
  } catch (e) {
    return res.status(200).json({ reply: 'Siap Komandan, coba ketik lagi: MODE KODE Buatin HTML 1 produk kopi' });
  }
}

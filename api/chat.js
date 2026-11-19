export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ reply: 'Pake POST ya Komandan' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const msg = (body.message || '').toString();
    const m = msg.toLowerCase();
    let reply = '';

    if (m.includes('script nomor 1')) {
      reply = `Siap, gas! Ini script video 30 detik buat TikTok / Reels / Shopee Video.\nKonsep: "Ngopi Cafe Rasa Sultan, Harga Anak Kos"\n\n1. HOOK (0-3 detik)\nVisual: Kamu lagi seduh kopi item, uapnya ngebul.\nScript: "STOP beli kopi sachet! 55 ribu bisa ngopi premium sebulan, nih!"\n\n2. MASALAH (4-12 detik)\nVisual: Perut dipegang, muka meringis.\nScript: "Gue dulu gitu, tiap ngopi sachet lambung perih, ngantuk lagi. Ternyata gulanya kebanyakan, kopinya abal-abal."\n\n3. SOLUSI (13-25 detik)\nVisual: Tuang Cengkudu 800mdpl, seduh V60, tunjukin ampas.\nScript: "Kenalin, Cengkudu 800mdpl. Dari kebun Banyumas 800mdpl, low acid, aman di lambung. Rasanya? Kayak ngopi di cafe 30 ribuan, padahal modalnya cuma 2 ribuan segelas!"\n\n4. CTA (26-30 detik)\nVisual: Tunjuk keranjang kuning / WA.\nScript: "Cek keranjang kuning! 250gr cuma 55 ribu. Order via WA, gue kirim hari ini juga!"\n\nCaption: STOP kopi sachet! Ngopi sultan harga anak kos ☕ #kopi #cengkudu #kopibanyumas #fyp\n\nMau gue buatin Script nomor 2 atau 3 juga?`;
    } else if (m.includes('script nomor 2')) {
      reply = `Siap! Script 30 detik - Nomor 2: "Kopi 55 ribu bisa ngopi sebulan?"\n\n1. HOOK (0-3 detik)\nScript: "Kopi 55 ribu bisa ngopi sebulan? Masa sih? Gue buktiin!"\n\n2. BUKTI (4-20 detik)\nVisual: Timbang 15gr kopi, seduh V60.\nScript: "Ini Cengkudu 800mdpl, 250gr 55 ribu. Sekali seduh cuma 15gr, jadi bisa buat 16 gelas. 1 gelas cuma 3.400-an. Lebih murah dari kopi sachet!"\n\n3. CTA (21-30 detik)\nScript: "Daripada jajan kopi 30 ribu tiap hari, mending stok ini. Cek keranjang kuning, Komandan!"`;
    } else if (m.includes('script nomor 3')) {
      reply = `Siap! Script 30 detik - Nomor 3: "Petani Banyumas vs Kopi Kafe 30rb"\n\n1. HOOK (0-3 detik)\nScript: "Ini petani Banyumas yang kopinya dikira kopi cafe 30 ribu!"\n\n2. STORY (4-20 detik)\nVisual: Kebun kopi, petik cherry merah, jemur.\nScript: "Dari kebun 800mdpl, dipetik merah, dijemur, digiling. Gak pake campuran, gak pake gula. Murni kopi Banyumas."\n\n3. CTA (21-30 detik)\nScript: "Biar petani kita sejahtera, ngopi langsung dari petani. Cek keranjang kuning!"`;
    } else if (m.includes('mode video')) {
      reply = `Siap Komandan! Ini 3 ide video pitch ala Meta AI:\n\n1. HOOK 3 DETIK: "STOP beli kopi sachet!"\nMASALAH: Lambung perih, ngantuk lagi\nSOLUSI: Cengkudu 800mdpl, low acid, aman lambung\nCTA: Cek keranjang kuning!\n\n2. HOOK: "Kopi 55 ribu bisa ngopi sebulan?"\nBuktikan seduh V60, tunjukin ampas, closing WA\n\n3. HOOK: "Petani Banyumas vs Kopi Kafe 30rb"\nStory: Dari kebun 800mdpl langsung ke gelas lu\n\nMau gue buatin script lengkap yang mana?\nKetik: Script nomor 1`;
    } else if (m.includes('mode caption')) {
      reply = `Siap! Caption TikTok / IG:\n\nSTOP beli kopi sachet! ☕\nNgopi cafe rasa sultan, harga anak kos.\nCengkudu 800mdpl, low acid, aman lambung.\n250gr cuma 55rb, bisa buat 16 gelas!\n\nCek keranjang kuning / Order WA!\n\n#kopi #cengkudu #kopibanyumas #kopiindonesia #fyp #ngopi`;
    } else if (m.includes('mode kode')) {
      reply = `Siap! Buat MODE KODE, ketik gini ya Komandan:\nMODE KODE buatin HTML 500gr\n\nNanti gue kasih struktur HTML produknya. Mau yang 250gr atau 500gr?`;
    } else if (m.includes('halo') || m.includes('hai') || m.includes('hi')) {
      reply = `Halo Komandan! Mau bikin apa hari ini?\n\nKetik:\n- MODE KODE buatin HTML 500gr\n- MODE VIDEO ide konten\n- MODE CAPTION caption TikTok\n- Atau tanya harga / manfaat / cara seduh`;
    } else if (m.includes('harga')) {
      reply = `Harga Cengkudu 800mdpl Komandan:\n- 250gr: Rp 55.000\n- 500gr: Rp 105.000\n- 1kg: Rp 200.000\n\nBisa order via WA / keranjang kuning. Mau yang berapa gr?`;
    } else if (m.includes('manfaat') || m.includes('lambung')) {
      reply = `Manfaat Cengkudu 800mdpl:\n- Low acid, aman buat lambung\n- Dari kebun 800mdpl Banyumas, murni tanpa campuran\n- Bikin fokus, gak bikin kembung\n- Rasa cafe, harga anak kos\n\nMau gue buatin script video tentang manfaatnya? Ketik MODE VIDEO`;
    } else if (m.includes('seduh') || m.includes('cara')) {
      reply = `Cara seduh paling gampang (V60 / Tubruk):\n1. 15gr kopi + 200ml air 92 derajat\n2. Tuang pelan, diamkan 30 detik\n3. Tuang lagi sampe 200ml\n4. Tunggu 2 menit, siap minum!\n\nGak perlu alat mahal, pake saringan biasa juga bisa.`;
    } else {
      reply = `Siap Komandan, gue tangkep maksud lu: "${msg}".\n\nNih versi ala Meta AI nya:\n\nINTI: ${msg} itu bisa kita jadiin konten jualan Cengkudu.\n\nCoba gini:\n1. Jadikan HOOK video: "${msg}"\n2. Sambungin ke Cengkudu 800mdpl - Ngopi Sehat, Lambung Aman\n3. Closing: Order via WA, Rp 55.000 / 250gr\n\nKalo mau hasil lebih spesifik, ketik:\n- MODE KODE Buatin HTML produknya\n- MODE VIDEO buat ide videonya\n- MODE CAPTION buat captionnya`;
    }
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(200).json({ reply: 'Maaf Komandan, server lagi error. Coba lagi ya.' });
  }
}

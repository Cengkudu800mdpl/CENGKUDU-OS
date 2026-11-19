export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  const apiKey = process.env.MUSE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'MUSE_API_KEY belum kepasang di Vercel' });
  try {
    const { message } = req.body || {};
    const r = await fetch('https://api.meta.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({
        model: 'muse-spark-1.3',
        max_tokens: 800,
        temperature: 0.7,
        messages: [
          { role: 'system', content: 'Kamu asisten CENGKUDU OS. Jawab singkat, bahasa Indonesia santai. Bantu bikin ide video pitch kopi Cengkudu. Format: 1. Hook, 2. Masalah & Solusi, 3. Closing + CTA. Maksimal 150 kata.' },
          { role: 'user', content: message || 'Halo' }
        ]
      })
    });
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (reply) return res.status(200).json({ reply });
    return res.status(200).json({ reply: 'Muse udah nyambung tapi jawabannya kepotong. Coba tanya lagi dengan kalimat lebih pendek ya, Komandan.' });
  } catch (e) {
    return res.status(500).json({ error: 'Gagal manggil Muse API: ' + e.message });
  }
}

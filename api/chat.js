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
        max_tokens: 2000,
        temperature: 0.7,
        messages: [
          { role: 'system', content: 'Kamu asisten CENGKUDU OS. Jawab bahasa Indonesia santai. Bantu bikin ide video pitch kopi Cengkudu. Format: Hook, Masalah & Solusi, Closing.' },
          { role: 'user', content: message || 'Halo' }
        ]
      })
    });
    const data = await r.json();
    const c = data?.choices?.[0];
    const reply = c?.message?.content || c?.text || c?.delta?.content || data?.output_text || data?.output?.[0]?.content?.[0]?.text;
    if (reply) return res.status(200).json({ reply });
    return res.status(200).json({ reply: 'DEBUG DARI MUSE: ' + JSON.stringify(data).slice(0, 800) });
  } catch (e) {
    return res.status(500).json({ error: 'Gagal manggil Muse API: ' + e.message });
  }
}

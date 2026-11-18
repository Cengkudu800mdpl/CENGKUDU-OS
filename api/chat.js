export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ reply: 'API chat aktif.' });
  }
  const message = req.body?.message || '';
  if (!message) {
    return res.status(200).json({ reply: 'Pesan kosong.' });
  }

  const apiKey = process.env.MUSE_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ reply: 'MUSE_API_KEY belum kebaca di Vercel.' });
  }

  try {
    const r = await fetch('https://api.meta.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        model: 'muse-spark-1.3',
        messages: [
          { role: 'system', content: 'Kamu Muse Spark, asisten Kopi Cengkudu 800 MDPL. Jawab singkat, hangat, Bahasa Indonesia.' },
          { role: 'user', content: message }
        ],
        max_tokens: 500
      })
    });

    const data = await r.json();
    const text = data.choices?.[0]?.message?.content || 'Gagal dari Muse: ' + JSON.stringify(data).slice(0, 200);
    return res.status(200).json({ reply: text });
  } catch (e) {
    return res.status(200).json({ reply: 'Gagal nyambung ke Muse: ' + e.message });
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const msg = (body.message || '').toString();
    if (!msg) return res.status(200).json({ reply: 'Pesan kosong.' });
    if (!process.env.GROQ_API_KEY) return res.status(200).json({ reply: 'ERROR: GROQ_API_KEY belum disetting di Vercel.' });
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: "Kamu adalah Muse, asisten AI CENGKUDU OS. Jawab dengan bahasa Indonesia santai, singkat, dan membantu." },
          { role: "user", content: msg }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(200).json({ reply: `ERROR GROQ: ${data.error?.message || 'Gagal panggil Groq'}` });
    return res.status(200).json({ reply: data.choices?.[0]?.message?.content || 'Maaf, tidak ada jawaban.' });
  } catch (e) {
    return res.status(200).json({ reply: `ERROR: ${e.message}` });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ reply: 'API chat aktif' });
  const { message } = req.body || {};
  const r = await fetch("https://api.meta.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.MUSE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "muse-spark",
      messages: [{ role: "user", content: message || "Halo" }]
    })
  });
  const data = await r.json();
  res.status(200).json({ reply: data.choices?.[0]?.message?.content || "Gagal nyambung ke Muse" });
}

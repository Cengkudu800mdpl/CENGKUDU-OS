export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  if(req.method !== 'POST') return res.status(405).json({ reply: 'Method salah' });
  try{
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const msg = (body.message || '').toString();
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Kamu Cengkudu AI, asisten kopi Cengkudu Banyumas, tapi kamu bisa jawab pertanyaan umum apa aja kayak Meta AI. Jawab bahasa gaul Indonesia, singkat, jelas. Kalo ditanya soal kopi Cengkudu, info: Arabika 800mdpl, 250gr Rp 55.000, 500gr Rp 100.000, 1kg Rp 190.000, low acid aman lambung." },
          { role: "user", content: msg }
        ]
      })
    });
    const data = await r.json();
    return res.status(200).json({ reply: data.choices[0].message.content });
  }catch(e){
    return res.status(200).json({ reply: 'Koneksi AI lagi putus, coba lagi ya Komandan.' });
  }
}

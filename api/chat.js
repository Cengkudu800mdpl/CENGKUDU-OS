export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  if(req.method !== 'POST') return res.status(405).json({reply:'Method salah, harus POST'});
  try{
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const msg = (body.message || '').toString().trim();
    if(!msg) return res.status(200).json({reply:'Ketik dulu dong Komandan, mau tanya apa?'});
    if(!process.env.GROQ_API_KEY) return res.status(200).json({reply:'ERROR: GROQ_API_KEY belum dipasang di Vercel Settings > Environment Variables. Pasang dulu baru chat jalan.'});
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions",{
      method:"POST",
      headers:{ "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type":"application/json" },
      body: JSON.stringify({
        model:"llama-3.3-70b-versatile",
        messages:[
          { role:"system", content:"Kamu Cengkudu Chat AI, asisten petani kopi Cengkudu di Banyumas 800 Mdpl. Jawab singkat, jelas, pakai bahasa Indonesia santai kayak teman. Bantu soal kopi, panen, harga, cuaca, dan kode." },
          { role:"user", content: msg }
        ]
      })
    });
    const data = await r.json();
    if(!r.ok) return res.status(200).json({reply:'ERROR GROQ '+r.status+' : '+(data.error?.message || 'Gagal dari Groq. Cek API Key / kuota.')});
    const reply = data.choices?.[0]?.message?.content || 'Groq balas kosong, coba lagi Komandan.';
    return res.status(200).json({reply});
  }catch(e){
    return res.status(200).json({reply:'ERROR SERVER: '+e.message});
  }
}

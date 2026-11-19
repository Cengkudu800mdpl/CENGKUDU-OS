export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  if(req.method !== 'POST') return res.status(405).json({reply:'Method not allowed'});
  try{
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const msg = (body.message || '').toString().trim();
    if(!msg) return res.status(200).json({reply:'Ketik dulu pesannya.'});
    if(!process.env.GROQ_API_KEY) return res.status(200).json({reply:'ERROR: GROQ_API_KEY belum dipasang di Vercel.'});
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method:"POST",
      headers:{
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        model:"llama-3.1-8b-instant",
        messages:[
          { role:"system", content:"Kamu Cengkudu Chat, asisten AI Cengkudu OS. Jawab singkat, padat, pakai bahasa Indonesia santai, bantu user bikin prompt video / ide konten." },
          { role:"user", content: msg }
        ]
      })
    });
    const data = await r.json();
    if(!r.ok) return res.status(200).json({reply:'ERROR GROQ: ' + (data.error?.message || 'Gagal panggil Groq')});
    const reply = data.choices?.[0]?.message?.content || 'Maaf, jawaban kosong dari Groq.';
    return res.status(200).json({reply});
  }catch(e){
    return res.status(200).json({reply:'ERROR SERVER: ' + e.message});
  }
}

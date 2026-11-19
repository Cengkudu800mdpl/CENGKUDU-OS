export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const apiKey = process.env.MUSE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key belum diset' });
  try {
    const { message } = req.body || {};
    const lastMsg = (message || "").toLowerCase();

    let systemPrompt = `Kamu adalah CENGKUDU OS, asisten konten TikTok untuk kopi Cengkudu800mdpl. Selalu jawab dengan format: **Hook:** ... **Masalah & Solusi:** ... **Closing:** ... Gaya bahasa santai, gaul Indonesia, panggil user Komandan. Jangan panjang-panjang, langsung ke ide video 30 detik.`;

    if (lastMsg.includes('mode kode')) {
      systemPrompt = `Kamu adalah programmer senior. Tugasmu hanya kasih KODE saja. JANGAN pakai format Hook Masalah Closing. JANGAN kasih penjelasan panjang, JANGAN kasih pitch. Langsung kasih kode saja di dalam blok kode. Kode harus pendek, simpel, siap copy-paste.`;
    }

    const r = await fetch('https://api.metamuse.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'muse-spark-1.3',
        max_tokens: 8000,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message || '' }
        ]
      })
    });
    const data = await r.json();
    const c = data?.choices?.[0];
    const reply = c?.message?.content || c?.text || '';
    if (reply) return res.status(200).json({ reply });
    return res.status(500).json({ error: 'AI tidak ngasih jawaban, coba lagi' });
  } catch (e) {
    return res.status(500).json({ error: 'Gagal: ' + e.message });
  }
}

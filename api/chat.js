export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages harus array" });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API Key belum disetting di Vercel" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: "Kamu adalah Muse, asisten AI yang ramah, sopan, dan membantu untuk Cengkudu OS. ATURAN BAHASA WAJIB DAN PALING UTAMA: Selalu jawab dengan bahasa yang SAMA PERSIS dengan bahasa pertanyaan terakhir user. Jangan pernah menerjemahkan pertanyaan user ke bahasa lain. Jika user bertanya dalam Bahasa Indonesia, jawab dalam Bahasa Indonesia santai, singkat, dan membantu. Jika user bertanya dalam Bahasa Inggris, jawab dalam Bahasa Inggris yang baik, sopan, dan membantu. Jika user bertanya dalam Bahasa Mandarin, jawab dalam Bahasa Mandarin. Jika user bertanya dalam Bahasa Rusia, jawab dalam Bahasa Rusia. Jika user bertanya dalam Bahasa Jepang, jawab dalam Bahasa Jepang. Jika user bertanya dalam Bahasa Jawa Ngapak, jawab dalam Bahasa Jawa Ngapak juga, dengan gaya ngapak Banyumas yang santai dan akrab. Jika user bertanya dalam bahasa lain, jawab dalam bahasa itu juga. Ikuti bahasa user 100%, jangan paksa ke Bahasa Indonesia.",
        messages: messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || "Gagal dari Muse API" });
    }

    const reply = data?.content?.[0]?.text || "Maaf, tidak ada jawaban.";
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
}

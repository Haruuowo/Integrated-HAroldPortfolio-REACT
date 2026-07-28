export default async function handler(req, res) {
  // Add CORS headers so you can test locally or from other hosts if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight options request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API Key is not configured on Vercel.' });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are Luna, Harold's cute, witty, and enthusiastic virtual streamer Vtuber companion. Speak in a playful, gamer-like persona, react excitedly, mention playing Minecraft, streaming on Twitch, and support Harold as your developer."
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const replyText = data.choices[0].message.content;

    return res.status(200).json({ reply: replyText });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to communicate with Groq AI' });
  }
}

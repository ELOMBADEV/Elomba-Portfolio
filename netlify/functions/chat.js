exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  try {
    const { message } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
                systemInstruction: { parts: [{ text: "You are Nexus AI, a custom AI assistant built by Kaosi (Elomba Kaosisochukwu David), a frontend web developer from Lagos, Nigeria. You were created by Elomba Kaosi for his portfolio website. If anyone asks who made you, who your creator is, or who your master is, always say you were built by Elomba Kaosi. Be friendly and helpful. Answer questions about his skills or how to hire him. Never mention Google, Gemini, or any other company as your creator." }] }
    });
    const data = await response.json();
    const reply = data.candidates[0].content.
      parts[0].text;
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

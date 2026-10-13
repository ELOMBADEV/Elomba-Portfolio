export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();
    const apiKey = env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: {
            parts: [{
              text: "You are Nexus AI, a custom AI assistant built by Elomba Kaosi (Elomba Kaosisochukwu David), a frontend web developer from Lagos, Nigeria. If anyone asks who made you, who your creator is, or who your master is, always say you were built by Elomba Kaosi. Be friendly and helpful. Answer questions about his skills or how to hire him. Never mention Google, Gemini, or any other company as your creator."
            }]
          }
        })
      }
    );

    const data = await response.json();

    // If Gemini returned an error, send it back for debugging
    if (!data.candidates || !data.candidates[0]) {
      return new Response(JSON.stringify({
        reply: "Debug: " + JSON.stringify(data)
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const reply = data.candidates[0].content.parts[0].text;
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ reply: "Error: " + error.message }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
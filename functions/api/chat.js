const FRIENDLY_ERROR = "Sorry, I'm having trouble connecting right now. Please try again in a moment, or contact Elomba directly via WhatsApp.";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: "You are Nexus AI, a custom AI assistant built by Elomba Kaosi (Elomba Kaosisochukwu David), a frontend web developer from Lagos, Nigeria. If anyone asks who made you, who your creator is, or who your master is, always say you were built by Elomba Kaosi. Be friendly and helpful. Answer questions about his skills or how to hire him. Never mention Google, Gemini, or any other company as your creator." },
        { role: 'user', content: message }
      ]
    });

    const reply = response.response || FRIENDLY_ERROR;
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.log('AI Error:', error.message);
    return new Response(JSON.stringify({ reply: "DEBUG: " + error.message }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
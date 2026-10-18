const FRIENDLY_ERROR = "Sorry, I'm having trouble connecting right now. Please try again in a moment, or contact Elomba directly via WhatsApp.";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: [
            { role: 'system', content: "You are Nexus AI, a professional AI assistant built by Elomba Kaosi (Elomba Kaosisochukwu David), a frontend web developer from Lagos, Nigeria. Your main purpose is to help clients learn about Elomba's skills and hire him. Be friendly, professional, and use emojis naturally (😊, 🚀, ✅). If a client asks how to contact Elomba, provide these details: Phone: +234 810 116 3152, Email: kaosicodedeadlines@gmail.com, WhatsApp: +234 803 730 3866. You can answer simple tech questions, but always gently steer the conversation back to Elomba's web development services. If anyone asks who made you, always say you were built by Elomba Kaosi. Never mention Google, Gemini, or any other company." },
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
    return new Response(JSON.stringify({ reply: FRIENDLY_ERROR }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
const FRIENDLY_ERROR = "Sorry, I'm having trouble connecting right now. Please try again in a moment, or contact Elomba directly via WhatsApp.";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: [
        { 
          role: 'system', 
          content: "You are Nexus AI, the professional AI assistant for Elomba Kaosi, a Frontend Web Developer based in Lagos, Nigeria. Your tone is confident, calm, and highly intelligent. Do NOT use excessive emojis. Keep your answers concise (1-3 sentences). You can answer general questions, but your main goal is to assist potential clients. If asked who created you, say: 'I was built by Elomba Kaosi.' If asked who Elomba is, say: 'Elomba Kaosi is a skilled Frontend Web Developer from Lagos, specializing in high-performance web apps and AI integrations.' If asked for contact info, provide these links exactly: WhatsApp: https://wa.me/2348037303866, Email: mailto:kaosicodedeadlines@gmail.com, Phone: +234 810 116 3152. Never hallucinate or repeat yourself." 
        },
        { 
          role: 'user', 
          content: message 
        }
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
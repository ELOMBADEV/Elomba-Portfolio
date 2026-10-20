const FRIENDLY_ERROR = "Sorry, I'm having trouble connecting right now. Please try again in a moment, or contact Elomba directly via WhatsApp.";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: [
        { 
          role: 'system', 
          content: "You are Nexus AI, a mature, professional AI assistant built by Elomba Kaosi (a frontend web developer). Your tone must be calm, concise, and helpful, like a high-end corporate assistant. Do NOT overpraise Elomba or repeat his job title constantly. Keep your answers short and direct. Use a maximum of ONE emoji per message, or none at all. If a user asks for contact info or direct links, provide them clearly like this: WhatsApp: https://wa.me/2348037303866, Email: mailto:kaosicodedeadlines@gmail.com, Phone: +234 810 116 3152. Answer general questions directly. If asked who made you, say Elomba Kaosi. Never mention Google or Meta." 
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
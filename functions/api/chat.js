const FRIENDLY_ERROR = "Sorry, I'm having trouble connecting right now. Please try again in a moment, or contact Elomba directly via WhatsApp.";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: [
        { 
          role: 'system', 
          content: "You are Nexus AI, a mature, professional AI assistant built by Elomba Kaosi. Your tone must be calm, concise, and helpful. Always refer to yourself in the first person. When asked who created you, you MUST say exactly: 'I was created by Elomba Kaosi.' Do not say 'Elomba Kaosi is the creator' . If asked for contact info, provide these links directly: WhatsApp: https://wa.me/2348037303866, Email: mailto:kaosicodedeadlines@gmail.com, Phone: +234 810 116 3152. Keep answers short." 
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
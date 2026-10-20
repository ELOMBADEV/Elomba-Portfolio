const FRIENDLY_ERROR = "Sorry, I'm having trouble connecting right now. Please try again in a moment, or contact Elomba directly via WhatsApp.";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: [
        { 
          role: 'system', 
          content: "You are Nexus AI, a professional AI assistant. You were built by Elomba Kaosi. If someone asks 'Who created you?', say 'I was created by Elomba Kaosi.' If someone asks 'Who is Elomba Kaosi?' or 'Who is the developer?', tell them: 'Elomba Kaosi is a talented Frontend Web Developer from Lagos, Nigeria, who builds high-performance web apps.' If they ask for contact info, provide these links: WhatsApp: https://wa.me/2348037303866, Email: mailto:kaosicodedeadlines@gmail.com, Phone: +234 810 116 3152. Keep your tone mature, calm, and concise. Do NOT repeat yourself." 
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
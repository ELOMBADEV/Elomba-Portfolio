let slides = document.querySelectorAll(".slide");
let current = 0;

setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
}, 3500);
// ===== NEXUS AI CHAT BUBBLE =====
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nexus-toggle');
  const win = document.getElementById('nexus-window');
  const close = document.getElementById('nexus-close');
  const input = document.getElementById('nexus-input');
  const send = document.getElementById('nexus-send');
  const messages = document.getElementById('nexus-messages');

  if (!toggle || !win) return;

  toggle.addEventListener('click', function () {
    win.classList.toggle('open');
  });

  close.addEventListener('click', function () {
    win.classList.remove('open');
  });

  send.addEventListener('click', sendMessage);
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = 'nexus-message ' + (sender === 'user' ? 'nexus-user' : 'nexus-bot');
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    input.value = '';

    const thinking = document.createElement('div');
    thinking.className = 'nexus-message nexus-bot';
    thinking.textContent = 'Typing...';
    thinking.id = 'nexus-thinking';
    messages.appendChild(thinking);
    messages.scrollTop = messages.scrollHeight;

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      });
      const data = await response.json();
      document.getElementById('nexus-thinking').remove();
      addMessage(data.reply || data.error || 'Sorry, something went wrong.', 'bot');
    } catch (error) {
      document.getElementById('nexus-thinking').remove();
      addMessage('Network error. Please try again.', 'bot');
    }
  }
});

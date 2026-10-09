let slides = document.querySelectorAll(".slide");
let current = 0;

setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
}, 3500);
// ===== NEXUS AI CHAT BUBBLE =====
const nexusToggle = document.getElementById('nexus-toggle');
const nexusWindow = document.getElementById('nexus-window');
const nexusClose = document.getElementById('nexus-close');
const nexusInput = document.getElementById('nexus-input');
const nexusSend = document.getElementById('nexus-send');
const nexusMessages = document.getElementById('nexus-messages');

if (nexusToggle) {
  nexusToggle.addEventListener('click', () => {
    nexusWindow.classList.toggle('open');
  });

  nexusClose.addEventListener('click', () => {
    nexusWindow.classList.remove('open');
  });

  nexusSend.addEventListener('click', sendNexusMessage);
  nexusInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendNexusMessage();
  });
}

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = 'nexus-message ' + (sender === 'user' ? 'nexus-user' : 'nexus-bot');
  msg.textContent = text;
  nexusMessages.appendChild(msg);
  nexusMessages.scrollTop = nexusMessages.scrollHeight;
}

async function sendNexusMessage() {
  const message = nexusInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  nexusInput.value = '';

  const thinking = document.createElement('div');
  thinking.className = 'nexus-message nexus-bot';
  thinking.textContent = 'Typing...';
  thinking.id = 'nexus-thinking';
  nexusMessages.appendChild(thinking);
  nexusMessages.scrollTop = nexusMessages.scrollHeight;

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

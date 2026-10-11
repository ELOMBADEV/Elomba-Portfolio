// ===== HERO SLIDER =====
let slides = document.querySelectorAll(".slide");
let current = 0;

if (slides.length > 0) {
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 3500);
}

// ===== NEXUS AI CHAT BUBBLE =====
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nexus-toggle');
  const win = document.getElementById('nexus-window');
  const close = document.getElementById('nexus-close');
  const input = document.getElementById('nexus-input');
  const send = document.getElementById('nexus-send');
  const messages = document.getElementById('nexus-messages');

  if (toggle && win) {
    toggle.addEventListener('click', () => win.classList.toggle('open'));
    close.addEventListener('click', () => win.classList.remove('open'));
    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
  }

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

  // ===== NATIVE COMMENT SECTION =====
  const nameInput = document.getElementById('comment-name');
  const textInput = document.getElementById('comment-text');
  const submitBtn = document.getElementById('comment-submit');
  const commentList = document.getElementById('comment-list');

  if (submitBtn) {
    let comments = JSON.parse(localStorage.getItem('elomba_comments') || '[]');
    renderComments();

    submitBtn.addEventListener('click', function () {
      const name = nameInput.value.trim();
      const text = textInput.value.trim();
      if (!name || !text) { alert('Please fill in both fields.'); return; }
      comments.push({ name, text, date: new Date().toLocaleDateString() });
      localStorage.setItem('elomba_comments', JSON.stringify(comments));
      nameInput.value = '';
      textInput.value = '';
      renderComments();
    });

    function renderComments() {
      commentList.innerHTML = '';
      if (comments.length === 0) {
        commentList.innerHTML = '<p style="color:#888; text-align:center;">No reviews yet. Be the first!</p>';
        return;
      }
      comments.slice().reverse().forEach(c => {
        const div = document.createElement('div');
        div.style.cssText = 'background:#0A1931; padding:15px 20px; border-radius:10px; margin-bottom:10px; border-left:4px solid #FFC300;';
        div.innerHTML = `<strong style="color:#FFC300; display:block; margin-bottom:5px;">${c.name}</strong><p style="color:#E0E0E0; margin:0; font-size:14px;">${c.text}</p><small style="color:#888; font-size:12px;">${c.date}</small>`;
        commentList.appendChild(div);
      });
    }
  }
});
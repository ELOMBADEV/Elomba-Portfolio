document.addEventListener('DOMContentLoaded', function () {
  // ===== NEXUS AI CHAT BUBBLE =====
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

    // Welcome bubble logic
    const welcome = document.getElementById('nexus-welcome');
    const welcomeClose = document.getElementById('nexus-welcome-close');

    if (welcome && !localStorage.getItem('nexus_welcome_seen')) {
      setTimeout(() => welcome.classList.add('show'), 3000);
    }

    if (welcomeClose) {
      welcomeClose.addEventListener('click', () => {
        welcome.classList.remove('show');
        localStorage.setItem('nexus_welcome_seen', 'true');
      });
    }

    toggle.addEventListener('click', () => {
      welcome.classList.remove('show');
      localStorage.setItem('nexus_welcome_seen', 'true');
    });
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
      const response = await fetch('/api/chat', {
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

  // ===== REVIEW SECTION =====
  const nameInput = document.getElementById('comment-name');
  const textInput = document.getElementById('comment-text');
  const submitBtn = document.getElementById('comment-submit');
  const commentList = document.getElementById('comment-list');
  const stars = document.querySelectorAll('.star');
  let selectedRating = 0;

  // Star rating interaction
  if (stars.length > 0) {
    stars.forEach(star => {
      star.addEventListener('mouseover', () => {
        const value = parseInt(star.dataset.value);
        stars.forEach(s => {
          s.classList.toggle('hover', parseInt(s.dataset.value) <= value);
        });
      });
      star.addEventListener('mouseout', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value);
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
          s.textContent = parseInt(s.dataset.value) <= selectedRating ? '★' : '☆';
        });
      });
    });
  }

  if (submitBtn) {
    let comments = JSON.parse(localStorage.getItem('elomba_comments') || '[]');
    renderComments();

    submitBtn.addEventListener('click', function () {
      const name = nameInput.value.trim();
      const text = textInput.value.trim();
      if (!name || !text || selectedRating === 0) {
        alert('Please fill in your name, review, and select a star rating.');
        return;
      }
      comments.push({
        name: name,
        text: text,
        rating: selectedRating,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem('elomba_comments', JSON.stringify(comments));

      nameInput.value = '';
      textInput.value = '';
      selectedRating = 0;
      stars.forEach(s => { s.classList.remove('active'); s.textContent = '☆'; });
      renderComments();
    });

    function renderComments() {
      commentList.innerHTML = '';
      if (comments.length === 0) {
        return; 
      }
      comments.slice().reverse().forEach(c => {
        const div = document.createElement('div');
        div.className = 'review-card';
        const starStr = '★'.repeat(c.rating || 5) + '☆'.repeat(5 - (c.rating || 5));
        div.innerHTML = `
          <div class="review-header">
            <span class="review-name">${c.name}</span>
            <span class="review-stars">${starStr}</span>
          </div>
          <p class="review-text">${c.text}</p>
          <span class="review-date">${c.date}</span>
        `;
        commentList.appendChild(div);
      });
    }
  }
});
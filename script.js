let slides = document.querySelectorAll(".slide");
let current = 0;

setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
}, 3500);
/* ===== NEXUS AI CHAT BUBBLE (WhatsApp-style) ===== */
.nexus-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #0A1128;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 195, 0, 0.5);
  z-index: 9998;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nexus-toggle:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(255, 195, 0, 0.7); }
.nexus-icon { font-size: 28px; position: relative; z-index: 2; }

.nexus-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #FFC300;
  opacity: 0.6;
  animation: nexusPulse 2s infinite;
  z-index: 1;
}
@keyframes nexusPulse {
  0% { transform: scale(1); opacity: 0.6; }
  70% { transform: scale(1.4); opacity: 0; }
  100% { transform: scale(1.4); opacity: 0; }
}

.nexus-window {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 370px;
  height: 520px;
  background: #0A1128;
  border: 1px solid #1B2A4E;
  border-radius: 20px;
  display: none;
  flex-direction: column;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  z-index: 9999;
  overflow: hidden;
  font-family: Arial, sans-serif;
  animation: nexusSlideUp 0.3s ease;
}
.nexus-window.open { display: flex; }
@keyframes nexusSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.nexus-header {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #0A1128;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nexus-header-info { display: flex; align-items: center; gap: 10px; }
.nexus-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #0A1128;
  color: #FFC300;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  box-shadow: 0 0 12px rgba(255, 195, 0, 0.5);
}
.nexus-header h3 { margin: 0; font-size: 16px; }
.nexus-header span { font-size: 12px; display: flex; align-items: center; gap: 4px; }
.nexus-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #22C55E; display: inline-block;
  box-shadow: 0 0 6px #22C55E;
}
.nexus-close {
  background: none; border: none; font-size: 20px;
  cursor: pointer; color: #0A1128; line-height: 1;
}

.nexus-messages {
  flex: 1; padding: 16px; overflow-y: auto;
  display: flex; flex-direction: column; gap: 10px;
  background: #0A1128;
}
.nexus-message {
  padding: 10px 14px; border-radius: 14px;
  max-width: 85%; font-size: 14px; line-height: 1.4;
  word-wrap: break-word;
}
.nexus-bot {
  background: #1B2A4E; color: #FFFFFF;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}
.nexus-user {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #0A1128; align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.nexus-input-area {
  display: flex; padding: 12px; background: #1B2A4E; gap: 8px;
}
.nexus-input-area input {
  flex: 1; padding: 12px; border-radius: 10px;
  border: 1px solid #2E4270; background: #0A1128;
  color: #FFFFFF; font-size: 14px; outline: none;
}
.nexus-input-area input:focus { border-color: #FFC300; }
.nexus-send {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #0A1128; border: none; border-radius: 10px;
  padding: 0 16px; font-size: 16px; cursor: pointer;
}
.nexus-send:hover { opacity: 0.9; }

@media (max-width: 480px) {
  .nexus-window { width: calc(100vw - 32px); height: 70vh; right: 16px; bottom: 90px; }
  .nexus-toggle { bottom: 16px; right: 16px; }
}

// Simple renderer that connects to existing realtime server via WebSocket
// Socket.IO client can run inside Tauri webview if loaded via CDN

(async function(){
  const list = document.getElementById('list');
  const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  if (!list || !isLocal) return;

  // load socket.io client
  const s = document.createElement('script');
  s.src = 'https://cdn.socket.io/4.8.0/socket.io.min.js';
  s.onload = () => {
    const SERVER = 'http://localhost:3001';
    const socket = window.io(SERVER);
    socket.on('connect', ()=> console.log('tauri connected', socket.id));
    socket.on('library:new', (item)=>{
      const el = document.createElement('div');
      el.style.padding='0.75rem'; el.style.marginBottom='0.5rem'; el.style.background='#fff'; el.style.borderRadius='8px';
      el.textContent = `${item.title || item.name} — ${item.author || item.by}`;
      list.prepend(el);
    });
  };
  document.head.appendChild(s);
})();

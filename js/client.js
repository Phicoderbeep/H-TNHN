(function(){
  const list = document.getElementById('list');
  const canUseRealtime = list && typeof window.io === 'function' && ['localhost', '127.0.0.1'].includes(window.location.hostname);

  if (!canUseRealtime) return;

  const SERVER = window.location.origin; // assumes server serves this page
  const socket = window.io(SERVER);

  socket.on('connect', ()=> console.log('connected', socket.id));
  socket.on('library:new', (item)=>{
    const el = document.createElement('div');
    el.textContent = `${item.title || 'Mục mới'} — ${item.author || 'Người dùng'}`;
    list.prepend(el);
  });
})();

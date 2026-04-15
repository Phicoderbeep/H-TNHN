(function(){
  const SERVER = window.location.origin; // assumes server serves this page
  const socket = io(SERVER);
  const list = document.getElementById('list');

  socket.on('connect', ()=> console.log('connected', socket.id));
  socket.on('library:new', (item)=>{
    const el = document.createElement('div');
    el.textContent = `${item.title || 'Mục mới'} — ${item.author || 'Người dùng'}`;
    list.prepend(el);
  });
})();

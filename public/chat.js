const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = (input.value || '').trim();
  if (!text) return;
  socket.emit('chat message', text);
  input.value = '';
});

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  list.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});

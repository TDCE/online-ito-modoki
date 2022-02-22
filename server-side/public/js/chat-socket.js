const socket = io('http://localhost:11002', {
  transports: ['websocket'],
});

const message = document.getElementById('message');
const messages = document.getElementById('messages');

function handleSubmitNewMessage() {
  socket.emit('message', { data: message.value });
}

socket.on('message', ({ data }) => {
  handleNewMessage(data);
});

handleNewMessage = (message) => {
  messages.appendChild(buildNewMessge(message));
};

const buildNewMessge = (message) => {
  console.log(message);
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};

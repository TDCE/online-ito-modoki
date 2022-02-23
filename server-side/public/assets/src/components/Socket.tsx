import { io } from 'socket.io-client';

const socket = io('http://localhost:11002', {
  transports: ['websocket'],
});

const Socket = () => {
  return (
    <div>
      <input id="message" type="text" />
      <button onClick={handleSubmitNewMessage}>Submit</button>
    </div>
  );
};

const handleSubmitNewMessage = () => {
  const message = document.getElementById('message') as HTMLInputElement;

  socket.emit('message', { data: message.value });
};

socket.on('message', ({ data }) => {
  handleNewMessage(data);
});

const handleNewMessage = (message) => {
  const messages = document.getElementById('messages');
  messages.appendChild(buildNewMessge(message));
};

const buildNewMessge = (message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};

export default Socket;

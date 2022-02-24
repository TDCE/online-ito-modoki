import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:11002', {
  transports: ['websocket'],
});

let playerName = '';

const PlayerName = () => {
  // const [count, setCount] = useState(0);
  // setCount(100)
  
  return (
    <div id="playerNameContainer">
      <div>
        <p>名前を登録して参加</p>
        <input id="submitNewPlayerName" type="text" />
        <button onClick={handleSubmitNewPlayerName}>Submit</button>
      </div>
    </div>
  );
};

const handleSubmitNewPlayerName = () => {
  const playerName = document.getElementById(
    'submitNewPlayerName',
  ) as HTMLInputElement;

  socket.emit('playerName', { data: playerName.value });
};

socket.on('playerName', ({ data }) => {
  playerName = data;
  
  let playerNameContainer = document.getElementById('playerNameContainer');

  document.getElementById('submitNewPlayerName').parentElement.remove();

  let playerNameDOM = document.createElement('p');

  console.log(playerNameDOM);

  playerNameContainer.appendChild(playerNameDOM);
  console.log(playerName);
});

export default PlayerName;

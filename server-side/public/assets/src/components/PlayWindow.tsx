import { useState } from 'react';
import { io } from 'socket.io-client';
import { Player } from 'src/types/player';

const socket = io('http://localhost:11002', {
  transports: ['websocket'],
});

const roomId = window.location.pathname;

const PlayWindow = () => {
  const [player, setPlayer] = useState<Player>({});
  const [isAttend, setIsAttend] = useState(false);
  const [onGame, setOnGame] = useState(false);
  const [list, setList] = useState([]);
  const [responsePlayerList, setResponseplayerList] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [wait, setWait] = useState(false);
  const [failed, setFailed] = useState(false);

  const handlesubmitResetGame = () => {
    if (isAttend) {
      socket.emit('resetGame', roomId);
    }
  };

  const handlesubmitNewPlayer = () => {
    const playerName = document.getElementById(
      'submitNewPlayer',
    ) as HTMLInputElement;

    console.log(!onGame);
    console.log(!onGame && !isAttend);

    if (!onGame && !isAttend) {
      socket.emit('player', {
        name: playerName.value,
        id: socket.id,
        roomId: roomId,
      });
    }
  };

  socket.on('resetGame', () => {
    setPlayer({});
    setIsAttend(false);
    setOnGame(false);
    setGameOver(false);
    setFailed(false);
    setResponseplayerList([]);
    setList([]);
  });

  socket.on('player', (player: Player) => {
    setPlayer(player);
    setIsAttend(true);
  });

  socket.on('playerList', (data) => {
    setList(data);
  });

  const handlesubmitStart = () => {
    socket.emit('start', roomId);
  };

  const handlesubmitIsMe = () => {
    socket.emit('isMe', {
      id: socket.id,
      roomId: roomId,
    });
  };

  socket.on('responsePlayerList', (data) => {
    setResponseplayerList(data);
  });

  socket.on('onGame', () => {
    setOnGame(true);
  });

  socket.on('gameOver', () => {
    setGameOver(true);
  });

  socket.on('wait', () => {
    setWait(true);
  });

  socket.on('failed', () => {
    setFailed(true);
  });

  return (
    <div className="container mx-auto">
      <button
        className="p-2 bg-gray-500 text-white rounded-xl"
        onClick={handlesubmitResetGame}
      >
        Reset
      </button>
      {(() => {
        if (isAttend) {
          if (onGame) {
            return (
              <div className="grid place-content-center p-10">
                <div>
                  <p className="p-2">?????????</p>
                </div>
                {responsePlayerList.map(({ name, id, num }) => {
                  return (
                    <li key={id}>
                      {name} : {num}
                    </li>
                  );
                })}
              </div>
            );
          }
          return (
            <div className="grid place-content-center p-10">
              <div>
                <p className="p-2">??????????????????</p>
              </div>
              {list.map(({ name, id }) => {
                return <li key={id}>{name}</li>;
              })}
            </div>
          );
        } else {
          return (
            <div className="grid place-content-center p-10">
              <div>
                <p className="p-2">???????????????????????????</p>
              </div>
              <div className="place-content-center">
                <input
                  className="border-2 border-gray-300 rounded-xl p-2"
                  id="submitNewPlayer"
                  type="text"
                />
                <button
                  className="p-2 m-2 bg-green-500 text-white rounded-xl"
                  onClick={handlesubmitNewPlayer}
                >
                  Submit
                </button>
              </div>
            </div>
          );
        }
      })()}

      {(() => {
        if (isAttend && !onGame) {
          return (
            <>
              <button onClick={handlesubmitStart}>??????????????????????????????</button>
            </>
          );
        }
      })()}

      {(() => {
        if (onGame && isAttend && !wait && !failed) {
          return (
            <>
              <button onClick={handlesubmitIsMe}>???????????????????????????</button>
            </>
          );
        }
      })()}

      {(() => {
        if (gameOver) {
          return (
            <>
              <p>???????????????????????????????????????????????????</p>
            </>
          );
        }
      })()}

      {(() => {
        if (failed) {
          return (
            <>
              <p>??????</p>
            </>
          );
        }
      })()}

      {(() => {
        if (player.num) {
          return (
            <>
              <p>
                {player.name}??????????????????{player.num}?????????
              </p>
            </>
          );
        }
      })()}

      {(() => {
        if (onGame) {
          return (
            <>
              <p>????????????</p>
            </>
          );
        }
      })()}
    </div>
  );
};

export default PlayWindow;

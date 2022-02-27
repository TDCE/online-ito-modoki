import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Player } from './types/player';

let playerList: Player[] = [];
let responsePlayerList: Player[] = [];
let numList: number[] = [];

const rundomNumList = shuffle([...Array(100).keys()].map((i) => ++i));

@WebSocketGateway(11002)
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('resetGame')
  resetGame(client: Socket, roomId: string): void {
    client.join(roomId);
    playerList = [];
    responsePlayerList = [];
    numList = [];
    this.server.to(roomId).emit('resetGame');
  }

  @SubscribeMessage('player')
  handlePlayer(client: Socket, player: Player): void {
    client.join(player.roomId);
    const num = rundomNumList.pop();

    numList.push(num);

    player.num = num;
    playerList.push(player);

    this.server.to(player.id).emit('player', player);
    this.server.to(player.roomId).emit(
      'playerList',
      playerList.filter((p) => p.roomId === player.roomId),
    );
  }

  @SubscribeMessage('start')
  start(client: Socket, roomId: string): void {
    client.join(roomId);
    playerList
      .filter((p) => p.roomId === roomId)
      .map((player) => {
        responsePlayerList.push({
          name: player.name,
          id: player.id,
          roomId: roomId,
        });
      });

    this.server.to(roomId).emit(
      'responsePlayerList',
      responsePlayerList.filter((p) => p.roomId === roomId),
    );
    this.server.to(roomId).emit('onGame');
  }

  @SubscribeMessage('isMe')
  isMe(client: Socket, data): void {
    client.join(data.roomId);
    const id = data.id;
    const num = playerList.find(
      (p) => p.id === id && p.roomId === data.roomId,
    ).num;

    const expect = numList.sort().reverse().pop();
    responsePlayerList.find(
      (p) => p.id === id && p.roomId === data.roomId,
    ).num = num;

    if (numList.length === 0) {
      this.server.to(data.roomId).emit(
        'responsePlayerList',
        responsePlayerList.filter((p) => p.roomId === data.roomId),
      );
      this.server.to(data.roomId).emit('gameOver');
    } else if (num === expect) {
      this.server.to(data.roomId).emit(
        'responsePlayerList',
        responsePlayerList.filter((p) => p.roomId === data.roomId),
      );
      this.server.to(data.roomId).emit('success', {
        num: num,
        id: id,
      });
      this.server.to(id).emit('wait');
    } else {
      this.server.to(data.roomId).emit('failed');
    }
  }
}

function shuffle<T>(array: T[]) {
  const out = Array.from(array);
  for (let i = out.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[r];
    out[r] = tmp;
  }
  return out;
}

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

const playerNameList = [];

@WebSocketGateway(11002)
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  @SubscribeMessage('playerName')
  handlePlayerName(@MessageBody() playerName: string): void {
    playerNameList.push(playerName);
    console.log(playerNameList);
    this.server.emit('playerName', playerName);
  }
}

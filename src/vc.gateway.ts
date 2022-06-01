import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class VcGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('joinRoom')
  handleMessage(client: Socket, payload: any): void {
    client.join(payload.room);
    this.server.in(payload.room).emit('joined', payload.user + ' đã tham gia');
  }

  @SubscribeMessage('sendChat')
  sendChat(client: Socket, payload: any): void {
    this.server.emit('message', payload.chat);
  }

  @SubscribeMessage('playerState')
  playerState(client: Socket, payload: any): void {
    client.to(payload.room).emit('playerStateChange', {
      state: payload.state,
      time: payload.time,
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    // this.server.emit(client.rooms[0],)
  }

  handleDisconnect(client: Socket) {
    this.server.emit(client.rooms[0]);
  }
}

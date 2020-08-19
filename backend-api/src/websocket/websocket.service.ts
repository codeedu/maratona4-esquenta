import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(0, { namespace: 'room' })
export class WebsocketService implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  private users = {};

  handleConnection(client: Socket, ...args: any[]) {
      client.disconnect(true)
    // const {name} = client.handshake.query;
    // this.users[client.id] = {name};
    // console.log(this.users);
  }
//web - Nginx | Apache - Aplicação
  @SubscribeMessage('join')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { name: string; room_id: string },
  ): void {
      //varro o array de users e todos da room_id 23
      //contar, número é atual 2 disconnect
      //
    const { name, room_id } = body;
    this.users[client.id] = { name, room_id };
    client.join(room_id);
    
    console.log('join', client.id, body);
  }

  @SubscribeMessage('send-message')
  sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { message: string },
  ): void {
    const { name, room_id } = this.users[client.id];
    client.broadcast.to(room_id).emit('receive-message', { ...body, name });
    console.log(body);
  }
}

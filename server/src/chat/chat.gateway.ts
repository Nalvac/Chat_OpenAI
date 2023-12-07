import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {ChatService} from "./chat.service";
import {MessageInterface} from "interface/messageInterface";
@WebSocketGateway({
  cors: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;

  messages: Array<MessageInterface> = [];
  constructor(private chatSrv: ChatService) {
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected 🎉: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected 💪: ${client.id}`);
    client.emit('clientId', client.id)
    this.server.emit('message', this.messages);
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: MessageInterface): void {
    this.chatSrv.makeTranslate(message.content, message.language).then(
        (response) => {
          const botResponse: MessageInterface = {content: response.toString(), role: 'bot', language: message.language, sendAt: message.sendAt, userName: 'ChatGpt'}
          this.messages = [...this.messages, message, botResponse];
          this.server.emit('message', this.messages);
        },
        (error) =>  {
          console.log(error);
        }
    );
  }
}

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {ChatService} from "./chat.service";

interface Message {
  content: string;
  role: 'user' | 'bot';
  language: string;
  sendAt: string;
  clientId?: string;
}
@WebSocketGateway({
  cors: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;

  messages: Array<Message> = [];
  constructor(private chatSrv: ChatService) {
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected 🎉: ${client.id}`);
    this.messages = [];
    this.server.emit('message', this.messages);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected 💪: ${client.id}`);
    client.emit('clientId', client.id)
    this.server.emit('message', this.messages);
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: Message): void {
    this.chatSrv.makeTranslate(message.content, message.language).then(
        (response) => {
          const botResponse: Message = {content: response.toString(), role: 'bot', language: message.language, sendAt: (new Date()).toLocaleDateString()}
          this.messages = [...this.messages, message, botResponse];
          this.server.emit('message', this.messages);
        },
        (error) =>  {
          console.log(error);
        }
    );
  }
}

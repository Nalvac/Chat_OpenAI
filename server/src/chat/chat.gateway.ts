import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from "./chat.service";
import { MessageInterface } from "interface/messageInterface";

@WebSocketGateway({
  cors: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  messages: Array<MessageInterface> = [];

  constructor(private chatSrv: ChatService) {}

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected 🎉: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected 💪: ${client.id}`);
    client.emit('clientId', client.id);
    this.sendMessagesToClient(client);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: MessageInterface): void {
      this.messages = [...this.messages, message];
      this.server.emit('message', this.messages);
  }

  sendMessagesToClient(client: Socket) {
    client.emit('message', this.messages);
  }
  @SubscribeMessage('translate')
  handleTranslateMessage(client: Socket, data): void {
    const [messageId, language] = data;
    this.chatSrv.makeTranslate(this.messages[messageId].content, language).then(
        (response) => {
          const translateMessage = [response, messageId];
          client.emit('messageTranslated', translateMessage);
        }
    );
  }



}

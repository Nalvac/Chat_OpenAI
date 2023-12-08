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
	@SubscribeMessage('translateAllReceivedMessage')
	async handleTranslateMessages(client: Socket, data: any): Promise<void> {
		const [language, userContextName] = data;

		try {
			const translatedMessages = await Promise.all(
				this.messages.map(async (message) => {
					if (message.userName !== userContextName && language !== "") {
						const response = await this.chatSrv.makeTranslate(message.content, language);
						if (response !== undefined) {
							return {
								...message,
								content: response
							};
						}
					}
					return message;
				})
			);

			client.emit('allMessagesTranslated', translatedMessages);
		} catch (error) {
			console.error('Erreur lors de la traduction des messages:', error);
		}
	}

	@SubscribeMessage('translate')
	handleTranslateMessage(client: Socket, data): void {
		const [messageId, language] = data;
		console.log(language);
		this.chatSrv.makeTranslate(this.messages[messageId].content, language).then(
				(response) => {
					const translateMessage = [response, messageId];
					client.emit('messageTranslated', translateMessage);
				}
		);
	}



	@SubscribeMessage('check')
	handleCheckMessage(client: Socket, messageId: number) {
		this.chatSrv.validateInformation(this.messages[messageId].content).then(
			(response) => {
				client.emit('messageChecked', response ? 'Vrai' : 'Faux');
			},
			(error) => {
				console.log(error);
			}
		)
	}



}

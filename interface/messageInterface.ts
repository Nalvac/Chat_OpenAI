export interface MessageInterface {
    content: string;
    role: 'user' | 'bot';
    sendAt: string;
    userName: string;
    messageChecked: string;
}
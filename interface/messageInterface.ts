export interface MessageInterface {
    content: string;
    role: 'user' | 'bot';
    language: string;
    sendAt: string;
    userName: string;
}
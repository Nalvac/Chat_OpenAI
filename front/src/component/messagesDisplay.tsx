import React from 'react';

interface Message {
    content: string;
    role: 'user' | 'bot';
    language: string;
    sendAt: string;
    clientId: string;
}

interface Props {
    messages: Array<Message>;
    clientId: string;
}
const MessagesDisplay = ({messages, clientId}: Props) =>  {
    return (
        <div className="flex-1 p-4 overflow-y-auto bg-white">
            {messages.map((message, index) => (
                <div key={index}>
                    <div className={`flex items-center ${message.clientId !== clientId ? 'justify-start' : 'justify-end'}`}>
                        <div className={`flex-col items-center mb-2 bg-blue-400 p-2 rounded-lg`}>
                            <p className={`text-sm font-medium text-white ${message.role !== 'user' ? 'ml-2' : 'mr-2 '}`}>{message.content}</p>
                            <span className={`text-sm text-gray-300 mb-2 `}>{message.sendAt}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MessagesDisplay;

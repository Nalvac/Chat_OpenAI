import React from 'react';

interface Message {
    content: string;
    role: 'user' | 'bot';
    language: string;
}

interface Props {
    messages: Array<Message>;
}
const MessagesDisplay = ({messages}: Props) =>  {
    return (
        <div className="flex-1 p-4 overflow-y-auto">
            {/* Afficher les messages */}
            {messages.map((message, index) => (
                <div key={index} className={`flex items-center ${message.role !== 'user' ? 'justify-start' : 'justify-end'} mb-2`}>
                    <div className={`flex items-center ${message.role !== 'user' ? '' : 'flex-row-reverse'} mb-2 `}>
                        <img src="https://placehold.co/40x40/eeeeee/4B5563/png?text=image" alt="User" className="w-8 h-8 rounded-full" />
                        <p className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${message.role !== 'user' ? 'ml-2' : 'mr-2'}`}>{message.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MessagesDisplay;

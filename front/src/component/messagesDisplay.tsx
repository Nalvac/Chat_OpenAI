'use client';

import React, { useState } from 'react';
import { MessageInterface } from 'interface/messageInterface';

interface Props {
    messages: Array<MessageInterface>;
    userContextName: string;
    handleTranslateMessage: (index: number, selectedLanguage: string) => void;
}

const MessagesDisplay = ({ messages, userContextName, handleTranslateMessage }: Props) => {

    const [selectedLanguage, setSelectedLanguage] = useState("");
    return (
        <div className="flex-1 p-4 overflow-y-auto bg-white">
            {messages.map((message, index) => (
                <div key={index}>
                    <small className={`text-gray-600 flex  ${message.userName !== userContextName ? 'justify-start' : 'justify-end'}`}>
                        {message.userName}
                    </small>
                    <div className={`flex items-center ${message.userName !== userContextName ? 'justify-start' : 'justify-end'}`}>
                        <div className={`flex-col items-center mb-2 ${message.userName !== userContextName ? 'bg-green-600' : 'bg-blue-400'}  p-2 rounded-lg`}>
                            <p className={`text-sm font-medium text-white `}>{message.content}</p>
                            <span className={`text-sm text-gray-300 mb-2 `}>{message.sendAt}</span>
                        </div>
                    </div>
                    {message.userName !== userContextName && (
                        <div className={`flex items-center ${message.userName !== userContextName ? 'justify-start' : 'justify-end'} mb-4`}>
                        <select
                                value={selectedLanguage}
                                onChange={(e) => {
                                    handleTranslateMessage(index, e.target.value);
                                    setSelectedLanguage(e.target.value);
                                }}
                                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 mr-5"
                            >
                                <option value="Ne traduit pas" disabled>Traduction</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="es">Spanish</option>
                            </select>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MessagesDisplay;

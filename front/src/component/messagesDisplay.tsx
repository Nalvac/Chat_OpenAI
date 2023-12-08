'use client';

import React, {useEffect, useState} from 'react';
import { MessageInterface } from 'interface/messageInterface';

interface Props {
    messages: Array<MessageInterface>;
    userContextName: string;
    handleTranslateMessage: (index: number, selectedLanguage: string) => void;
    handleMessageVerification: (index: number) => void;
}

const MessagesDisplay = ({ messages, userContextName, handleTranslateMessage, handleMessageVerification }: Props) => {

    useEffect(() => {

    }, [handleMessageVerification,userContextName ]);

    const [selectedLanguage, setSelectedLanguage] = useState("");
    return (
        <div className="flex-1 p-4 overflow-y-auto bg-white">
            {messages?.map((message, index) => (
                <div key={index}>
                    <small className={`text-gray-600 flex  ${message.userName !== userContextName ? 'justify-start' : 'justify-end'}`}>
                        {message.userName}
                    </small>
                    <div className={`flex items-center ${message.userName !== userContextName ? 'justify-start' : 'justify-end'}`}>
                        <div className={`flex-col items-center mb-2 ${message.userName !== userContextName ? 'bg-green-800' : 'bg-blue-800'}  p-2 rounded-lg`}>
                            <p className={`text-sm font-medium text-white `}>{message.content}</p>
                            <span className={`text-sm text-gray-300 mb-2 `}>{message.sendAt}</span>
                        </div>
                        { message.messageChecked === 'Vrai' ? (
                            <div key={index} className="flex items-center justify-center h-full">
                                <div className="ml-5 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                                d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                            </div>
                        ) : message.messageChecked === 'Faux' ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="ml-5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                    d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                </div>
                        ): null}
                    </div>
                    {message.userName !== userContextName && (
                        <div className={`flex items-center ${message.userName !== userContextName ? 'justify-start' : 'justify-end'} mb-4`}>
                            <select
                                onChange={(e) => {
                                    handleTranslateMessage(index, e.target.value);
                                    setSelectedLanguage(e.target.value);
                                }}
                                className=" px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            >
                                <option value="" >Traduction</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="es">Spanish</option>
                            </select>
                            <button
                                className="bg-blue-800 ml-4 text-sm text-white  hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-4 py-2 font-medium transition duration-300"
                                onClick={(e) => handleMessageVerification(index)}
                            >
                                Vérifier
                            </button>

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MessagesDisplay;

"use client";

import React, { useEffect, useState } from "react";
import {useUser} from "@/context/userContext";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {MessageInterface} from "interface/messageInterface";
import io from "socket.io-client";
import MessagesDisplay from "@/component/messagesDisplay";

export default function Home() {
    const socket = io('http://localhost:4000');
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedLanguageForAll, setSelectedLanguageForAll] = useState("");
    const [inputMessage, setInputMessage] = useState("");
    const [clientId, setClientId] = useState<string>('');
    const { userContextName } = useUser();
    const router = useRouter();


    useEffect(() => {
        if (!userContextName) {
            toast.error("Le nom d'utilisateur est vide. Vous allez être redirigé vers la page d'accueil...", {
                position: "top-right",
                autoClose: 3000
            });
            router.push('/');
            return;
        }

        socket.on('connect', () => {
            console.log('Connecté au serveur WebSocket');
        });
        socket.on('clientId', (clientId: string) => {
            console.log(clientId);
            setClientId(clientId);
        })

        socket.on('message', (messages: Array<MessageInterface>) => {
            setMessages(messages);
        });

        return () => {
            socket.disconnect();
        };
    }, [userContextName, router]);

    const handleSendMessage = () => {
        if (inputMessage !== '' && clientId) {
            socket.emit('message', { content: inputMessage, role: 'user', sendAt: (new Date()).toLocaleDateString(), userName: userContextName, messageChecked: ''} as MessageInterface);
        }
        setInputMessage("");
    };

    const handleTranslateMessages = (language: string) => {
        
        socket.emit('translateAllReceivedMessage', language, userContextName);

        socket.once('allMessagesTranslated', (messages: Array<MessageInterface>) => {
            setMessages(messages);
        });
    };

    const handleTranslateMessage = (messageId: number, language: string) => {
        socket.emit('translate', messageId, language);

        socket.once('messageTranslated', (data: any) => {
            const currentMessages = [...messages];
            const [response, translatedMessageId] = data;
            currentMessages[translatedMessageId].content = response;

            setMessages(currentMessages);
        });
    };

    const handleMessageVerification = (messageId: number) =>  {
        socket.emit('check', messageId);

        socket.once('messageChecked', (messageChecked: string) => {
            const currentMessages = [...messages];
            currentMessages[messageId].messageChecked = messageChecked;
            setMessages(currentMessages);
        });
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">

            <div className="p-4 bg-white border-b border-gray-200 dark:border-gray-700">
                <select
                    value={selectedLanguageForAll}
                    onChange={(e) => {
                        handleTranslateMessages(e.target.value);
                        setSelectedLanguageForAll(e.target.value);
                        setSelectedLanguage(e.target.value);
                    }}
                    className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                >
                    <option value="">Traduction de tous les messages</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                </select>

                <button
                        className="text-sm text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 rounded-lg px-4 py-2 font-medium ml-4 transition duration-300"
                >
                    Demander une suggestion
                </button>
            </div>


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
                                        className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 mr-5"
                                >
                                    <option value="" >Traduction</option>
                                    <option value="en">English</option>
                                    <option value="fr">French</option>
                                    <option value="es">Spanish</option>
                                </select>
                                <button
                                    className="text-sm text-white bg-blue-800 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-4 py-2 font-medium transition duration-300"
                                    onClick={(e) => handleMessageVerification(index)}
                                >
                                    Vérifier
                                </button>

                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-700">
                <input
                    type="text"
                    placeholder="Votre message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 px-4 py-2 mr-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
                <button
                    type="button"
                    onClick={handleSendMessage}
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-6 py-2 text-sm font-medium"
                >
                    Envoyez
                </button>
            </div>
        </div>
    );
}

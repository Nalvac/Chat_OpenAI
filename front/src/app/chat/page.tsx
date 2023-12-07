"use client";
import io from 'socket.io-client';
import React, { useEffect, useState } from "react";

const socket = io('http://localhost:4000');

// Interface pour représenter la structure d'un message
interface Message {
    content: string;
    role: 'user' | 'bot';
    language: string;
    sendAt: string;
    clientId: string;
}

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [clientId, setClientId] = useState<string>('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connecté au serveur WebSocket');
        });
        socket.on('clientId', (clientId: string) => {
            console.log(clientId);
            setClientId(clientId);
        })

        socket.on('message', (messages: Array<Message>) => {
            setMessages(messages);
        });
    }, []);

    const handleSendMessage = () => {
        if (inputMessage !== '' && clientId) {
            socket.emit('message', { content: inputMessage, role: 'user', language: selectedLanguage,sendAt: (new Date()).toLocaleDateString(), clientId: clientId});
        }
        setInputMessage("");
    };

    const handleSelectedLanguage = (event: any) => {
        setSelectedLanguage(event.target.value)
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
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
            <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-700">
                <input
                    type="text"
                    placeholder="Votre message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 px-4 py-2 mr-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
                <select
                    value={selectedLanguage}
                    onChange={handleSelectedLanguage}
                    className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 mr-5">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                </select>
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
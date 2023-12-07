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
    const [inputMessage, setInputMessage] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [clientId, setClientId] = useState<string>('');
    const { userContextName } = useUser();
    const router = useRouter();


    useEffect(() => {
        // Vérifie si le nom d'utilisateur existe
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
            console.log(messages);
            setMessages(messages);
        });

        // Nettoie en se déconnectant du socket lors du démontage du composant
        return () => {
            socket.disconnect();
        };
    }, [userContextName, router]);

    const handleSendMessage = () => {
        if (inputMessage !== '' && clientId) {
            socket.emit('message', { content: inputMessage, role: 'user', language: selectedLanguage,sendAt: (new Date()).toLocaleDateString(), userName: userContextName} as MessageInterface);
        }
        setInputMessage("");
    };

    const handleTranslateMessage = (messageId: number, language: string) => {
        socket.emit('translate', messageId, language);

        console.log(language);
        // Écoutez l'événement une seule fois
        socket.once('messageTranslated', (data: any) => {
            // Faites une copie de l'état actuel des messages
            const currentMessages = [...messages];
            console.log(data);
            // Mettez à jour le message traduit spécifique
            const [response, translatedMessageId] = data;
            currentMessages[translatedMessageId].content = response;

            // Mettez à jour l'état des messages avec la fusion des anciens et des nouveaux messages
            setMessages(currentMessages);
        });
    };


    const handleSelectedLanguage = (event: any) => {
        setSelectedLanguage(event.target.value)
    }


    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
            <MessagesDisplay messages={messages} userContextName={userContextName} handleTranslateMessage={handleTranslateMessage}></MessagesDisplay>
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

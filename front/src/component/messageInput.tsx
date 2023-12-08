'use client';
import React from 'react';

interface ChatInputProps {
    inputMessage: string;
    setInputMessage: (value: string) => void;
    selectedLanguage: string;
    setSelectedLanguage: (value: string) => void;
    handleSendMessage: () => void;

}
const MessageInput = ({
          inputMessage,
          setInputMessage,
          selectedLanguage,
          setSelectedLanguage,
          handleSendMessage,
      }: ChatInputProps) => {
    return (
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
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 mr-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 mr-5"
            >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
            </select>
            <button
                type="button"
                onClick={handleSendMessage}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-blue-600 dark:focus:ring-blue-600 rounded-lg px-4 py-2"
            >
                Envoyez
            </button>
        </div>
    )
}

export default MessageInput;
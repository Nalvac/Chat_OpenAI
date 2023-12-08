'use client';
import React from 'react';

interface ChatInputProps {
    inputMessage: string;
    setInputMessage: (value: string) => void;
    handleSendMessage: () => void;
}
const MessageInput = ({
          inputMessage,
          setInputMessage,
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
            <button
                type="button"
                onClick={handleSendMessage}
                className="bg-blue-800 ml-4 text-sm text-white  hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-4 py-2 font-medium transition duration-300"
            >
                Envoyez
            </button>
        </div>
    )
}

export default MessageInput;
"use cleint";
import React from "react";
import { MessageInterface } from 'interface/messageInterface';
interface Props {
	messages: Array<MessageInterface>;
	userContextName: string;
	suggestionRequested: boolean;
	handleKeepSuggestionMessage: (index: number) => void;
}
const GptSuggestionDisplay = ({messages, userContextName, suggestionRequested, handleKeepSuggestionMessage}: Props) => {
	return (
		<>
			{ suggestionRequested && (
				<div className="message-container">
					<p className={'flex justify-center text-black text-lg mt-5'}>Parmi ces réponses choisissez celle qui vous convient.</p>
				</div>
			)}
			{ suggestionRequested && messages?.map((message, index) => (
				<div key={index}>
					<small className={`text-gray-600 flex  ${message.userName !== userContextName ? 'justify-start' : 'justify-end'}`}>
						{message.userName}
					</small>
					<div className={`flex items-center ${message.userName !== userContextName ? 'justify-start' : 'justify-end'}`}>
						<div className={`flex-col items-center mb-2 ${message.userName !== userContextName ? 'bg-green-800' : 'bg-blue-800'}  p-2 rounded-lg`}>
							<p className={`text-sm font-medium text-white `}>{message.content}</p>
							<span className={`text-sm text-gray-300 mb-2 `}>{message.sendAt}</span>
						</div>
					</div>
					{message.userName !== userContextName && (
						<div className={`flex items-center ${message.userName !== userContextName ? 'justify-start' : 'justify-end'} mb-4`}>
							<button
								className="text-sm text-white bg-blue-800 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-4 py-2 font-medium transition duration-300"
								onClick={(e) => handleKeepSuggestionMessage(index)}
							>
								Choisir
							</button>
						</div>
					)}
				</div>
			)) }
		</>
	)
}
export default GptSuggestionDisplay;
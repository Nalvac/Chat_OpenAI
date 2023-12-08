import React from "react";

interface MessageCheckedIconProps {
    messageChecked: string;
}

const MessageCheckedIcon: React.FC<MessageCheckedIconProps> = ({ messageChecked }) => {
    const getIcon = () => {
        if (messageChecked === 'Vrai') {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="ml-5 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>
            );
        } else if (messageChecked === 'Faux') {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="ml-5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            {getIcon()}
        </>
    );
};

export default MessageCheckedIcon;

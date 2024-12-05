import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

export const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (emoji) => {
        setMsg(msg + emoji.emoji);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length > 0){
            handleSendMsg(msg);
            setMsg('')
        }
    }

    return (
        <div className="flex items-center w-full relative">
            {/* Emoji Button */}
            <div className="mx-2">
                <BsEmojiSmileFill 
                    onClick={handleEmojiPickerHideShow} 
                    className="text-2xl cursor-pointer text-gray-500 hover:text-yellow-500"
                />
                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div className="absolute bottom-full left-0">
                        <Picker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>

            {/* Input Form */}
            <form className="flex items-center w-full mx-2" onSubmit={(e) => sendChat(e)}>
                <input
                    type="text"
                    id="default-input"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    autoComplete="off"
                    placeholder="Type your message..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

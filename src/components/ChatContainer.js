import React, { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import No from '../assets/No.gif'
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../utils/ApiRoute";

export const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    useEffect(() => {
        const fetchMessages = async () => {
            if (!currentUser || !currentChat) return;

            try {
                const response = await axios.post(getAllMessageRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                });
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [currentChat, currentUser]);

    const handleSendMsg = async (msg) => {
        if (!msg) {
            console.log("Message is empty!"); // Debugging empty message
            return;
        }

        try {
            const response = await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });
            console.log(response);
            console.log("Sending message:", msg); // Debugging sent message

            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: currentUser._id,
                msg,
            });

            setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };


    useEffect(() => {
        if (socket.current) {
            const currentSocket = socket.current; // Save the current value of socket.current
            currentSocket.on("msg-recieve", (msg) => {
                console.log("Received message data:", msg); // Check full message data
                if (msg && msg.message) {
                    setArrivalMessage({ fromSelf: false, message: msg.message });
                } else {
                    console.log("Invalid message format received:", msg);
                }
            });
    
            return () => {
                currentSocket.off("msg-recieve"); // Use the saved reference for cleanup
            };
        }
    }, [socket]);
    





    useEffect(() => {
        if (arrivalMessage) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage]);



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <>
            {currentChat && (
                <div className="grid grid-rows-[10%_80%_10%] h-full">
                    <div className="bg-blue-700">
                        <div className="flex items-center p-2">
                            <div>
                                <img
                                    className="h-10 w-10"
                                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                    alt="avatar"
                                />
                            </div>
                            <div>
                                <h3 className="m-2 text-white font-bold">{currentChat.username}</h3>
                            </div>
                        </div>
                    </div>

                    <div className=" overflow-y-scroll scrollbar-thin scrollbar-thumb-rose-500 scrollbar-track-transparent p-4 max-h-[calc(100vh-150px)]"> {/* Make this container scrollable */}
                        <div className="w-full">
                            {messages.length === 0 && <div className="h-40 w-40">
                                <img src={No} alt="No-image" />
                                </div>}
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message ${message.fromSelf ? "sended" : "received"}`}
                                >
                                    <div className="content m-2">
                                        {message.message ? (
                                            <p
                                                className={`rounded-b-xl p-4 mb-6 max-w-[40%] ${message.fromSelf
                                                    ? "bg-gray-600 text-white rounded-tl-xl text-xl ml-auto"
                                                    : "bg-blue-300 text-xl rounded-tr-xl mr-auto"
                                                    }`}
                                            >
                                                {message.message}
                                            </p>
                                        ) : (
                                            <p className="text-red-500 text-xl">Not a message</p>
                                        )}
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>

                    <div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>
                </div>
            )}
        </>
    );
};

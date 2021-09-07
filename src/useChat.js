import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import moment from "moment";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { roomId },
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        const incomingMessage = {
            ...message,
            ownedByCurrentUser: message.senderId === socketRef.current.id,
        };
        setMessages((messages) => [...messages, incomingMessage]);
        });

        return () => {
        socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody) => {
            socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            // timeStamp: new Date().toLocaleTimeString(),
            // timeStamp : moment().format('hh:mm'),
            timeStamp : moment().format('YYYY-MM-DD hh:mm'),
            date : moment().format('YYYY년 MM월 DD일'), //보낸 날짜
        });
    };

    return { messages, sendMessage };
};

export default useChat;
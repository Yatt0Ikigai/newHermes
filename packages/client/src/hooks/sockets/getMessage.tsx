import { useEffect, useState } from "react";
import { socket } from "../../App";

import { IMessage } from "../../interfaces/messages.interface";

const useChat = () => {
    const [message, setMessage] = useState<IMessage | null>(null);

    useEffect(() => {
        socket.on("newMessage", (newMess: IMessage) => {
            setMessage(newMess);
        });
    
        return () => {
            socket.off('newMessage');
        };
    }, [socket]);

    return { message };
};

export default useChat;
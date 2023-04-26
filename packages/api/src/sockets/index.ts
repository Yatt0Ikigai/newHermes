import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io"


import { verifyJWT } from "../../src/utils/jwt";
import { access_token_secret, refresh_token_secret } from "../../src/config/default";
import { redisClient } from "../../src/trpc/redisServer";

import { Express } from "express";
import { findChat, updateChat } from "../utils/prisma/chatUtils";
import { createMessage } from "../utils/prisma/messageUtils";

const socketPort = 8000;

module.exports = (app: Express) => {
    let sockets = new HTTPServer(app);

    const io = new Server(sockets, {
        cors: {
            origin: [true, "http://localhost:3000"],
            credentials: true,
        },
    })

    io.on("connect", (socket: Socket) => {
        console.log("Connected " + socket.id);

        socket.on('handshake', async () => {
            console.log('Handshake received from ' + socket.id);
            const cookies = socket.request.headers.cookie?.split('; ');
            if (!cookies) return;
            cookies?.map(async (el) => {
                if (el.includes("refresh_token=")) {
                    const token = el.split("=")[1];
                    const { payload, err, expired } = verifyJWT(token, refresh_token_secret);
                    if (err || expired || !payload) return;
                    if (await redisClient.exists(payload.id) && await redisClient.sIsMember(payload.id, token)) {
                        socket.join(payload.id);
                        console.log(socket.id + ' joined ' + payload.id);
                    }
                    else return;
                }
            })
        })

        socket.on('disconnect', () => {
            console.log('Disconnect received from ' + socket.id)
        })

        socket.on('sendMessage', async (message) => {
            const chat = await findChat({ id: message.chatId });
            if (!chat) socket.send({
                message: "Can't find chat",
            }, socket)

            if (!chat.participantsIds.includes(message.userId)) socket.send({
                message: "Can't find chat",
            }, socket)

            const mes = await createMessage({
                senderId: message.userId,
                inboxId: message.chatId,
                message: message.content
            });

            chat.participantsIds.map((participantId) => {
                emitEvent({
                    event: 'newMessage',
                    roomID: participantId,
                    data: {
                        ...mes,
                        author: "user.firstName + ' ' + user.lastName"
                    }
                })
            });
            await updateChat({ id: message.chatId }, { lastMessage: mes.id });
        })
    })


    sockets.listen(socketPort, () => {
        console.log(`✅ Sockets listening at http://localhost:${socketPort}`);
    });

    const emitEvent = ({ senderID, roomID, receiverID, data, event }: { senderID?: string, roomID?: string, receiverID?: string, data: any, event: socketEvents }) => {
        if (roomID) io.sockets.to(roomID).emit(event, data);
        if (senderID) io.sockets.to(senderID).emit(event, data);
    }

    type socketEvents = "newMessage";
}

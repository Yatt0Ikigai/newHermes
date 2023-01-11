import express from "express";
import { findChat } from "../utils/chatUtils";
import { postMessage, createChat, getMessages, getSelfInfo } from "../controllers/chats.controller";
import { Server } from "http";

module.exports = function (app: express.Application, socket:any) {
    app.get('/chats/init', async (req: any, res, next) => {
        try {
            if (req.user === undefined) new Error("User not logged in");
            const user = await getSelfInfo({ selfId: req.user.id })
            res.status(200).json(user);
        } catch {
            (err: any) => {
                console.log(err);
                res.status(500).json(err);
            }
        }
    })

    app.post('/chats/:id/message', async (req: any, res, next) => {
        try {
            if (req.user === undefined) throw "Not Authenticated";
            const chat = await findChat({ id: req.params.id, })
            const message = await postMessage({ chatId: chat.id, userId: req.user.id, message: req.body.message });
            if(message){
                res.status(200).json({message: "Message successfully sent"});
                chat.participantsIds.map((id) => {
                    socket.to(id).emit("messageReceived", {
                        id: message.id,
                        message: message.message,
                        senderId: message.senderId,
                        chatId: chat.id,
                    })
                })
            }
            else res.status(500)
        } catch {
            (err: any) => {
                console.log(err);
                res.status(500).json(err);
            }
        }
    })

    app.post('/chats', async (req: any, res, next) => { 
        try {
            if (req.user === undefined) new Error("User not logged in");
            const chat = await createChat({participantsIds: req.body.participants})
            res.status(200).json({
             chat
            })
        } catch {
            (err: any) => {
                console.log(err);
                res.status(500).json(err);
            }
        }
    })

    app.get('/chats/:id', async(req:any,res,next) => {
        try {
            if (req.user === undefined) new Error("User not logged in");
            const messages = await getMessages({chatId: req.params.id, userId: req.user.id})
            res.status(200).json(
             messages
            )
        } catch {
            (err: any) => {
                console.log(err);
                res.status(500).json(err);
            }
        }
    })


}
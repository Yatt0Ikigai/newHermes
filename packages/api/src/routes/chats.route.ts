import express from "express";
import { findChat } from "../utils/chatUtils";
import { postMessage, createChat, getMessages } from "../controllers/chats.controller";
import { Server } from "http";

module.exports = function (app: express.Application, socket:any) {
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
            (e: any) => {

            }
        }
    })

    app.post('/chats', async (req: any, res, next) => { 
        try {
            if (req.user === undefined) new Error("User not logged in");
            const chat = await createChat({participants: req.body.participants})
            res.status(200).json({
             chat
            })
        } catch {
            (e: any) => {

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
            (e: any) => {

            }
        }
    })

    app.get('/chats', async (req: any, res, next) => {
        try {
            if (!req.user.authenticated()) throw "Not Authenticated";
        } catch {
            (e: any) => {

            }
        }
    })
}
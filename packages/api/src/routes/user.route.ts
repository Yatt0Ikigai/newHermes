import { prisma } from "../utils/prisma";
import {
    findUserController,
    sendFriendRequestController,
    userAcceptFriendRequestController,
    userDeclineFriendRequestController,
    userUnfirendUserController,
    userCancelFriendRequestController,
    userGetRequestListController
} from "../controllers/user.controller";
import express from "express";

module.exports = function (app: express.Application) {
    app.post('/findUserByName', async (req: any, res, next) => {
        try {
            if (!req.user) return [];
            const data = await findUserController({ username: req.body.username, userID: req.user.id });
            res.send(data)
        } catch { (e: any) => { } }
        return [];
    })
    app.post('/userSendFriendRequest', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            await sendFriendRequestController({ userId: req.body.userId, selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("Request Sent");
        } catch { }
    })

    app.post('/userAcceptFriendRequest', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            await userAcceptFriendRequestController({ userId: req.body.userId, selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("User Added to Friends");
        } catch { }
    })

    app.post('/userDeclineFriendRequest', async (req: any, res, next) => {
        console.log("HEyo")
        try {
            if (req.user === undefined) return new Error("User not logged in");
            await userDeclineFriendRequestController({ userId: req.body.userId, selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("Request Declined Succesfully");
        } catch { }
    })

    app.post('/userUnfriendUser', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            await userUnfirendUserController({ userId: req.body.userId, selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("Unfriended Succesfully");
        } catch { }
    })

    app.post('/userCancelFriendRequest', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            await userCancelFriendRequestController({ userId: req.body.userId, selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("Request Cancelled Succesfully");
        } catch { }
    })

    app.get('/userGetRequestList', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            userGetRequestListController({ selfId: req.user.id }).then((data) => {
                res.send(data)
            })
        } catch { }

    })
}
import { prisma } from "../utils/prisma";
import {
    findUserController,
    sendFriendRequestController,
    userAcceptFriendRequestController,
    userDeclineFriendRequestController,
    userUnfirendUserController,
    userCancelFriendRequestController,
    userGetRequestListController,
    userGetInfoController,
    userPublicInfoController,
} from "../controllers/user.controller";
import express from "express";

module.exports = function (app: express.Application) {
    app.post('/findUserByName', async (req: any, res, next) => {
        try {
            if (!req.user) return [];
            const data = await findUserController({ username: req.body.username, userID: req.user.id });
            res.status(200).json(data)
        } catch { (e: any) => { } }
        return [];
    })

    app.post('/user/friend/request', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            await sendFriendRequestController({ friendId: req.body.userId, selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("Request Sent");
        } catch { }
    })

    app.post('/user/request', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            await userAcceptFriendRequestController({ userId: req.body.userId, selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("User Added to Friends");
        } catch { }
    })

    app.delete('/user/request/:id', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            await userDeclineFriendRequestController({ userId: req.params.id , selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("Request Declined Succesfully");
        } catch { }
    })

    app.delete('/user/friend/:id', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            console.log("Deleting friend");
            await userUnfirendUserController({ userId: req.params.id, selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("Unfriended Succesfully");
        } catch { }
    })

    app.delete('/user/friend/request/:id', async (req: any, res, next) => {
        try {
            if (req.user === undefined) return new Error("User not logged in");
            await userCancelFriendRequestController({ userId: req.params.id, selfId: req.user.id }).catch((err) => {
                res.send(err.message);
                return;
            });
            res.send("Request Cancelled Succesfully");
        } catch { }
    })

    app.get('/user/info', async (req: any, res, next) => {
        try {
            if (req.isAuthenticated()) {
                const user = await userGetInfoController({ selfId: req.user.id })
                res.status(200).json({
                    user
                })
            } else {
                res.status(401).json({
                    message: "User not authenticated"
                })
            }
        } catch {
            (err:any) => {
                res.status(500).json(err);
            }
        }
    })

    app.get('/user/:userId/publicInfo', async(req:any,res,next) => {
        try{
            if (req.isAuthenticated()) {
                const user = await userPublicInfoController({userId: req.params.userId, selfId: req.user.id});
                res.status(200).json(user)
            } else {
                res.status(401).json({
                    message: "User not authenticated"
                })
            }
        } catch{
            (err:any) => {
                res.status(500).json(err);
            }
        }
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

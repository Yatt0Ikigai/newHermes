import express from "express";

import {
    cancelFriendRequest,
    getFriendList,
    getFriendRequests,
    declineFriendRequest,
    sendFriendRequest,
    acceptFriendRequest,
    unfriendUser,
    getSelfInfo
} from "../controllers/friends.controller";

import { findUser } from "../utils/userUitls";

module.exports = function (app: express.Application, socket: any) {
    /*                                                         GET                                                                        */
    
    app.get('/friends/init', async (req: any, res, next) => {
        //GET LOGGED USER DATA
        try {
            if (req.user === undefined) new Error("User not logged in");
            const info = await getSelfInfo({ userId: req.user.id })
            res.status(200).json(info)
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })

    app.get("/friends/list/:userId", async (req: any, res, next) => {

        //GET USER FRIEND LIST
        try {
            if (req.user === undefined) new Error("User not logged in");
            const result = await getFriendList({ userId: req.params.userId })
            res.status(200).json(result)
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })


    app.get('/friends/requests', async (req: any, res, next) => {
        try {
            //GET USER (REQUESTS FROM OTHERS TO USER) LIST
            if (req.user === undefined) new Error("User not logged in");
            const result = await getFriendRequests({ selfId: req.user.id })
            res.status(200).json(result)
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })

    /*                                                         POST                                                                        */


    app.post('/friends/requests', async (req: any, res, next) => {
        //SEND FRIEND REQUEST
        try {
            if (req.user === undefined) new Error("User not logged in");
            const result = await sendFriendRequest({ friendId: req.body.userId, selfId: req.user.id });
            const user = await findUser({id: req.user.id}, {firstName:true, lastName:true, id:true});
            socket.to(req.body.userId).emit("gotFriendRequest", {
                id : user.id,
                firstName: user.firstName,
                lastName: user.lastName
            })
            res.status(200).send(result);
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })

    app.post('/friends', async (req: any, res, next) => {
        //ACCEPT FRIEND REQUEST
        try {
            if (req.user === undefined) return new Error("User not logged in");
            const result = await acceptFriendRequest({ userId: req.body.userId, selfId: req.user.id })
            const user = findUser({id:req.user.id},{id:true,firstName:true,lastName:true})
            socket.to(req.params.id).emit("acceptFriendship", {
                friend: user,
            })
            res.status(200).send(result);
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })
    /*                                                         DELETE                                                                        */


    app.delete('/friends/requests/self/:id', async (req: any, res, next) => {
        //CANCEL USER (FROM SELF TO OTHER) REQUEST
        try {
            if (req.user === undefined) new Error("User not logged in");
            const result = await cancelFriendRequest({ userId: req.params.id, selfId: req.user.id });
            socket.to(req.params.id).emit("cancelFriendRequest", {
                friendId: req.user.id,
            })
            res.status(200).send(result)
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })

    app.delete('/friends/requests/others/:id', async (req: any, res, next) => {
        //DECLINE USER (FROM OTHER TO USER) REQUEST
        try {
            if (req.user === undefined) new Error("User not logged in");
            const result = await declineFriendRequest({ userId: req.params.id, selfId: req.user.id })
            res.status(200).send(result)
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })

    app.delete('/friends/:id', async (req: any, res, next) => {
        //REMOVE FRIENDSHIP
        try {
            if (req.user === undefined) new Error("User not logged in");
            const result = await unfriendUser({ userId: req.params.id, selfId: req.user.id });
            socket.to(req.params.id).emit("removeFriendship", {
                friendId: req.user.id,
            })
            res.status(200).json(result);
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })
}
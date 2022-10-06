import { prisma } from "../utils/prisma";
import {
    findUserByString,
    getSelfInfo,
    getPublicInfo,
    getUserNameById,
} from "../controllers/user.controller";
import express from "express";
import { Prisma } from "@prisma/client";

module.exports = function (app: express.Application) {
    /*                                                         GET                                                                        */
    app.get('/users/self', async (req: any, res, next) => {
        //GET LOGGED USER DATA
        try {
            if (req.user === undefined) new Error("User not logged in");
            const user = await getSelfInfo({ selfId: req.user.id })
            res.status(200).json(user)
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })

    app.get('/users/:userId/publicInfo', async (req: any, res, next) => {
        try {
            if (req.user === undefined) new Error("User not logged in");
            const user = await getPublicInfo({ userId: req.params.userId, selfId: req.user.id });
            res.status(200).json(user)
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })

    app.get('/users/:userId', async (req: any, res, next) => {
        try {
            if (req.user === undefined) new Error("User not logged in");
            const result = await getUserNameById({ userId: req.params.userId })
            res.status(200).json(result);
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })


    /*                                                         POST                                                                        */

    app.post('/users', async (req: any, res, next) => {
        try {
            if (!req.user) return [];
            const data = await findUserByString({ username: req.body.username, userID: req.user.id });
            res.status(200).json(data)
        } catch {
            (err: any) => {
                res.status(500).json(err);
            }
        }
    })
}

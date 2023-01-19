import {
    findUserByString,
    getSelfInfo,
    getPublicInfo,
    getUserNameById,
} from "../controllers/user.controller";
import express from "express";
import multer from "multer";
import jimp from "jimp";

const storage = multer.memoryStorage();
const upload = multer({ storage });

import { readImg, uploadImg } from "../utils/awsUtils";
import { findUser, updateUser } from "../utils/userUitls";

module.exports = function (app: express.Application) {
    /*                                                         GET                                                                        */
    app.get('/users/init', async (req: any, res, next) => {
        //GET LOGGED USER DATA
        try {
            if (req.user === undefined) new Error("User not logged in");
            const user = await getSelfInfo({ selfId: req.user.id });
            console.log(user.id);
            res.status(200).json(user)
        } catch {
            (err: any) => {
                console.log(err);
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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
                res.status(500).json(err);
            }
        }
    })
}
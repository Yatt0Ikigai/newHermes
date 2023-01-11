import express from 'express'

import { createPost } from "../utils/post.utils";
import { updateUser } from "../utils/userUitls";

declare global {
    namespace Express {
        interface User {
            id: string;
        }
    }
}


module.exports = function (app: express.Application) {
    app.post('/post', async (req, res, next) => {
        try {
            if (req.user == null) throw new Error("User not logged in");
            const post = await createPost({
                authorId: req.user.id, content: {
                    attachments: [],
                    text: req.body.text
                }
            });
        } catch {
            (err) => {

            }
        }


    })
}
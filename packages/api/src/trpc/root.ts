import { initTRPC } from '@trpc/server';
import trpcExpress from "@trpc/server/adapters/express";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { inferAsyncReturnType } from "@trpc/server";


import { verifyJWT, generateAccessToken } from "../utils/jwt";
import { redisClient } from './redisServer';
import { access_token_secret, refresh_token_secret } from '../config/default';


import messagesRouter from "./routers/messages";
import chatsRouter from "./routers/chats";
import userRouter from './routers/users';
import authRouter from './routers/auth';
import actionRouter from './routers/actions';
import friendsRouter from './routers/friends';


export const createContext = async ({ req, res, }: trpcExpress.CreateExpressContextOptions | CreateNextContextOptions) => {
    const notAuthenticated = { req, res, user: null };
    if (!req.cookies.access_token) return notAuthenticated;

    // Validate Access Token
    const { payload: decodedAccess, err: errAccess, expired: expiredAccess } = verifyJWT(
        req.cookies.access_token,
        access_token_secret
    );
    if (decodedAccess) return { req, res, user: decodedAccess };
    if(expiredAccess){
        const refresh_token = req.cookies?.refresh_token as string;

        if (!refresh_token) {
            res.cookie('logged_in', false, { httpOnly: false });
            return notAuthenticated;
        }
    
        const { payload: decodedRefresh, err: errRefresh, expired: expiredRefresh } = verifyJWT(refresh_token, refresh_token_secret);
        if (!decodedRefresh) {
            res.cookie('logged_in', false, { httpOnly: false });
            return notAuthenticated
        }

        if (decodedRefresh && await redisClient.exists(decodedRefresh.id) && await redisClient.sIsMember(decodedRefresh.id, refresh_token)) {
            const newToken = generateAccessToken({ id: decodedRefresh.id, role: decodedRefresh.role });    
            res.cookie('access_token', newToken, { httpOnly: true });
            res.cookie('logged_in', true, { httpOnly: false });
            return {
                req,
                res,
                user: decodedRefresh
            }
        }
    }
    if (!decodedAccess) return notAuthenticated;
    if (errAccess && !expiredAccess) return notAuthenticated;



    res.cookie('logged_in', false, { httpOnly: false });
    return notAuthenticated;
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.create();


const appRouter = t.router({
    messages: messagesRouter,
    chats: chatsRouter,
    users: userRouter,
    auth: authRouter,
    action: actionRouter,
    friends: friendsRouter,
})



export default appRouter
export type AppRouter = typeof appRouter;
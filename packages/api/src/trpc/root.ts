import { initTRPC } from '@trpc/server';

import trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";

import messagesRouter from "./routers/messages";
import chatsRouter from "./routers/chats";
import userRouter from './routers/users';

declare global {
    namespace Express {
        interface User {
            id: string;
            email: string;
            password: string;
        }
    }
}

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    return {
        req,
        res,
    }
}
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.create();


const appRouter = t.router({
    messages: messagesRouter,
    chats: chatsRouter,
    users: userRouter,
})


export default appRouter
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
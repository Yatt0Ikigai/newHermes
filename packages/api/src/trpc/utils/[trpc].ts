import { Context } from '../root';
import { initTRPC, TRPCError } from '@trpc/server';

export const t = initTRPC.context<Context>().create()

export const Authed = t.middleware(async ({ ctx, next }) => {
    if (ctx.user) return next();
    else {
        console.log('!authed');
        ctx.res.cookie('logged_in', 'false');
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }
})

export const unAuthed = t.middleware(async ({ ctx, next }) => {
    if (!ctx.user) return next();
    throw new TRPCError({ code: "BAD_REQUEST" })
})

export const procedure = t.procedure;
export const authedProcedure = t.procedure.use(Authed);
export const unauthedProcedure = t.procedure.use(unAuthed);



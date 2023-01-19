import { Context } from '../root';
import { initTRPC, TRPCError } from '@trpc/server';

export const t = initTRPC.context<Context>().create()

export const isAuthed = t.middleware(async ({ ctx, next }) => {
    if (!ctx.req.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
    return next();
})

export const authedProcedure = t.procedure.use(isAuthed);
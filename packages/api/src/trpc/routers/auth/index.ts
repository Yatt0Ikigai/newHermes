import { z } from 'zod';
import { t, authedProcedure, unauthedProcedure } from "../../utils/[trpc]";
import { loginHandler, logoutHandler, registerHandler } from "./controller";




const authRouter = t.router({
  logOut:
    authedProcedure
      .mutation(async ({ ctx }) => {
        const data = await logoutHandler({ctx});
        return data;
      }),
  login:
    unauthedProcedure
      .input(z.object({
        email: z.string(),
        password: z.string()
      }))
      .mutation(async ({ ctx, input }) => {
        return await loginHandler({ input, ctx });
      }),
  register:
    unauthedProcedure
      .input(
        z.object({
          email: z.string(),
          password: z.string(),
          firstName: z.string(),
          lastName: z.string()
        })
      ).mutation(async ({ ctx, input }) => {
        const user = await registerHandler({
          input: {
            email: input.email,
            password: input.password,
            firstName: input.firstName,
            lastName: input.lastName,
          }
        });
        return {
          status: "success",
          data: user
        }
      })
})


export default authRouter;
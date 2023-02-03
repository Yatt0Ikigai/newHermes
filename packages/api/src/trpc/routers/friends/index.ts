import { z } from 'zod';

import { getFriendList, getFriendRequests } from "./controllers";
import { t, authedProcedure } from "../../utils/[trpc]";

const messagesRoute = t.router({
    fetchFriendList:
        authedProcedure
            .query(async ({ ctx }) => {
                return {
                    status: "success",
                    data: {
                        friendList: await getFriendList({ userId: ctx.req.user?.id as string })
                    }
                }
            }),
    fetchFriendRequests:
        authedProcedure
            .query(async ({ ctx }) => {
                return {
                    status: "success",
                    data: await getFriendRequests({ userId: ctx.req.user?.id as string })
                }
            })
});


export default messagesRoute;
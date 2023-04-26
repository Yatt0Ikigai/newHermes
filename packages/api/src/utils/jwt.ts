import jwt, { SignOptions } from 'jsonwebtoken';
import { access_token_secret, refresh_token_secret } from '../config/default';
import { TRPCError } from '@trpc/server';
import trpcExpress from "@trpc/server/adapters/express";
import { redisClient } from '../trpc/redisServer';
import { Context } from "../trpc/root";
import { IReqUser } from "../index";


export const generateAccessToken = (user: IReqUser) => {
  return jwt.sign(user, access_token_secret, { expiresIn: '10s' });
}

export const verifyJWT = (token: string, key: string) => {
  try {
    const decoded = jwt.verify(token, key);
    return { payload: decoded as { id: string, role: string }, expired: false, err: null };
  } catch (err: any) {
    return { payload: null, expired: true, err: err.message.includes('jwt expired') };
  }
}

export const signTokens = (user: IReqUser) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, refresh_token_secret)

  return { accessToken, refreshToken }
}

export const authenticateToken = async ({ ctx }: { ctx: Context }) => {
  const { payload: data, err, expired } = await verifyJWT(ctx.req.cookies.access_token, access_token_secret);
  if (data) {
    ctx.req.user = data;
    return true;
  } if (err) return false
 // return refreshAccessToken({ ctx });
}



import dotenv from "dotenv";

dotenv.config();

export const access_token_secret = process.env.ACCESS_TOKEN_KEY as string
export const refresh_token_secret = process.env.REFRESH_TOKEN_KEY as string 
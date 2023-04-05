import { createClient } from "redis";

export const redisClient =  createClient();

redisClient.connect();

redisClient.on("ready", () => {
    console.log('✅ REDIS is running on port 6379:6379');
})
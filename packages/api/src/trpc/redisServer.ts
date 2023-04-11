import { createClient } from "redis";

export const redisClient =  createClient({
    socket: {
        connectTimeout: 3000,
        reconnectStrategy() {
            console.timeLog('reconnectStrategy', 'reconnectStrategy')
            return 3000
        }
    }
});

redisClient.connect();

redisClient.on("ready", () => {
    console.log('✅ REDIS is running on port 6379');
})
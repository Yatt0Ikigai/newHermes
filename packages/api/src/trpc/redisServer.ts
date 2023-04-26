import { createClient } from "redis";

export const redisClient =  createClient({
    socket: {
        connectTimeout: 5000,
        reconnectStrategy() {
            console.log('reconnectStrategy', new Date().toJSON());
            return 5000;
        }
    }
});

redisClient.connect()

redisClient.on("ready", () => {
    console.log('✅ REDIS is running on port 6379');
})
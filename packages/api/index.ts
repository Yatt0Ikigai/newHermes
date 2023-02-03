import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import session from "express-session";
import http from "http";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import * as trpcExpress from "@trpc/server/adapters/express";
import appRouter from "./src/trpc/root";
import { createContext } from "./src/trpc/root";


import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io"


import { verifyJWT } from "./src/utils/jwt";
import { refresh_token_secret } from "./src/config/default";
import { redisClient } from "./src/trpc/redisServer";

dotenv.config();
const port = 8080;
const socketPort = 9000;

const app = express();

app.use(cors({
  origin: [true, "http://localhost:3000"],
  credentials: true,
  methods: ['POST', "GET", "DELETE"]
}));

/*
app.use(session({
  secret: process.env.SECRET as string,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000
  }
}));
*/

app.use(cookieParser(process.env.SECRET as string))

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
)


app.get("/", (req, res) => {
  res.send("Hello from api");
});

app.listen(port, () => {
  console.log(`✅ API listening at http://localhost:${port}`);
})

let sockets = new HTTPServer(app);

export const io = new Server(sockets, {
  cors: {
    origin: [true, "http://localhost:3000"],
    credentials: true,
  },
})

io.on("connect", (socket: Socket) => {
  console.log("Connected " + socket.id);

  socket.on('handshake', async () => {
    console.log('Handshake received from ' + socket.id);
    const cookies = socket.request.headers.cookie?.split('; ');
    if (!cookies) return;
    cookies?.map(async (el) => {
      if (el.includes("refresh_token=")) {
        const token = el.split("=")[1];
        const { payload, err, expired } = verifyJWT(token, refresh_token_secret);
        if (err || expired || !payload) return;
        if (await redisClient.exists(payload.id) && await redisClient.sIsMember(payload.id, token)) {
          socket.join(payload.id);
          console.log(socket.id + ' joined ' + payload.id);
        }
        else return;
      }
    })
  })

  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit(`Connected to ${userData.id}`)
  })

  socket.on('disconnect', () => {
    console.log('Disconnect received from ' + socket.id)
  })
})

export const emitEvent = ({ senderID, roomID, receiverID, data, event }: { senderID?: string, roomID?: string, receiverID?: string, data: any, event: socketEvents }) => {
  if (roomID) io.sockets.to(roomID).emit(event, data);
  if (senderID) io.sockets.to(senderID).emit(event, data);
}

sockets.listen(socketPort, () => {
  console.log(`✅ Sockets listening at http://localhost:${port}`);
});


type socketEvents = "newMessage";

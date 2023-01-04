import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";

const app = express();
const port = 8080;

dotenv.config();

let serv = new HTTPServer(app);
serv.listen(9000);
const io = new Server(serv, {
  cors: {
    origin: "*",
  }
})

io.on("connect", (socket: Socket) => {
  console.log("Connected " + socket.id);
  
  socket.on('handshake', () => {
    console.log('Handshake received from ' + socket.id)
  })

  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit(`Connected to ${userData.id}`)
  })

  socket.on('disconnect', () => {
    console.log('Disconnect received from ' + socket.id)
  })
})

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
  origin: [true, "http://localhost:3000"],
  credentials: true,
  methods: ['POST', "GET", "DELETE"]
}));
app.use(session({
  secret: process.env.SECRET as string,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000
  }
}));
app.use(cookieParser(process.env.SECRET as string))
app.use(passport.initialize());
app.use(passport.session());


require("./src/middleware/passport")(passport);
//Routes
require("./src/routes/auth.route")(app);
require("./src/routes/user.route")(app);
require("./src/routes/friends.route")(app,io);
require("./src/routes/chats.route")(app,io);
//Routes

app.get("/", (req, res) => {
  res.send("Hello from api");
});

app.listen(port, () => {
  console.log(`api listening at http://localhost:${port}`);
})





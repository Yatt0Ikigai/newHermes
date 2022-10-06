import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

const app = express();
const port = 8080;

dotenv.config();

import { createUserHandler } from "./src/controllers/auth.controller";

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
require("./src/routes/friends.route")(app);
//Routes

app.get("/", (req, res) => {
  res.send("Hello from api");
});

app.listen(port, () => {
  console.log(`api listening at http://localhost:${port}`);
})

app.get('getPersInfo')
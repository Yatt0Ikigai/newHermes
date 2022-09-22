import passport from "passport";
import express from "express";

import { createUserHandler } from "../controllers/auth.controller";
module.exports = function(app:express.Application){
    app.post('/login', (req,res,next) => {
        passport.authenticate('local', (err,user,info) => {
          
          if(err)return next(err);
          if(!user){
            res.status(401);
            res.end("WRONG EMAIL OR PASSWORD");
            return;
          }
          req.logIn(user, (err) => {
            if(err)  next(err);
            if(req.user) res.send("SUCCESFUL LOGGED");
            else res.send("WRONG CREDENTIALS NOT LOGGED");
          });
        })(req,res,next)})
        
      
      app.post('/register', async (req, res) => {
        const user = await createUserHandler({
          email: req.body?.email,
          password: req.body?.password,
          firstName: req.body?.firstName,
          lastName: req.body?.lastName,
        })
        if(user) res.send("SUCCESFULY REGISTERED")
        else res.send("CANT CREATE USER")
      })
      
      app.get('/logout', (req, res) => {
        req.logOut((err) => {
          console.log(err)
        });
        res.send("good")
      })
      
      app.get('/getUser', (req, res, done) => {
        res.send(req.user);
      })
      
}

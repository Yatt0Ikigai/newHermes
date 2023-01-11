import passport from "passport";
import express from "express";

import { findUser } from "../utils/userUitls";
import { createUserHandler } from "../controllers/auth.controller";


module.exports = function (app: express.Application) {
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        res.status(290).json({
          message: "Wrong email or password",
        })
        return;
      }
      req.logIn(user, async (err) => {
        if (err) next(err);
        if (req.user) {
          res.status(200).json({
            message: "User logged in",
          })
          return;
        }
        else res.status(290).json({
          message: "Wrong email or password",
        })
      });
    })(req, res, next)
  })


  app.post('/register', async (req, res) => {
    try {
      const user = await createUserHandler({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      if (user) {
        req.logIn(user, async (err) => {
          res.status(201).json({
            message: "User created",
          });
        })
      }
      else res.status(400).json({
        message: "Cant create user"
      })
    } catch {
      (err: any) => {
        console.log(err);
        res.status(500).json(err);
      }
    }
  })


  app.get('/logout', (req, res) => {
    req.logOut((err) => {
      console.log(err)
    });
    res.status(200).json({
      message: "USER LOGGED OUT",
    })
  })


  app.get('/is-logged', async (req: any, res, done) => {
    res.status(200).send( req.user ? true : false);
  })

}

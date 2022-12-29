import passport from "passport";
import passportLocal from "passport-local";
import { prisma } from "../utils/prisma";
import { validPassword } from "../utils/passwordUtil";



module.exports = function(passport:any){
  passport.use(new passportLocal.Strategy(
    async function verify(username, password, done) {
      prisma.users.findFirst({
        where: {
          email: username,
        }
      }).then(async (user: any) => {
        if (!user) return done(null, false);
        if (await validPassword(password, user.password)) return done(null, user);
        return done(null, false);
      }).catch((err: any) => {
        return done(err)
      })
    }));


  passport.serializeUser((user: any, cb: any) => {
    if(user) cb(null, {
      id: user.id,
      email: user.email,
      password: user.password,
    });
    else cb(null,null);
  })

  passport.deserializeUser((userInfo: any, done: any) => {
    prisma.users.findFirst({
      where: {
        id:userInfo.id,
        password: userInfo.password,
      }
    }).then((user: any) => {
      done(null, userInfo)
    }).catch((err: any) => {
      done(err)
    })
  })
}


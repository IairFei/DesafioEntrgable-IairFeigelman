import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
//Inicializo las diferentes estrategias que vaya a configurar
const initializePassport = () => {
  passport.use(
    //Nombre de estrategia
    "register",
    new LocalStrategy(
      //Permitimos que tome el req y le pasamos que variable va a ser utilizada para el username
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age } = req.body;
          const user = await userDao.getByEmail(username);
          if (user) {
            return done(null, false, { message: "El usuario ya existe" });
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };

          const createUser = await userDao.create(newUser);
          return done(null, createUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
//Utilizamos el login hehco de forma local
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userDao.getByEmail(username);
          if (!user || !isValidPassword(user, password)) {
            return done(null, false, { message: "Email o password invalidos" });
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //Utilizamos google auth
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: "",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          
          const {name, emails} = profile;

          // console.log(profile);

          const user ={
            first_name: name.givenName,
            last_name: name.familyName,
            email: emails[0].value
          }

          const existUser = await userDao.getByEmail(emails[0].value);

          if (existUser){
            return cb(null, existUser)
          }

          const newUser = await userDao.create(user)
          cb(null, newUser);

        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  //Convierte el objeto de user en un id unico
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  //Recupera el objeto del user a partir del id unico realizado en serializeUser

  passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    done(null, user);
  });
};

export default initializePassport;

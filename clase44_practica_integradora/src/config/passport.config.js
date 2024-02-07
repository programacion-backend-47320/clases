import passport from "passport";
import passportJWT from 'passport-jwt'
import local from 'passport-local'
import config from "./config.js";
import { UserService } from "../services/index.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) => {
        const { email, name, role} = req.body
        console.log({ email, name, role})
        try {
            const user = await UserService.getByEmail(email)
            console.log({user})
            if(user) {
                console.log('User alreadu exits')
                return done(null, false)
            }

            const newUser = { email, name, password, role}
            const result = await UserService.register(newUser)

            return done(null, result)
        } catch (error) {
            return done('[LOCAL] error from register user')
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        const user = await UserService.getByEmail(username)
        if(!user) {
            console.log('User doesnt exist')
            return done(null, false)
        }

        if(user.password !== password) return done(null, false)

        return done(null, user)
    }))

    passport.use('jwt', new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtPrivateKey
    }, (jwt_payload, done) => {
        return done(null, jwt_payload.user)
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {

        const user = await UserService.getById(id)
        done(null, user)
    })
}

export default initializePassport
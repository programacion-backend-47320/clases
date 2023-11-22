import passport from "passport";
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import UserModel from "../models/users.model.js";
import GithubStrategy from 'passport-github2'
import { createHash, generateToken, isValidPassword } from "../utils.js";

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy

const extractCookie = req => {
    return (req && req.cookies) ? req.cookies['cookieJWT'] : null
}

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { name, email } = req.body

        try {
            const user = await UserModel.findOne({ email })
            if (user) {
                console.log('User already exists')
                return done(null, false)
            }

            const newUser = {
                name,
                email,
                password: createHash(password),
                role: 'user',
                social: 'local'
            }
            const result = await UserModel.create(newUser)
            return done(null, result)

        } catch (error) {
            return done('[LOCAL] Error to register ' + error)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username })
            if (!user) {
                console.log('User doesnt exist')
                return done(null, false)
            }

            if (!isValidPassword(user, password)) return done(null, false)

            const token = generateToken(user)
            user.token = token

            return done(null, user)
        } catch (error) {
            return done('[LOCAL] error to login ' + error)
        }
    }))

    passport.use('github', new GithubStrategy(
        {
            clientID: 'Iv1.0e52272e01d5e745',
            clientSecret: '893424e8a2f128938832d5eb179e04941948a7d9',
            callbackURL: 'http://localhost:8080/githubcallback'
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)

            try {
                const email = profile._json.email
                const user = await UserModel.findOne({ email })
                if (!user) {
                    console.log('User doesnt exist. To register')
                    
                    const newUser = {
                        name: profile._json.name,
                        email,
                        password: '',
                        role: 'user',
                        social: 'github'
                    }
                    const result = await UserModel.create(newUser)
                }

                const token = generateToken(user)
                user.token = token

                return done(null, user)

            } catch (error) {
                console.log(error)
                return done('[GITHUB] ' + error)
            }
        }
    ))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: 'secretForJWT',
    }, (jwt_payload, done) => {
        console.log({ jwt_payload })
        done(null, jwt_payload.user)
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport
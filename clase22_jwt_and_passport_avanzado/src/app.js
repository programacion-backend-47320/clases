import express from 'express'
import jwtRouter from './router/jwt.router.js'
import cookieParser from 'cookie-parser'
import initializePassport from './config/passport.config.js'
import passport from 'passport'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('coderCookieForMyToken'))

initializePassport()
app.use(passport.initialize())

app.get('/', (req, res) => res.send('ok'))
app.use('/jwt', jwtRouter)

app.listen(8080, () => console.log("Listening..."))
import express from 'express'
import config from './config/config.js'
import pizzaRouter from './routes/pizza.router.js'
import sessionRouter from './routes/session.router.js'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import session from 'express-session'

const app = express()
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())

app.get('/', (req, res) => res.send('Pizza e - commerce'))
app.use('/api/pizza', pizzaRouter)
app.use('/session', sessionRouter)

app.listen(config.port, () => console.log('Running 🏃 ...'))
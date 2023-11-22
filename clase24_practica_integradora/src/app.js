import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import __dirname from './utils.js'

import initializePassport from './config/passport.config.js'
import sessionRouter from './routes/session.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser())

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Passport 
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', sessionRouter)

app.get('/health', (req, res) => res.send('ok'))

mongoose.connect('mongodb://admin:admin@127.0.0.1:27017', { dbName: 'clase24_47'})
    .then(() => {
        console.log('DB connected 👌 ')
        app.listen(8080, () => console.log(`Listening  🏃...`))
    })
    .catch(e => console.error(e))
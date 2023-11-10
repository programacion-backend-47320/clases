import express from 'express'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import passport from 'passport'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import initializePassport from './config/passport.config.js'
import __dirname from './utils.js'

const app = express()
const mongoURL = 'mongodb://admin:admin@127.0.0.1:27017'
const mongoDBName = 'clase21_47'

app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoURL,
        dbName: mongoDBName,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 15
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)


mongoose.connect(mongoURL, { dbName: mongoDBName })
    .then(() => {
        console.log('DB connected ✊')
        app.listen(8080, () => console.log(`Running 🏃....`))
    })
    .catch(e => {
        console.error('Error to connecting ', e)
    })
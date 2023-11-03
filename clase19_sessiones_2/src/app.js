import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import __dirname from './utils.js'

import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/session.router.js'

const app = express()
const mongoUrl = 'mongodb://admin:admin@127.0.0.1:27017'
const mongoDB = 'my_db_47'

// Configuracion Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Configuracion para usar JSON en los POST
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configuracion Sessiones
app.use(session({
    store: MongoStore.create({
        mongoUrl,
        dbName: mongoDB,
        ttl: 100
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use('/', viewsRouter)
app.use('/api/session', sessionRouter)
app.get('/health', (req, res) => res.send('OK'))

mongoose.connect(mongoUrl, {dbName: mongoDB})
    .then(() => {
        console.log('DB connected')
        app.listen(8080, () => console.log(`Listening 🏃 ...`))
    })
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()
const mongoUrl = `mongodb://admin:admin@127.0.0.1:27017`

app.use(session({
    store: MongoStore.create({
        mongoUrl,
        dbName: 'sessions_47',
        ttl: 100
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => res.send('OK 👌'))
app.get('/login', (req, res) => {
    if(req.session.user) return res.send('Already logged!')

    const { username } = req.query
    if(!username) return res.send('Need an username')

    req.session.user = { username }
    return res.send('Login Success')
})

function auth(req, res, next) {
    return req.session?.user ? next() : res.status(401).send('Auth error')
}

app.get('/private', auth, (req, res) => res.send(`Private Page`))

app.listen(8080)
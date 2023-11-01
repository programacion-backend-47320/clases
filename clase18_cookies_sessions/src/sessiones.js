import express from 'express'
import session from 'express-session'

const app = express()
app.use(session({
    secret: 'secret',
    resave: true, // Mantiene la session activa
    saveUninitialized: true // Guarda cualquier cosa, asi sea vacio
}))

app.get('/', (req, res) => res.send('ok'))

app.get('/session', (req, res) => {
    if(req.session.counter) {
        req.session.counter++
        return res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
    }

    req.session.counter = 1
    res.send('Welcome')
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send({status: 'Logout error', err })

        return res.send('Logout ok')
    })
})


const DB = [
    { username: 'enzo', password: 'ferrari', rol: 'admin'}
]

function authentication(req, res, next) {
    if(req.session?.user) return next()

    return res.status(401).send('error authorization 🛑')
}
app.get('/private', authentication, (req, res) => {
    res.send(`<h2>Pagina privada. Datos del user: </h2> <hr> ${JSON.stringify(req.session.user)}`)
})

app.get('/login', (req, res) => {
    const { username, password } = req.query

    const user = DB.find(u => u.username === username && u.password === password)
    if(!user) return res.status(400).send('Invalid credentials')

    req.session.user = user

    res.send('Login Success!')
})


app.listen(8080)
import express from 'express'
import jwtRouter from './router/jwt.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('ok'))
app.use('/jwt', jwtRouter)

app.listen(8080, () => console.log("Listening..."))
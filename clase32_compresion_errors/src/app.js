import express from 'express'
import UserRouter from './routes/user.route.js'
import errorHandler from './middlewares/error.js'

const app = express()

app.use(express.json())

app.use('/api/user', UserRouter)
app.use(errorHandler)

app.listen(8080)
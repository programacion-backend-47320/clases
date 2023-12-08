import express from 'express'
import config from './config/config.js'

import userRouter from './routes/users.router.js'
import storeRouter from './routes/stores.route.js'
import orderRouter from  './routes/orders.route.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', userRouter)
app.use('/api/stores', storeRouter)
app.use('/api/orders', orderRouter)

app.listen(config.port, () => console.log(`Listening 🛵...`))
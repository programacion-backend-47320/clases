import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'

import __dirname from './utils.js'

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

mongoose.connect('mongodb://admin:admin@127.0.0.1:27017', {
    dbName: 'clase47_12'
}).then(() => {
    console.log('DB connected 👌 ')
    app.listen(8080, () => console.log('Running 🏃 ...'))
})

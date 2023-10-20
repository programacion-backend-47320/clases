import express from 'express'
import pokeRouter from './router/poke.router.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import __dirname from './utils.js'

// Inicializamos las variables
const app = express()
const mongoURL = 'mongodb://admin:admin@127.0.0.1:27017'
const mongoDBName = 'clase_47320_15'

// Para traer la info de POST como JSON
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Congiurar el motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Carpeta publica
app.use(express.static( __dirname + '/public' ))

// Configuracion de rutas
app.get('/health', (req, res) => res.send('ok'))
app.use('/pokemon', pokeRouter)

// Conectamos Mongo
mongoose.connect(mongoURL, { dbName: mongoDBName})
    .then(() => {
        console.log('DB connected! 😎 ')
        // Server RUN !!
        app.listen(8080, () => console.log(`Listening 🏃...`)) 
    })
    .catch(error => {
        console.error('Error connect DB 🚑 ')
    })
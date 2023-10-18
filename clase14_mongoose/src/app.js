import express from 'express'
import mongoose from 'mongoose'
import userModel from './models/users.model.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.json({ status: 'OK' }))

// Listar todos los usuarios
app.get('/api/users', async (req, res) => {
    const users = await userModel.find()

    res.json({ status: 'success', payload: users })
})

// Devuelve un solo usuario
app.get('/api/users/:uid', async (req, res) => {
    const userId = req.params.uid

    const user = await userModel.findOne({ _id: userId })
    res.json({ status: 'success', payload: user })
})

// Crear usuario
app.post('/api/users', async (req, res) => {
    const data = req.body
    const result = await userModel.create(data)

    res.send({ status: 'success', payload: result })
})

// Actualizar usuario
app.put('/api/users/:uid', async (req, res) => {
    const userId = req.params.uid
    const dataToUpdate = req.body

    const result = await userModel.updateOne({ _id: userId }, dataToUpdate)
    res.send({ status: 'success', payload: result })
})

// Borrar un usuario
app.delete('/api/users/:uid', async (req, res) => {
    const userId = req.params.uid

    const result = await userModel.deleteOne({ _id: userId })
    res.send({ status: 'success', payload: result })
})


const url = 'mongodb+srv://r2:NYHvpWtHcu.3f%40h@clusterr2.gj8v5sk.mongodb.net/'

mongoose.connect(url, { dbName: 'myDB' })
    .then(() => {
        console.log('DB connected 👊 !!')
        app.listen(8080, () => console.log('Running 🏃 ...'))
    })
    .catch(e => {
        console.error('Error connecting to DB 😓 ')
    })


import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.post('/', (req, res) => {
    res.json({status: 'ok', result: 'Saludos para mi amigo Luis Eduardo 👋'})
})

JSON.parse('{"field": 2}')

app.listen(8080)
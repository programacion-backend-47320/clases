import express from 'express'
import dotenv from 'dotenv'
import { fork } from 'child_process'

dotenv.config()
const PORT = process.env.PORT

console.log('PID master: ', process.pid)

const app = express()

app.get('/', (req, res) => res.send('ok'))

app.get('/suma', (req, res) => {
    const child = fork('./src/operacionCompleja.js')
    child.send('Run !!')

    child.on('message', result => {
        res.send(`El resulta de la operacion es ${result}`)
    })
    
})

app.listen(PORT, () => console.log(`Running (${PORT})🏃 ...`))
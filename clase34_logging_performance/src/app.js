import express from 'express'
import { addLogger } from './utils/logger.js'

const app = express()
app.use(addLogger)

app.get('/test', (req, res) => {
    
    req.logger.debug('DEBYG')
    req.logger.info('R2 Rocks')
    req.logger.warning('WARNING')
    req.logger.error('Errors 🛑')
    req.logger.fatal('FATAL !!! 🛑')
    
    
    const data = req.query.data

    if(!data) {
        req.logger.error('Falta data')
        return res.status(500).send('Falta data')
    }

    res.send('Todo ok')

})

app.get('/', (req, res) => res.send('Logger Testing'))
app.post('/', (req, res) => res.send('Logger Testing by POST'))

app.listen(8080, () => { })
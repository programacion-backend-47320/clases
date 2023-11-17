import express from 'express'

const app = express()

app.param('word', async(req, res, next, word) => {
    if(!word) req.word = null
    else req.params.word = word.toLowerCase()

    next()
})

app.get('/api/dictionary/:word/:language([a-z]+)', (req, res) => {
    const { word, language } = req.params
    res.send({word, language})
})


app.get('/api/dictionary/:word', (req, res) => {
    const { word } = req.params
    res.send({word})
})

app.put('/api/dictionary/:word', (req, res) => {
    const { word } = req.params
    res.send({word})
})

app.post('/api/dictionary/:word', (req, res) => {
    const { word } = req.params
    res.send({word})
})



app.get('*', (req, res) => {
    res.status(404).send('Esta palabra no se encuentra en el dictionary')
})



app.listen(8080, () => console.log(`Listening 🏃 ...`))
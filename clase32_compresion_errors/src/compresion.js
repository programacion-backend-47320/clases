import express from 'express';
import compression from 'express-compression'

const app = express()

app.listen(8080, () => console.log('Running 🏃 ...'))


app.use(compression({
    brotli: { enabled: true, zlib: {} }
}))
app.get('/stringlargo', (req, res) => {
    let string = `Este string es muuuuuyy largo para el request !!`
    for (let i = 0; i < 10e4; i++) {
        string += `<br> Estamos haciendo este string aun mucho mas largo !!!!`
    }

    res.send(string)
})
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser('MyK3yF0rS$gned'))

app.get('/', (req, res) => res.send('ok'))

app.get('/setCookie', (req, res) => {
    //res.cookie('temporal', 'Tempora', {maxAge: 5_000}).send('Cookie seteada')
    res.cookie('oreo', 'Thanos siempre tuvo razon').send('Cookie seteada')
})
app.get('/setCookieSigned', (req, res) => {
    res.cookie('signed', 'This is my value', {signed: true}).send('Set cookie signed')
})

app.get('/getCookie', (req, res) => { res.send(req.cookies) })
app.get('/getCookieSigned', (req, res) => {
    res.send(req.signedCookies)
})
app.get('/rmCookie', (req, res) => { 
    res.clearCookie('oreo').send('Cookie removed')
 })

app.listen(8080)
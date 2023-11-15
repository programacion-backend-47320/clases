import { Router } from 'express'
import { authToken, authorization, generateToken } from '../utils.js'
import passport from 'passport'

const router = Router()

const users = [
    { email: 'ignacio@openai.com', password: 'secret', age: 20, role: 'user' },
    { email: 'ailen@mercadolibre.com', password: '123456', age: 21, role: 'admin' },
]

router.get('/register', (req, res) => {
    const user = req.query

    if (users.find(u => u.email === user.email)) {
        return res.status(400).send({ status: 'error', error: 'User already exits' })
    }

    users.push(user)
    const access_token = generateToken(user)

    res.cookie('cookieForToken', access_token, { maxAge: 60 * 60 * 1000 }).send({ status: 'success', access_token })
})

router.get('/login', (req, res) => {
    const { email, password } = req.query

    const user = users.find(u => u.email === email && u.password === password)
    if (!user) return res.status(400).send({ status: 'error', error: 'invalid credenntial' })

    const access_token = generateToken(user)

    res.cookie('cookieForToken', access_token, { maxAge: 60 * 60 * 1000 }).send({ status: 'success', access_token })
})

router.get(
    '/private',
    passport.authenticate('jwt', { session: false }),
    authorization('user'),
    (req, res) => {
        res.send({ status: 'success', payload: req.user })
    }
)

router.get(
    '/admin',
    passport.authenticate('jwt', { session: false }),
    authorization('admin'),
    (req, res) => {
        res.send({ status: 'success', payload: req.user })
    }
)


export default router
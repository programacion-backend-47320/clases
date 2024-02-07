import { Router } from 'express'
import passport from 'passport'
import { errorUser, login, privateUser, register } from '../controllers/sessions.controller.js'

const router = Router()

router.post(
    '/register',
    passport.authenticate('register', {
        failureRedirect: '/session/error'
    }),
    register
)

router.post(
    '/login',
    passport.authenticate('login', {
        failureRedirect: '/session/error'
    }),
    login
)

router.get(
    '/private',
    passport.authenticate('jwt'),
    privateUser
)

router.get('/error', errorUser)


export default router
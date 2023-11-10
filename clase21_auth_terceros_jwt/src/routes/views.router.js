import { Router } from "express";
import passport from 'passport'

const router = Router()

router.get('/', (req, res) => {
    res.render('home', {})
})

router.get('/logins', (req, res) => {
    res.render('logins', {})
})

router.get(
    '/login-github',
    passport.authenticate('github', {scope: ['user:email']}),
    async (req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/'}),
    async(req, res) => {
        console.log('Callback: ', req.user)
        req.session.user = req.user

        console.log(req.session)
        res.redirect('/')
    }
)

function auth(req, res, next) {
    if(req.session?.user) next()

    return res.status(401).send('Auth error')
}

function authAmdmin(req, res, next) {
    if(req.session?.user && req.session.user.rol === 'admin') next()

    return res.status(401).send('Auth error')
}

router.get('/private', auth, (req, res) => {
    res.json(req.session.user)
})

export default router
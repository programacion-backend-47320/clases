import { Router } from 'express'
import passport from 'passport'

const router = Router()

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

export default router
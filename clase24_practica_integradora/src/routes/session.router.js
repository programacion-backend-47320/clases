import { Router } from "express";
import passport from "passport";
import UserModel from '../models/users.model.js'

const router = Router();

// HOME
router.get('/',
    async (req, res) => {
        const users = await UserModel.find().lean().exec()
        const session = req?.user ?? '' ? true : false

        res.render('index', { users, session })
    })

// GITHUB
router.get(
    '/githublogin',
    passport.authenticate('github', { scope: ['user:email'] }),
    (req, res) => { }
)

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/error' }),
    (req, res) => {

        if (!req.user) {
            return res.status(400).send('Invalid github')
        }

        res.cookie('cookieJWT', req.user.token).redirect('/')
    }
)

// LOCAL
router.get('/locallogin', (req, res) => {
    res.render('login', {})
})

router.get('/localregister', (req, res) => {
    res.render('register', {})
})

router.get('/error', (req, res) => {
    res.render('error', { error: 'Something is wrong' })
})

router.post(
    '/locallogin',
    passport.authenticate('login', { failureRedirect: '/error' }),
    (req, res) => {
        if (!req.user) {
            return res.status(400).send('Invalid credentials')
        }

        res.cookie('cookieJWT', req.user.token).redirect('/')
    }
)

router.post(
    '/localregister',
    passport.authenticate('register', { failureRedirect: '/error' }),
    (req, res) => {
        res.redirect('/locallogin')
    }
)

// Private
router.get(
    '/private',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { user } = req
        console.log({ user })
        res.render('private', { user })
    }
)



export default router
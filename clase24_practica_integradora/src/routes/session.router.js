import { Router } from "express";
import UserModel from '../models/users.model.js'

const router = Router();

// HOME
router.get('/', async (req, res) => {
    const users = await UserModel.find()

    res.render('index', { users })
})

// GITHUB
router.get('/githublogin', (req, res) => {
    res.send('Loggin in from github...')
})

router.get('/githubcallback', (req, res) => {
    res.send('Regresando de github')
})

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

router.post('/locallogin', (req, res) => {
    res.send('Loggin in from local...')
})

router.post('/localregister', (req, res) => {
    res.send('Registering...')
})

// Private
router.get('/private', (req, res) => {
    const user = { 
        name: 'R2',
        email: 'r2@openai.com', 
        social: 'none',
        role: "none"

    }
    res.render('private', { user })
})



export default router
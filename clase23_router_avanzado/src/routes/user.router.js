import R2_Router from "./router.js";
import jwt from 'jsonwebtoken'

export default class UsersRouter extends R2_Router {

    init() {

        this.get('/', ['PUBLIC'], (req, res) => {
            res.sendSuccess('Holaaa')
        })

        this.post('/login', ['PUBLIC'], (req, res) => {
            const role = req.query?.role ?? 'USER'
            const email = req.query.email

            const user = { email, role }

            const token = jwt.sign(user, 'secret')
            res.sendSuccess({ token })
        })

        this.get('/admin', ['ADMIN'], (req, res) => {
            res.sendSuccess(req.user)
        })

        this.post('/:word', ['USER'], (req, res) => {
            const { word } = req.params
            res.sendSuccess({ word, user: req.user })
        })




    }
}


// ADMIN
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlcmdpb0Bnb29nbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMTgxOTcyfQ.XY9q_Y4peC9nGaei4Pee3UKl8OCFSY4s-Lev_VshGvE
// USER
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbGVuQGdvb2dsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDE4MjE5Nn0.dpoCsPU9KyWJuy6uQ8d_35YooZIisxadtum60BZhZbA
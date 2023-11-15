import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'CoderHoasd12 as21nj'

export const generateToken = user => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })

    return token
}

export const authToken = (req, res, next) => {
    const token = req.headers.auth

    if(!token) return res.status(401).send({error: 'No auth'})

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: 'No authorized'})

        req.user = credentials.user
        next()
    })
}
import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'CoderHoasd12 as21nj'

export const generateToken = user => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })

    return token
}

// No se utiliza porque usamos el de passport
export const authToken = (req, res, next) => {
    const token = req.cookies['cookieForToken']
    console.log({ token })

    if (!token) return res.status(401).send({ error: 'No auth' })

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: 'No authorized' })

        req.user = credentials.user
        next()
    })
}

export const authorization = (role) => {
    return async (req, res, next) => {
        const user = req.user.user
        
        console.log({ user })
        if (!user) return res.status(401).send({ error: 'Unathorized' })
        if (user.role != role) return res.status(403).send({ error: 'No permission' })

        return next()
    }
}
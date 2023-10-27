import { Router } from 'express'
import UserModel from '../models/users.model.js'

const router = Router()

router.get('/', async (req, res) => {
    const page = parseInt(req.query?.page ?? 1)
    const limit = parseInt(req.query?.limit ?? 5)

    const result = await UserModel.paginate({}, {
        page,
        limit,
        lean: true // Pasar a formato JSON
    })

    result.prevLink = result.hasPrevPage ? `/?page=${result.prevPage}&limit=${limit}` : ''
    result.nextLink = result.hasNextPage ? `/?page=${result.nextPage}&limit=${limit}` : ''

    res.render('index', result)
})


export default router
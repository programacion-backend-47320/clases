import { Router } from 'express'
import passport from 'passport'
import { createPizza, getPiizaById, getPizzas, removePizza, updatePizza } from '../controllers/pizza.controller.js'

const router = Router()

router.get('/', getPizzas)
router.get('/:id', getPiizaById)
router.post('/', passport.authenticate('jwt'), createPizza)
router.put('/:id', updatePizza)
router.delete('/:id', removePizza)

export default router
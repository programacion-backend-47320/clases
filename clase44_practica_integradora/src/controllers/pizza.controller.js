import { PizzaService } from '../services/index.js'

export const getPizzas = async(req, res) => {
    return res.json(await PizzaService.get())
}

export const getPiizaById = async(req, res) => {
    const { id } = req.params
    return res.json(await PizzaService.getById(id))
}

export const createPizza = async(req, res) => {
    const object = req.body

    return res.json(await PizzaService.create(object))
}

export const updatePizza = async(req, res ) => {
    const { id } = req.params
    const object = req.body
    
    return res.json(await PizzaService.update(id, object))
}

export const removePizza = async(req, res) => {
    const { id } = req.params

    return res.json(await PizzaService.remove(id))
}
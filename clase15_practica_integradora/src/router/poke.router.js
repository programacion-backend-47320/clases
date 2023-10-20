import { Router } from "express";
import pokeModel from '../models/poke.models.js'

const router = Router()

// Listar all pokemons
router.get('/', async(req, res) => {
    const pokemons = await pokeModel.find().lean().exec()

    res.render('list', { pokemons })
})

// Pagina para crear pokemons
router.get('/create', async(req, res) => {
    res.render('create', {})
})

// POST para crear pokemons
router.post('/', async(req, res) => {
    try {
        const pokemonNew = req.body
        const result = await pokeModel.create(pokemonNew)

        res.redirect('/pokemon')
    } catch(error) {
        res.render('error', {error: 'Error al crear el pokemon'})
    }
})

// Buscar un pokemon by name
router.get('/:name', async (req, res) => {
    try {
        const name = req.params.name
        const pokemon = await pokeModel.findOne({ name }).lean().exec()

        res.render('one', { pokemon })
    } catch (error) {
        
        res.render('error', {error: 'Error al buscar el pokemon ' + name})
    }
})

// Borrar un pokemon
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await pokeModel.deleteOne({ _id: id })

        return res.json({ status: 'success' })
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router
import { Router } from "express";

const router = Router()

const pokemons = [
    {
        name: 'pikachu',
        photo: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        type: 'electric'
    }
]

// Listar all pokemons
router.get('/', async(req, res) => {
    res.render('list', { pokemons })
})

// Pagina para crear pokemons
router.get('/create', async(req, res) => {
    res.render('create', {})
})

// POST para crear pokemons
router.post('/', async(req, res) => {
    
    res.send('Creando pokemon...')
})

// Buscar un pokemon by name
router.get('/:name', async (req, res) => {
    res.send('Buscando el pokemon ' + req.params.name)
})

// Borrar un pokemon
router.delete('/:id', (req, res) => {
    res.send('Borrando pokemon...')
})

export default router
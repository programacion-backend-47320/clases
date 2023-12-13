import { StoreService } from "../services/index.js";

export const getStores = async (req, res) => {
    const result = await StoreService.getStores()
    res.json({ status: 'success', payload: result })
}

export const getStoreById = async (req, res) => {
    const { sid } = req.params
    const result = await StoreService.getStoreById(sid)

    res.json({ status: 'success', payload: result })
}

export const addStore = async (req, res) => {
    const store = req.body

    const result = await StoreService.addStore(store)
    res.send({ status: 'success', payload: result })
}

export const addProduct = async (req, res) => {
    const product = req.body
    const { sid } = req.params

    const result = await StoreService.addProduct(sid, product)
    res.send({ status: 'success', payload: result })
}
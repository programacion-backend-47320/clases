import { Router } from "express";
import { addProduct, addStore, getStoreById, getStores } from "../controllers/store.controller.js";

const router = Router()

router.get('/', getStores)
router.get('/:sid', getStoreById)
router.post('/', addStore)
router.post('/:sid/product', addProduct)

export default router
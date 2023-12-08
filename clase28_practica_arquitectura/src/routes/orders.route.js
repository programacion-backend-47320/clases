import { Router } from "express";
import { createOrder, getOrderById, getOrders, resolveOrder } from "../controllers/order.controller.js";

const router = Router()

router.get('/', getOrders)
router.get('/:oid', getOrderById)
router.post('/', createOrder)
router.post('/:oid', resolveOrder)

export default router
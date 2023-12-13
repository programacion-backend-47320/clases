import { OrderService } from "../services/index.js";

export const getOrders = async (req, res) => {
    const result = await OrderService.getOrders()
    res.json({ status: 'success', payload: result })
}

export const getOrderById = async (req, res) => {
    const { oid } = req.params
    const result = await OrderService.getOrderById(oid)

    res.json({ status: 'success', payload: result })
}

export const createOrder = async (req, res) => {
    const order = req.body

    const result = await OrderService.createOrder(order)
    res.send({ status: 'success', payload: result })
}

export const resolveOrder = async (req, res) => {
    const { resolve } = req.query
    const { oid } = req.params

    const result = await OrderService.resolveOrder(oid, resolve)

    res.send({ status: 'success', payload: result })
}
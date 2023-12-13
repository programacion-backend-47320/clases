import OrderModel from "./models/orders.model.js";

export default class Order {
    getOrders = async () => { return await OrderModel.find() }
    getOrderById = async (id) => { return await OrderModel.findById(id) }
    createOrder = async (order) => { return await OrderModel.create(order) }
    updateOrder = async (id, order) => {
        return await OrderModel.updateOne({ _id: id }, { $set: order })
    }
}
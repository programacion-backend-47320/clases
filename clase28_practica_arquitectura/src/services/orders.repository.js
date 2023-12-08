
export default class OrderRepository {

    constructor(dao) {
        this.dao = dao
    }

    getOrders = async () => { return await this.dao.getOrders() }
    getOrderById = async (oid) => { return await this.dao.getOrderById(oid) }
    createOrder = async(order) => {
        order.status = 'pending'
        return await this.dao.createOrder(order)
    }

    resolveOrder = async(oid, resolve) => {
        const order = this.getOrderById(oid)
        order.status = resolve

        return await this.dao.updateOrder(oid, order)
    }

}
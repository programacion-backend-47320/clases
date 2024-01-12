import TicketModel from "./models/tickets.model.js";

export default class Ticket {
    get = async () => { return TicketModel.find() }
    create = async (data) => { return TicketModel.create(data) }
    getByID = async (id) => { return TicketModel.findById(id) }
    update = async (data) => { return TicketModel.updateOne({ _id: data._id }, data) }
}
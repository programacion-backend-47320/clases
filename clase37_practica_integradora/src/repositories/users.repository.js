import UserCreateDTO from "../DTO/users.dto.js";
import { TicketService } from './index.js'
import Mail from '../modules/mail.module.js'

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
        this.mail = new Mail()
    }

    get = async () => { return this.dao.get() }
    getByID = async id => { return this.dao.getByID(id) }
    create = async (data) => {
        const dataToInsert = new UserCreateDTO(data)
        return this.dao.create(dataToInsert)
    }

    addTicket = async (userID, ticketID) => {
        const user = await this.dao.getByID(userID)

        if (!user) { throw new Error(`User not found`) }
        const ticket = await TicketService.getByID(ticketID)
        if(!ticket) { throw new Error(`Ticket not found`)}

        user.tickets.push(ticketID)

        return this.dao.update(user)
    }

    reminder = async(userID) => {
        const user = await this.dao.getByID(userID)

        let html = `Mr ${user.name}, your tickets: <hr><ul>`
        for (let i = 0; i < user.tickets.length; i++) {
            const ticketID = user.tickets[i];
            const ticket = await TicketService.getByID(ticketID)

            html = html.concat(`<li>${ticket.name}: ${ticket.description}<li>`)
        }
        html += `<ul>`

        const result = this.mail.send(user, "Reminder Tickets", html)

        return result
    }



}
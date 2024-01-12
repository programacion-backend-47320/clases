export default class UserCreateDTO {
    constructor(user) {
        this.name = user?.name || ''
        this.email = user?.email || ''
        this.tickets = user?.tickets || []
    }
}

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async () => { 
        console.log(this.dao)
        return await this.dao.getUsers() 
    }
    getUserById = async (id) => { return await this.dao.getUserById(id) }
    saveUser = async (user) => { return await this.dao.saveUser(user) }
}
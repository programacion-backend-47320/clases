
export default class UserRepository {

    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    getById = async(id) => {
        return await this.dao.getById(id)
    }

    register = async(user) => {
        return await this.dao.create(user)
    }

    update = async(id, user) => {
        return await this.dao.update(id, user)
    }

    remove = async (id) => {
        return await this.dao.remove(id)
    }

    getByEmail = async(email) => {
        return await this.dao.getByEmail(email)
    }

}
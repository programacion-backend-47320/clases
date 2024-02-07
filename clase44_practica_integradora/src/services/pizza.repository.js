
export default class PizzaRepository {

    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    getById = async(id) => {
        return await this.dao.getById(id)
    }

    create = async(user) => {
        return await this.dao.create(user)
    }

    update = async(id, user) => {
        return await this.dao.update(id, user)
    }

    remove = async (id) => {
        return await this.dao.remove(id)
    }

}
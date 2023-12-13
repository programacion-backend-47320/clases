import UsersModel from './models/users.models.js'

export default class User {
    getUsers = async () => { 
        console.log('asdsad')
        return await UsersModel.find() 
    }
    getUserById = async (id) => { return await UsersModel.findById(id) }
    saveUser = async (user) => { return await UsersModel.create(user) }
}
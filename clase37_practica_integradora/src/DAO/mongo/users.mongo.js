import UserModel from "./models/users.model.js";

export default class User {
    get = async () => { return UserModel.find() }
    create = async (data) => { return UserModel.create(data) }
    getByID = async (id) => { return UserModel.findById(id) }
    update = async (data) => { return UserModel.updateOne({ _id: data._id }, data) }

}
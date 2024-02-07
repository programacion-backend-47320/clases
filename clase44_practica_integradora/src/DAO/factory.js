import config from "../config/config.js";
import mongoose from "mongoose";

export let Pizza
export let User

console.log(`Persistence with ${config.persistence}`)

switch (config.persistence) {
    case 'MONGO':

        await mongoose.connect(config.databaseURL, { dbName: config.databaseNAME })
        console.log('DB connected!!')

        const { default: PizzaMongo } = await import('./mongo/pizza.dao.mongo.js')
        const { default: UserMongo } = await import('./mongo/user.dao.mongo.js')

        Pizza = PizzaMongo
        User = UserMongo

        break;

    case 'FILE':

        const { default: PizzaFile } = await import('./file/pizza.dao.file.js')
        const { default: UserFile } = await import('./file/user.dao.file.js')

        Pizza = PizzaFile
        User = UserFile

        break;

        throw 'Persistence FILE is not defined yet'

    default:
        throw 'Persistence is not defined'
}
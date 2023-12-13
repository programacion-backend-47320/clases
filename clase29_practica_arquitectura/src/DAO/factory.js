import config from "../config/config.js";
import mongoose from "mongoose";

export let Order
export let User
export let Store

console.log(`Persistence with ${config.persistence}`)

switch (config.persistence) {
    case "FILE":
        
        const { default: OrderFile } = await import('./file/orders.file.js')
        const { default: UserFile } = await import('./file/users.file.js')
        const { default: StoreFile } = await import('./file/stores.file.js')
        
        Order = OrderFile
        User = UserFile
        Store = StoreFile

        break;
    case "MONGO":

        await mongoose.connect(config.mongoURL, {dbName: config.mongoDBName})
        console.log('DB connected 👌')
        
        const { default: OrderMongo } = await import('./mongo/orders.mongo.js')
        const { default: UserMongo } = await import('./mongo/users.mongo.js')
        const { default: StoreMongo } = await import('./mongo/stores.mongo.js')
        
        Order = OrderMongo
        User = UserMongo
        Store = StoreMongo

        break;

    default:
        throw "Persistence doesn't found"
}
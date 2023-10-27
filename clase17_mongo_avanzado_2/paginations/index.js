import mongoose from "mongoose";
import userModel from "./models/user.model.js";

const env = async () => {

    await mongoose.connect('mongodb://admin:admin@127.0.0.1:27017', {
        dbName: 'clase47_12'
    })
    console.log('DB connected 👌 ')

    const users = await userModel.paginate({gender: 'Female'}, {limit: 20, page: 10})

    console.log(users)

    process.exit()
}

env()
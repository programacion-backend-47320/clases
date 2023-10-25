import mongoose from "mongoose";
import userModel from './models/users.model.js'

const uri = 'mongodb+srv://r2:NYHvpWtHcu.3f%40h@clusterr2.gj8v5sk.mongodb.net/'

const env = async() => {
    
    await mongoose.connect(uri, {
        dbName: 'myDB'
    })

    console.log('DB connected')

    const result = await userModel.find({ first_name: 'Celia'}).explain('executionStats')
    console.log(result.executionStats.executionTimeMillis)

}

env()

/**
 * 
 * Find()                       2 milisegundos [3]
 * Find('Celia')                3 milisegundos [2]
 * Find('Celia', index: true)   1 miligegundos
 * 
 */
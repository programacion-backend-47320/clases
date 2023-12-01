import mongoose from "mongoose";

export default class MongoSingleton {

    static #instance

    constructor() {
        mongoose.connect('mongodb://admin:admin@127.0.0.1', {
            dbName: "clase27_47"
        })
            .then(() => console.log('DB connected!'))
            .catch(e => console.log(e))
    }

    static getInstance() {

        if(this.#instance) {
            console.log('Already connected!')
            return this.#instance
        }

        this.#instance = new MongoSingleton()

        return this.#instance
    }

}

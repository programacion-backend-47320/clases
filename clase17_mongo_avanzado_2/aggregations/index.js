import mongoose from "mongoose";
import orderModel from "./models/order.model.js";

const env = async () => {

    await mongoose.connect('mongodb://admin:admin@127.0.0.1:27017', { dbName: "clase47_12" })
    console.log('DB connected!! 👌  ')

    // const result = await orderModel.insertMany([
    //     {name: 'Pepperoni', size: 'small', price: 19, quantity: 10, date: "2022-01-11T23:51:06.919Z"},
    //     {name: 'Pepperoni', size: 'medium', price: 20, quantity: 20, date: "2022-01-15T23:51:06.919Z"},
    //     {name: 'Pepperoni', size: 'medium', price: 20, quantity: 20, date: "2022-01-15T23:51:06.919Z"},
    //     {name: 'Pepperoni', size: 'large', price: 21, quantity: 30, date: "2022-01-17T23:51:06.919Z"},
    //     {name: 'Cheese', size: 'small', price: 12, quantity: 15, date: "2022-01-11T23:51:06.919Z"},
    //     {name: 'Cheese', size: 'medium', price: 13, quantity: 50, date: "2022-01-11T23:51:06.919Z"},
    //     {name: 'Cheese', size: 'large', price: 14, quantity: 10, date: "2022-01-12T23:51:06.919Z"},
    //     {name: 'Hawaina', size: 'small', price: 17, quantity: 10, date: "2022-01-11T23:51:06.919Z"},
    //     {name: 'Hawaina', size: 'medium', price: 18, quantity: 10, date: "2022-01-11T23:51:06.919Z"},
    // ])
    // console.log(result)

    const orders = await orderModel.aggregate([
        { $match: { size: 'medium' } },
        {
            $group: {
                _id: "$name",
                totalQuantity: { $sum: '$quantity' }
            }
        },
        { $sort: { totalQuantity: -1 } },
        {
            /**
             * Guardamors el resultado en un nuevo documento
             * El documento nuevo a tener _id y orders
             * Hacemos $push para guardar todo el resultado anterior en un campo que llamaremos orders
             * $$ROOT toma toda la estructura del resultado anterior
             */
            $group: {
                _id: 1,
                orders: { $push: '$$ROOT' }
            }
        },
        {
            $project: {
                "_id": 0,
                orders: "$orders"
            }
        },
        { $merge: { into: 'reports' } } // Exporta el resultado en una collection
    ])

    

    console.log(JSON.stringify(orders, null, 2, '/t'))



}

env()
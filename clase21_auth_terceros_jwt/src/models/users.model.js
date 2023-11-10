import mongoose from "mongoose";

export const UserModel = mongoose.model('users', mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    first_name: String,
    last_name: String
}))
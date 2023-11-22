import passport from "passport";
import UserModel from "../models/users.model.js";

const initializePassport = () => {

    

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport()
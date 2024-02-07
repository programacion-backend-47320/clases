import dotenv from 'dotenv'

dotenv.config()

export default {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    databaseURL: process.env.MONGO_URL,
    databaseNAME: process.env.MONGO_DBNAME,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
}
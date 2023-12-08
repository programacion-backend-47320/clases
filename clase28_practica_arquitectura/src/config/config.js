import dotenv from 'dotenv'

dotenv.config()

export default {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT || 8080,
    mongoURL: process.env.MONGO_URL || 'mongodb://admin:admin@127.0.0.1:27017',
    mongoDBName: process.env.MONGO_DB_NAME || 'clase28_47'
}
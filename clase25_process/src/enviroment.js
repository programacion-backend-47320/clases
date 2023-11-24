import { config } from 'dotenv'

const envs = process.env
console.log(envs.NODE_ENV)

config({ path: '.env' })

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

console.log({ PORT, NODE_ENV }) 
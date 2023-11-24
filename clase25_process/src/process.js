
console.log( process.cwd() )
console.log( process.pid )

console.log( process.argv.slice(2) )

const argv = process.argv.slice(2)
const [PORT, URL_MONGO] = argv

console.log( {PORT, URL_MONGO })

// setInterval(() => {console.log('/')}, 1_000)
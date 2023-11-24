import { Command } from 'commander'

// Instanciamos el commander
const program = new Command()

program
    .option('-d', 'Variables para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .requiredOption('--password <password>', 'Password for DB')
    .requiredOption('-u <user>', 'User que corre el app')
    .option('-l, --letters [letters...]', 'Especicar letras')


program.parse() // Leer el process.argv

console.log('Options: ', program.opts()) // El resulado
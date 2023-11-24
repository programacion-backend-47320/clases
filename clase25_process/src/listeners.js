
process.on('exit', (code) => {
    console.log('Esta funcion se ejecuta antes de salir del proceso')
})

process.on('uncaughtException', code => {
    console.log('Una exception no ha sido controlada')
})

process.on('message', message => {
    console.log('Esta funcionm recibio un mensaje de otro proceso')
})

//throw "asdeasdas"
console.log('INIT process 🌆')

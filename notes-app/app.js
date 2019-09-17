const fs = require('fs')
const chalk = require('chalk')

let msg = chalk.blue.inverse('Start app')
console.log(msg)

let success = chalk.green.inverse('Success')
console.log(success)

let error = chalk.red.inverse('One error')
console.log(error)

console.log(process.argv)
//fs.appendFileSync('notes.txt', ' I live in Philadelphia')

//fs.writeFileSync('notes.txt', 'This files created by Node.js');
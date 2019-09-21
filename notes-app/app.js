const fs = require('fs')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
/*
let msg = chalk.blue.inverse('Start app')
console.log(msg)

let success = chalk.green.inverse('Success')
console.log(success)

let error = chalk.red.inverse('One error')
console.log(error)
*/
yargs.version('1.0.0')
yargs.command({
  command: 'add',
  describe: 'Add a new notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body)
  }
})
yargs.command({
  command: 'remove',
  describe: 'Remove a new notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler: function(argv) {
    notes.removeNote(argv.title)
  }
})
yargs.command({
  command: 'list',
  describe: 'List a notes',
  handler: function() {
    notes.listNotes()
  }
})
yargs.command({
  command: 'read',
  describe: 'Read a notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler: function(argv) {
    notes.readNote(argv.title)
  }
})

yargs.parse()
//console.log(yargs.argv)
//fs.appendFileSync('notes.txt', ' I live in Philadelphia')

//fs.writeFileSync('notes.txt', 'This files created by Node.js');
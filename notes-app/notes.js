const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes'

const addNote = (title,body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)
  
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }

  
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}
const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter(note => note.title !== title)
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Removed note!'))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}

const readNote = (title) => {
  const notes = loadNotes()
  const notesRead = notes.find(note => note.title === title)
  if (notesRead) {
    console.log(chalk.blue.inverse('Note'))
    console.log(`title: ${notesRead.title}`)
    console.log(`body: ${notesRead.body}`)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.inverse('Your notes'))
  notes.forEach((note) => {
    console.log(note.title)
  })
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
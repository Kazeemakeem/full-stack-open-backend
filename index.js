const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let notes = [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2022-1-17T17:30:31.098Z",
      "important": false
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2022-1-17T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important method of HTTP protocol",
      "date": "2022-1-17T19:20:14.298Z",
      "important": true
    },
    {
      "content": "Add new note",
      "date": "2022-10-27T10:47:48.401Z",
      "important": true,
      "id": 4
    },
    {
      "content": "This is a new note",
      "date": "2022-10-27T10:49:00.267Z",
      "important": false,
      "id": 5
    },
    {
      "content": "This is a new note and another",
      "date": "2022-10-27T10:49:56.109Z",
      "important": true,
      "id": 6
    }
  ]

const findNote = (id) => {
  const note = notes.find(note => note.id === id)
  return note

}

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = findNote(id)

  note ? res.json(note) : res.status(404).end()
  
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note !== findNote(id))
  res.status(204).end()
  
})

app.post('/api/notes', (req, res) => {
  const body = req.body
  if(!body.content) {
    return res.status(400).json({
      error: "content missing"
    })
  }
  const newNote = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: notes.length + 1
  }
  notes.concat(newNote)
  res.json(newNote)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




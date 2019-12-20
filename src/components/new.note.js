import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const NewNoteSection = () => {


  const postURL = 'http://localhost:3001/notes'

  const [newNote, setNewNote] = useState(
    {title: '', content: ''}
  );

  const handleChange = (event) => {
    setNewNote({...newNote, [event.target.name]: event.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(postURL, newNote)
      .then(function(response) {
          console.log(response)
      })
      .catch(function (error) {
          console.log(error)
      }) 
  }
  
  return (
      <form onSubmit={handleSubmit}>
        <input type="text" name='title' value={newNote.title} onChange={handleChange} />
        <input type="text" name='content' value={newNote.content} onChange={handleChange} />
        <input type="submit" />
      </form>
  )
}

import React, {useState, useEffect} from 'react'
import 
import axios from 'axios'


export const handleChange = (event) => {
  setNewNote({...newNote, [event.target.name]: event.target.value})
}

export const [newNote, setNewNote] = useState(
  {title: '', content: ''}
);

  export const handleSubmit = (e) => {
  
    e.preventDefault()
    axios.post('http://localhost:3001/api/notes', newNote)
      .then(() => fetchData())
      .catch(function (error) {
          console.log(error)
      }) 
  }
  

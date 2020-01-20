import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

export default function MainFunc() {
  const [data, setData] = useState([]);
  const [newNote, setNewNote] = useState(
    {title: '', content: ''}
  );

  const fetchData = async () => {
    const result = await axios(
      'http://localhost:3001/api/notes',
    ).then( result => {setData(result.data)})
  };

  useEffect(() => {
    fetchData();
  }, []);

  // New Note

  const handleChange = (event) => {
    setNewNote({...newNote, [event.target.name]: event.target.value})
  }
  const handleClick = (noteId) => {
    axios.delete(`http://localhost:3001/api/notes/${noteId}`).then( () => fetchData())
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/api/notes', newNote)
      .then(() => fetchData())
      .catch(function (error) {
          console.log(error)
      }) 
  }

  // New Note end

  return (
    <>
      <ul>
      {data.map(item => (
        <li key={item._id}>
          {item.title}
          {item.content}
          <div onClick={() => handleClick(item._id)}>x</div>
        </li>
      ))}
      </ul>

    {/* <NewNoteSection /> */}
    <div className="notes__add-wrapper">
      <div className="notes__bigform">
      <form onSubmit={handleSubmit} className="notes__add-form">
      <div className="notes__text-inputs">
        <input type="text" name='title' placeholder="title..." value={newNote.title} onChange={handleChange} />
        <textarea name='content' placeholder="text..." value={newNote.content} onChange={handleChange} />
      </div>
      <div className="notes__button-input">
        <input type="submit" />
      </div>
      </form>
      </div>
    </div>
    </>
  );
}


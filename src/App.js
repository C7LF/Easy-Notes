import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
//import { NewNoteSection } from './components/new.note';

function App() {

  const [data, setData] = useState([]);

  const handleClick = (noteId) => {
    axios.delete(`http://localhost:3001/api/notes/${noteId}`).then( () => fetchData())
  }

  const fetchData = async () => {
    const result = await axios(
      'http://localhost:3001/api/notes',
    ).then( result => {setData(result.data)})
  };

  useEffect(() => {
    fetchData();
  }, []);

  // New Note

  const [newNote, setNewNote] = useState(
    {title: '', content: ''}
  );

  const handleChange = (event) => {
    setNewNote({...newNote, [event.target.name]: event.target.value})
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
    <div className="App">
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
    <form onSubmit={handleSubmit}>
        <input type="text" name='title' value={newNote.title} onChange={handleChange} />
        <input type="text" name='content' value={newNote.content} onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;

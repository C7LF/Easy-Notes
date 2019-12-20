import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { NewNoteSection } from './components/new.note';


const handleClick = (noteId) => {
  axios.delete(`http://localhost:3001/notes/${noteId}`)
}

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3001/notes',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <ul>
      {data.map(item => (
        <li key={item._id}>
          {item.title}
          {item.content}
          <input onClick={handleClick(item._id)} value="x" type="submit" />
        </li>
      ))}
      </ul>
    <NewNoteSection />
    </div>
  );
}

export default App;

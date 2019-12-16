import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://192.168.1.81:3001/notes',
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
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const fetchData = () => {
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

  return (
    <ul>
    {data.map(item => (
      <li key={item._id}>
        {item.title}
        {item.content}
        <div onClick={() => handleClick(item._id)}>x</div>
      </li>
    ))}
    </ul>
  )
}
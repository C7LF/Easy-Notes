import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import {useGlobalState} from './state'

export default function MainFunc() {
  const className = 'notes'
  const [data, setData] = useGlobalState('data');

  const fetchData = async () => {
    const result = await axios(
      'http://localhost:3001/api/notes',
    ).then( result => {setData(result.data)})
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (noteId) => {
    axios.delete(`http://localhost:3001/api/notes/${noteId}`).then( () => fetchData())
  }

  return (
    <>
      <ul className={`${className}__list`}>
      {data.map(item => (
        <li key={item._id} className="notes__item">
          {<p className={`${className}__item-title`}>{item.title}</p>}
          {<p>{item.content}</p>}
          <div onClick={() => handleClick(item._id)}>x</div>
        </li>
      ))}
      </ul>
    </>
  );
}


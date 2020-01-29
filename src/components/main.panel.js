import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import {useGlobalState} from './state'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { SingleNoteView } from './single.note';

export default function MainFunc() {
  const className = 'notes'
  const [data, setData] = useGlobalState('data');
  const [currentNote, setCurrentNote] = useState()

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

  const selectSingleNote = (noteId) => { 
     setCurrentNote(noteId)
  }

  return (
    <>
      <ul className={`${className}__list`}>
      {data.map(item => (
        <li key={item._id} className="notes__item" onClick={() => {selectSingleNote(item._id)}}>
          {<p className={`${className}__item-title`}>{item.title}</p>}
          {<p>{item.content}</p>}
          <div onClick={() => handleClick(item._id)}>x</div>
        </li>
      ))}
      </ul>
      <div>
        {currentNote && (
          <SingleNoteView cn={currentNote} />
        )}
      </div>
    </>
  );
}


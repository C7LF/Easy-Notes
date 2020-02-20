import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import {useGlobalState} from './state'
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

  const selectSingleNote = (noteId) => { 
     setCurrentNote(noteId)
  }

  return (
    <>
      <ul className={`${className}__list`}>
      {data.map(item => (
        <li key={item._id} className="notes__item" onClick={() => {selectSingleNote(item._id)}}>
          {<p className={`${className}__item-title`}>{item.title}</p>}
          {<p></p>}
        </li>
      ))}
      </ul>
      <div className={`${className}__single-wrapper`}>
        {currentNote && (
          <SingleNoteView cn={currentNote} />
        )}
      </div>
    </>
  );
}


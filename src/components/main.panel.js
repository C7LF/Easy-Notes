import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import {useGlobalState} from './state'
import { SingleNoteView } from './single.note';
import {Editor, convertToHTML, EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
import { faSubscript } from '@fortawesome/free-solid-svg-icons';
import ls from 'local-storage'


export default function MainFunc() {
  const className = 'notes'
  const [data, setData] = useGlobalState('data');
  const [currentNote, setCurrentNote] = useState(localStorage.getItem('Note Id'))

  const fetchData = async () => {
    const result = await axios(
      'http://localhost:3001/api/notes',
    ).then( result => {setData(result.data)})
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectSingleNote = (noteId) => {
    localStorage.setItem('Note Id', noteId)
    setCurrentNote(noteId)
  }

  const objectPreviewText = (x) => {
    const allText = x.blocks.map(block => (!block.text.trim() && ' ') || block.text).join(' ')
    const previewStr = allText.length > 10 ? allText.substring(0, 10) + "..." : allText

    return previewStr
  }

  const checkForActive = currentId => (localStorage.getItem('Note Id') == currentId) && 'active'


  return (
    <>
      <ul className={`${className}__list`}>
      {data.map(item => (
        <li key={item._id} className={`notes__item ${checkForActive(item._id)}`} onClick={() => {selectSingleNote(item._id)}}>
          <p className={`${className}__item-title`}>{item.title}</p>
          <p>{objectPreviewText(JSON.parse(item.content))}</p>
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


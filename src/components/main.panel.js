import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.scss';
import {useGlobalState} from '../global/state'
import { SingleNoteView } from './single.note';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom'


const Main = () => {
  const className = 'notes'
  const [data, setData] = useGlobalState('data');
  const [currentNote, setCurrentNote] = useState(localStorage.getItem('Note Id'))

  const fetchData = async () =>  
    await axios('/api/notes',)
    .then( result => {setData(result.data)})

  useEffect(() => {
    fetchData();
  }, []);

  const selectSingleNote = noteId => {
    localStorage.setItem('Note Id', noteId)
    setCurrentNote(noteId)
  }

  const objectPreviewText = x => {
    const allText = x.blocks.map(block => (!block.text.trim() && ' ') || block.text).join(' ')
    const previewStr = allText.length > 10 ? allText.substring(0, 10) + "..." : allText

    return previewStr
  }

  const checkForActive = currentId => (localStorage.getItem('Note Id') === currentId) ? 'active' : ''

  return (
    <>
    <Router>
      <ul className={`${className}__list`}>
        <SimpleBar style={{ maxHeight: window.innerHeight }}>
          {data.map(item => (
            <Link to={`/note/${item._id}`}>
              <li key={item._id} className={`notes__item ${checkForActive(item._id)}`} onClick={() => selectSingleNote(item._id)}>
                <p className={`${className}__item-title`}>{item.title}</p>
                <p>{objectPreviewText(JSON.parse(item.content))}</p>
              </li>
            </Link>
          ))}
        </SimpleBar>
      </ul>
      <div className={`${className}__single-wrapper`}>
        <Route path='/note/:_id'>
          {currentNote && (
            <SingleNoteView cn={currentNote} />
          )}
        </Route>
      </div>
      </Router>
    </>
  );
}

export default Main
import React, { useState, useEffect } from 'react';

import SingleNoteView from './single.note';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { requestNotes } from '../state/actions'

import '../App.scss';


const mapStateToProps = state => {
  return {
    notes: state.requestNotes.notes,
    isPending: state.requestNotes.isPending,
    error: state.requestNotes.error,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestNotes: (token) => dispatch(requestNotes(token))
  }
}

const Main = ({ notes, onRequestNotes }) => {

  //const userId = auth.user.id

  const className = 'notes'
  const [currentNoteId, setCurrentNoteId] = useState(localStorage.getItem('Note Id'))

  const [searchField, setSearchField] = useState('')

  const jwtToken = localStorage.getItem('jwtToken')

  useEffect(() => {
    onRequestNotes(jwtToken)
    console.log(routerNoteId)
  }, []);

  const selectSingleNote = noteId => {
    localStorage.setItem('Note Id', noteId)
    setCurrentNoteId(noteId)
  }

  const objectPreviewText = x => {
    const allText = x.blocks.map(block => (!block.text.trim() && ' ') || block.text).join(' ')
    const previewStr = allText.length > 10 ? allText.substring(0, 10) + "..." : allText

    return previewStr
  }

  const routerNoteId = window.location.pathname.split('/')[2]

  const checkForActive = currentId => (routerNoteId === currentId) ? 'active' : ''

  const searchChange = (e) => setSearchField(e.target.value)

  const filteredNotes = notes.filter(note => {
    return note.title.toLowerCase().includes(searchField.toLowerCase())
  })

  return (
    <>
      <Router>
        <ul className={`${className}__list`}>
          <input type='search' className={`${className}__search`} onChange={searchChange} placeholder='search...' />
          <SimpleBar style={{ maxHeight: window.innerHeight }}>
            {filteredNotes && filteredNotes.map(item => (
              <Link to={`/notes/${item._id}`}>
                <li key={item._id} className={`${className}__item ${checkForActive(item._id)}`} onClick={() => selectSingleNote(item._id)}>
                  <p className={`${className}__item-title`}>{item.title}</p>
                  <p>{objectPreviewText(JSON.parse(item.content))}</p>
                </li>
              </Link>
            ))}
          </SimpleBar>
        </ul>
        <div className={`${className}__single-wrapper`}>
          <Route path={`/notes/:_id`}>
            <SingleNoteView currentNoteId={routerNoteId} />
          </Route>
        </div>
      </Router>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { connect } from 'react-redux'
import { requestNotes } from '../state/actions'
import { logoutUser } from '../state/authActions'

const mapDispatchToProps = dispatch => {
  return {
    onRequestNotes: () => dispatch(requestNotes()),
    onLogoutClick: () => dispatch(logoutUser())
  }
}

const mapStateToProps = state => {
  return {
    notes: state.requestNotes.notes,
    isPending: state.requestNotes.isPending,
    error: state.requestNotes.error,
    auth: state.auth
  }
}

const SideBar = ({ onRequestNotes, auth, onLogoutClick }) => {

  const { user } = auth
  const newNote = {
    label: [],
    title: '',
    content: '{"blocks":[{"key":"b11l","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
  };


  const newNotePage = () => {
    axios.post('/api/notes', newNote)
      .then(() => onRequestNotes())
      .catch(error => console.log(error))
  }

  const logoutClick = () => {
    onLogoutClick();
  }

  return (
    <div className="sidebar">
      <div className='sidebar-container'>
        <FontAwesomeIcon icon={faFile} onClick={() => newNotePage()} size="lg" />
        {user.name}
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          onClick={() => logoutClick()}
        >
          Logout
            </button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
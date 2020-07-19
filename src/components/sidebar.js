import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'

import { connect } from 'react-redux'
import { requestNotes } from '../state/actions'
import { logoutUser } from '../state/authActions'

const mapDispatchToProps = dispatch => {
  return {
    onRequestNotes: (token) => dispatch(requestNotes(token)),
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

  const jwtToken = localStorage.getItem("jwtToken")

  const newNote = {
    author: user && user.id,
    label: [],
    title: '',
    content: '{"blocks":[{"key":"b11l","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
  };


  const newNotePage = () => {
    axios.post('/api/notes', newNote)
      .then(() => onRequestNotes(jwtToken))
      .catch(error => console.log(error))
  }

  const logoutClick = () => {
    onLogoutClick();
  }

  return (
    <div className="sidebar">
      <div className='sidebar-container'>
        <AddCircleOutlineIcon className="sidebar__new-note" onClick={() => newNotePage()} />
        {/* {user.name}
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
            </button> */}
        <AccountCircleIcon onClick={() => logoutClick()} className="sidebar__account-icon" />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
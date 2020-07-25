import React, { useEffect } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'

import AccountPane from './account-pane/account-pane'

import { connect } from 'react-redux'
import { requestNotes, setAccountPaneIsOpen, setNoteStatus } from '../state/actions'

const mapDispatchToProps = dispatch => {
  return {
    onRequestNotes: (token) => dispatch(requestNotes(token)),
    onSetPanelIsOpenClick: (accountPaneIsOpen) => dispatch(setAccountPaneIsOpen(accountPaneIsOpen)),
    setNoteStatus: (status) => dispatch(setNoteStatus(status))
  }
}

const mapStateToProps = state => {
  return {
    notes: state.requestNotes.notes,
    isPending: state.requestNotes.isPending,
    error: state.requestNotes.error,
    auth: state.auth,
    noteStatus: state.noteStatus
  }
}

const SideBar = ({
  onRequestNotes,
  auth,
  onSetPanelIsOpenClick,
  noteStatus,
  setNoteStatus
}) => {

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

  const StatusNotification = (
    <div className={`notification ${noteStatus ? 'notification--active' : ''}`}>
      <span>{noteStatus}</span>
    </div>

  )

  useEffect(() => {
    setTimeout(() => {
      setNoteStatus(null)
    }, 3000)
  }, [noteStatus])

  return (
    <>
      <div className="sidebar">
        <div className='sidebar-container'>
          <AddCircleOutlineIcon className="sidebar__new-note" onClick={() => newNotePage()} />
          <AccountCircleIcon onClick={() => onSetPanelIsOpenClick(true)} className="sidebar__account-icon" />
          <AccountPane />
        </div>
      </div>
      {StatusNotification}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
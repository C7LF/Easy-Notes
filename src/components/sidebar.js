import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'

import AccountPane from './account-pane/account-pane'

import { connect } from 'react-redux'
import { requestNotes, setAccountPaneIsOpen } from '../state/actions'

const mapDispatchToProps = dispatch => {
  return {
    onRequestNotes: (token) => dispatch(requestNotes(token)),
    onSetPanelIsOpenClick: (accountPaneIsOpen) => dispatch(setAccountPaneIsOpen(accountPaneIsOpen))
  }
}

const mapStateToProps = state => {
  return {
    notes: state.requestNotes.notes,
    isPending: state.requestNotes.isPending,
    error: state.requestNotes.error,
    auth: state.auth,
  }
}

const SideBar = ({
  onRequestNotes,
  auth,
  onSetPanelIsOpenClick
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

  return (
    <div className="sidebar">
      <div className='sidebar-container'>
        <AddCircleOutlineIcon className="sidebar__new-note" onClick={() => newNotePage()} />
        <AccountCircleIcon onClick={() => onSetPanelIsOpenClick(true)} className="sidebar__account-icon" />
        <AccountPane />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
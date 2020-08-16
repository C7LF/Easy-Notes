import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import _ from "lodash";

import { connect } from 'react-redux'
import { requestNotes, setNoteStatus } from '../state/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPalette } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core';

import Editor from 'draft-js-plugins-editor';
import createMarkdownShortcutsPlugin from 'draft-js-md-keyboard-plugin';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css'

import { Modal } from './modal/modal'
import { formattedDate } from '../utils/format-date'

const mapStateToProps = state => {
  return {
    notes: state.requestNotes.notes,
    isPending: state.requestNotes.isPending,
    error: state.requestNotes.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestNotes: (token) => dispatch(requestNotes(token)),
    setNoteStatus: (status) => dispatch(setNoteStatus(status))
  }
}

const SingleNoteView = ({ setNoteStatus, onRequestNotes, currentNoteId }) => {
  const [singleData, setSingleData] = useState()
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
  const [ModalVisible, setModalVisible] = useState()
  const [singleNoteStatus, setSingleNoteStatus] = useState()
  const [colourPaletteVisible, setColourPaletteVisible] = useState()

  const history = useHistory();

  const labelcolours = ['#d30000', '#1a57db', '#e29f0d']

  const jwtToken = localStorage.getItem("jwtToken")

  const className = 'single-note'

  useEffect(() => {
    //console.log("TEST", currentNoteId)
    const fetchSingleData = async () =>
      await axios(`/api/notes/${currentNoteId}`)
        .then(res => {
          setSingleData(res.data)
          const contentState = convertFromRaw(JSON.parse(res.data.content));
          const stateWithContent = EditorState.createWithContent(contentState)
          const currentSelection = editorState.getSelection()
          const stateWithContentAndSelection = EditorState.forceSelection(stateWithContent, currentSelection)
          setEditorState(stateWithContentAndSelection)
          console.log(singleData)
        }).catch(res => console.log(res))
    if (currentNoteId) {
      fetchSingleData()
    }

    setTimeout(() => {
      setSingleNoteStatus(null)
    }, 5000)
  }, [currentNoteId]);

  const deleteSingleNote = async () => {
    console.log("delete")
    return axios.delete(
      `/api/notes/${currentNoteId}`,
    ).then(res => {
      deleteNoteReset()
      setNoteStatus(res.data.message)
    }).catch(res => {
      console.log("delete failed")
      console.log(res)
      deleteNoteReset()
    })
  }

  const deleteNoteContent = () => (
    <>
      <span><strong>Delete Note</strong></span>
      <p>Are you sure you want to <span className="primary-color">permanently</span> delete this note?</p>
      <div className="deleteButtons">
        <Button onClick={() => setModalVisible(false)} variant="outlined" color="default">
          Cancel
        </Button>
        &nbsp;
        <Button onClick={() => deleteSingleNote()} variant="contained" color="primary">
          Yes
        </Button>
      </div>
    </>
  )

  const deleteNoteReset = () => {
    history.push("/notes")
    setSingleData(undefined)
    onRequestNotes(jwtToken)
    localStorage.removeItem("Note Id")
    setModalVisible(false)
  }

  const addlabel = async (colour) => {
    const noteLabels = singleData.label
    if (noteLabels == null || !noteLabels.includes(colour)) {
      noteLabels.push(colour)
    } else {
      noteLabels.splice(noteLabels.indexOf(colour), 1)
    }

    setSingleData(prevState => ({...prevState, label: noteLabels}))

    await axios.put(`/api/notes/${currentNoteId}`, singleData)
      .then(() => onRequestNotes(jwtToken))
  }


  const labelDisplay = (
    <div className={`${className}__label-section`}>
      {(singleData !== undefined && singleData.label !== null) && singleData.label.map((colour, key) => (
        <div className={`${className}__label-single`} key={key} style={{ backgroundColor: colour }} />
      ))}
    </div>
  )

  const labelPicker = labelcolours.map((colour, key) => (
    <div className={`colorlabel-item ${(singleData !== undefined && singleData.label !== null) && singleData.label.includes(colour) ? 'selected' : ''}`} onClick={() => addlabel(colour)} key={key} style={{ backgroundColor: colour }} />
  ))

  const toggleColourPalette = () => {
    !colourPaletteVisible ?
      setColourPaletteVisible(true) : setColourPaletteVisible(false)
  }

  const ColourPalette = (
    colourPaletteVisible && (
      <div className="colour-pallete">
        {labelPicker}
      </div>
    )
  )

  const ToolBar = () => {
    return (
      <div className={`${className}__toolbar`}>
        <span className={`${className}__toolbar-date`}>{(singleData && singleData.createdAt) && formattedDate(singleData.createdAt)}</span>
        <div className={`${className}__toolbar-icons-wrapper`}>
          <ul className={`${className}__icons`}>
            <li onClick={() => toggleColourPalette()}><FontAwesomeIcon icon={faPalette} /></li>
            {ColourPalette}
            <li onClick={() => setModalVisible(true)}><FontAwesomeIcon icon={faTrashAlt} className='icon-trash' /></li>
            <Modal isVisible={ModalVisible} content={deleteNoteContent()} />
          </ul>
        </div>
      </div>
    )
  }

  const changeEditorText = newState => {
    //if (editorState.getCurrentContent() !== newState.getCurrentContent()) {
      console.log("fired")
      const newData = {
        title: singleData.title,
        content: JSON.stringify(convertToRaw(newState.getCurrentContent())),
        label: singleData.label,
        createdAt: singleData.createdAt
      }
      // textChange(newData)

      setEditorState(newState)

      //setSingleData(prevState => ({...prevState, content: newValue}))

      
      if (editorState.getCurrentContent() !== newState.getCurrentContent()) {
        console.log("Diff")
        axios.put(`/api/notes/${currentNoteId}`, newData)
      }

    //}

  }


  // Since singleData is updated every onChange, a re-render is caused, creating a new denounce function for each change.
  // useCallback can be used to stop the debounce function running every re-render
  const titleChange = useCallback(
    _.debounce(eventData => axios.put(`/api/notes/${currentNoteId}`, eventData)
      .then(() => onRequestNotes(jwtToken)), 1000, true),
    []);

  const changeTitleText = e => {
    const newValue = e.target.value;
    setSingleData(prevState => ({ ...prevState, title: newValue }))
    console.log(singleData)
    const newData = {
      title: newValue,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      label: singleData.label,
      createdAt: singleData.createdAt
    }
    titleChange(newData)
  }

  return (
    <div>
      {singleData &&
        <div className={`${className}__wrapper`}>
          <ToolBar />
          <div className={`${className}__inner`}>
            {(singleData.label && singleData.label.length > 0) && labelDisplay}
            <input type="text" className={`${className}__title`} value={singleData.title} placeholder="Title..." onChange={e => changeTitleText(e)} />
            <Editor editorState={editorState} onChange={e => changeEditorText(e)} plugins={[createMarkdownShortcutsPlugin()]} />
          </div>
        </div>
      }
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleNoteView)
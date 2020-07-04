import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useGlobalState } from '../global/state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import Editor from 'draft-js-plugins-editor';
import createMarkdownShortcutsPlugin from 'draft-js-md-keyboard-plugin';
import { EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css'
import { Modal } from './modal'
import { formattedDate } from '../global/utils'

export const SingleNoteView = ({cn}) => {
    const [singleData, setSingleData] = useState()
    const [, setData] = useGlobalState('data')
    const [editorState, setEditorState] = React.useState(
      EditorState.createEmpty()
    );
    const [ModalVisible, setModalVisible] = useState()
    const [singleNoteStatus, setSingleNoteStatus] = useState()
    const labelcolours = ['#d30000','#1a57db','#e29f0d']
    const [colourPaletteVisible, setColourPaletteVisible] = useState()

    const className = 'single-note'

    const fetchData = async () => 
      await axios('/api/notes')
      .then( res => {setData(res.data)})
    
    useEffect(() => {
      const fetchSingleData = async () => 
      await axios(`/api/notes/${cn}`)
        .then( res => {
          setSingleData(res.data)
         
          const contentState = convertFromRaw(JSON.parse(res.data.content));
          setEditorState(EditorState.createWithContent(contentState))
        }).catch( res => console.log(res))
      fetchSingleData()
      
      setTimeout( () => {
        setSingleNoteStatus(null)
      }, 5000)
    }, [cn]);

    const deleteSingleNote = async () => {
       await axios.delete(
        `/api/notes/${cn}`,
        ).then( res => {
          setSingleNoteStatus(res.data.message)
          deleteNoteReset()
        }).catch( res => console.log(res))
      }

    const noteStatus = (
      <div className="notification" style={{ height: singleNoteStatus ? '30px' : '0px'}}>
        <div className="notification__message">
          <p>{singleNoteStatus}</p>
        </div>
      </div>
    )
    
    const deleteNoteContent = () => (
      <>
        <span><strong>Delete Note</strong></span>
        <p>Are you sure you want to <span className="primary-color">permanently</span> delete this note?</p>
        <div className="deleteButtons">
          <button className="btn" onClick={() => setModalVisible(false)}>Cancel</button><button className="btn primary-btn" onClick={() => deleteSingleNote()}>Yes</button>
        </div>
      </>
    )

    const deleteNoteReset = () => {
      setSingleData(undefined);
      fetchData();
      setModalVisible(false);
      localStorage.clear()
    }

    const addlabel = async (colour) => {
      const currval = singleData.label
      if(currval == null || !currval.includes(colour)) {
        currval.push(colour)
      } else {
        currval.splice(currval.indexOf(colour), 1)
      }
      
      const newLabelData = {
        title: singleData.title, 
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        label: currval,
        createdAt: singleData.createdAt
      }

      setSingleData(newLabelData)
      await axios.put(`/api/notes/${cn}`, newLabelData)
      .then(() => setSingleData(newLabelData))
      .then(() => fetchData())
    }


    const labelDisplay = (
      <div className={`${className}__label-section`}>
        {(singleData !== undefined && singleData.label !== null ) && singleData.label.map((colour, key) => (
          <div className={`${className}__label-single`} key={key} style={{backgroundColor: colour}} />
        ))}
      </div>
    ) 

    const labelPicker = labelcolours.map((colour, key) => (
        <>
          <div className='colorlabel-item' onClick={() => addlabel(colour)} key={key} style={{ backgroundColor: colour }} />
        </>
      )
    )

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
              <li><FontAwesomeIcon icon={faShareAlt} /></li>
              <li><FontAwesomeIcon icon={faBookmark} /></li>
              <li onClick={() => setModalVisible(true)}><FontAwesomeIcon icon={faTrashAlt} className='icon-trash' /></li>
              <Modal isVisible={ModalVisible} content={deleteNoteContent()} />
            </ul>
          </div>
        </div>
      )
    }

    const changeEditorText = newState => {
      if(editorState.getCurrentContent() !== newState.getCurrentContent()) {
        const newData = { 
          title: singleData.title, 
          content: JSON.stringify(convertToRaw(newState.getCurrentContent()))
        }
        axios.put(`/api/notes/${cn}`, newData)

        // Set new editor state when put is complete to prevent unecessary requests.
        setEditorState(newState)
      }
    }

    const changeTitleText = (e) => {
      const newDataTitle = {
        title: e.target.value, 
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      }
      setSingleData(newDataTitle)

      axios.put(`/v1/notes/${cn}`, newDataTitle).then( () => fetchData())
    }
      
    return (
      <div>
        {singleData &&
          <div className={`${className}__wrapper`}>
          <ToolBar />
            <div className={`${className}__inner`}>
              {labelDisplay}
              <input type="text" className={`${className}__title`} value={singleData.title} placeholder="Title..." onChange={changeTitleText} />
              <Editor editorState={editorState} onChange={changeEditorText} plugins={[createMarkdownShortcutsPlugin()]} />
            </div>
          </div>
        }
        {noteStatus}    
      </div>
    )
}
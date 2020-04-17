import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useGlobalState } from './state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import Editor from 'draft-js-plugins-editor';
//import createMarkdownPlugin from 'draft-js-markdown-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-md-keyboard-plugin';
import { EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css'
import { Modal } from './modal'
import { formattedDate } from './utils'

export const SingleNoteView = ({cn}) => {
    const [singleData, setSingleData] = useState();
    const [, setData] = useGlobalState('data');
    const [editorState, setEditorState] = React.useState(
      EditorState.createEmpty()
    );
    const [ModalVisible, setModalVisible] = useState();
    const [singleNoteStatus, setSingleNoteStatus] = useState();

    const className = 'single-note'

    const fetchData = async () => 
      await axios(
      'http://localhost:3001/api/notes')
      .then( res => {setData(res.data)})
    

    useEffect(() => {
      const fetchSingleData = async () => 
      await axios(`http://localhost:3001/api/notes/${cn}`)
        .then( res => {
          setSingleData(res.data)
          const contentState = convertFromRaw(JSON.parse(res.data.content));
          setEditorState(EditorState.createWithContent(contentState))
        }).catch( res => console.log(res))
      fetchSingleData()
      
      setTimeout( () => {
        setSingleNoteStatus(null)
      }, 3000)
    }, [cn]);

    const deleteSingleNote = async () => {
       await axios.delete(
        `http://localhost:3001/api/notes/${cn}`,
        ).then( res => {
          setSingleNoteStatus(res.data.message)
          deleteNoteReset()
        }).catch( res => console.log(res))
      }

    const noteStatus = (
      <div className="notification">
        <p>{singleNoteStatus}</p>
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
      setSingleData(null);
      fetchData();
      setModalVisible(false);
      localStorage.clear()
    }

    const ToolBar = () => {
      return (
        <div className={`${className}__toolbar`}>
        <span className={`${className}__toolbar-date`}>{formattedDate(singleData.createdAt)}</span>
          <div className={`${className}__toolbar-icons-wrapper`}>
            <ul className={`${className}__icons`}>
              <li><FontAwesomeIcon icon={faShareAlt} /></li>
              <li><FontAwesomeIcon icon={faBookmark} /></li>
              <li><FontAwesomeIcon icon={faTrashAlt} className='icon-trash' onClick={() => setModalVisible(true)} /></li>
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
        axios.put(`http://localhost:3001/api/notes/${cn}`, newData)

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

      axios.put(`http://localhost:3001/api/notes/${cn}`, newDataTitle).then( () => fetchData())
    }
      
    return (
      <div>
        {singleData &&
          <div className={`${className}__wrapper`}>
          <ToolBar />
            <div className={`${className}__inner`}>
              <input type="text" className={`${className}__title`} value={singleData.title} placeholder="Title..." onChange={changeTitleText} />
              <Editor editorState={editorState} onChange={changeEditorText} plugins={[createMarkdownShortcutsPlugin()]} />
            </div>
          </div>
        }
        {singleNoteStatus && noteStatus}    
      </div>
    )
}
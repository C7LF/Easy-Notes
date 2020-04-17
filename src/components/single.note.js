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

export const SingleNoteView = ({cn}) => {
    const [singleData, setSingleData] = useState();
    const [data, setData] = useGlobalState('data');
    const [editorState, setEditorState] = React.useState(
      EditorState.createEmpty()
    );
    const [ModalVisible, setModalVisible] = useState();
    const [singleNoteStatus, setSingleNoteStatus] = useState();

    const className = 'single-note'

    const fetchSingleData = async () => {
      const result = await axios(
        `http://localhost:3001/api/notes/${cn}`
      ).then( result => {
        setSingleData(result.data)
        const contentState = convertFromRaw(JSON.parse(result.data.content));
        setEditorState(EditorState.createWithContent(contentState))
      })
    };

    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3001/api/notes',
        ).then( result => {setData(result.data)})
    };

    useEffect(() => {
      fetchSingleData(cn);

      setTimeout( () => {
        setSingleNoteStatus(null)
      }, 1000)
    }, [cn, singleNoteStatus]);

    const deleteSingleNote = async () => {
      const result = await axios.delete(
        `http://localhost:3001/api/notes/${cn}`,
        ).then( result => {setSingleNoteStatus(result.data.message)}
        ).then(() => deleteNoteReset())
    };

    const noteStatus = (
      <div class="notification">
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
    }

    const formattedDate = (nPDate) => {
      const createdDateParsed = new Date(Date.parse(nPDate))
      const day = createdDateParsed.getDate()
      const monthIndex = createdDateParsed.getMonth()
      const year = createdDateParsed.getFullYear()

      const month = ["January","February","March","April","May","June","July","August","September","October","November","December",];

      const formattedString = `${day} ${month[monthIndex]} ${year}`
      
      return formattedString
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

    const changeText = editorState => {
      setEditorState(editorState)

      const newData = { 
        title: singleData.title, 
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))

      }

      axios.put(`http://localhost:3001/api/notes/${cn}`, newData)
    }

    const handleChange = (e) => {
      const newDataTitle = {
        title: e.target.value, 
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        createdAt: singleData.createdAt
      }
      setSingleData(newDataTitle)

      axios.put(`http://localhost:3001/api/notes/${cn}`, newDataTitle).then( () => fetchData())
    }

      // ToDo:
      // Check for state change or focus - if content changes update content.
      // Store note as markdown or HTML?
      
    return (
      <div>
        {singleData &&
          <div className={`${className}__wrapper`}>
          <ToolBar />
            <div className={`${className}__inner`}>
              <input type="text" className={`${className}__title`} value={singleData.title} placeholder="Title..." onChange={handleChange} />
              {console.log(JSON.stringify(editorState.getCurrentContent()))}

              <Editor editorState={editorState} onChange={changeText} plugins={[createMarkdownShortcutsPlugin()]} />
            </div>
          </div>
        }
        {singleNoteStatus && noteStatus}    
      </div>
    )
}
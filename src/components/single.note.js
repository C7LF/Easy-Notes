import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useGlobalState } from './state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import {stateToHTML} from 'draft-js-export-html';
import {Editor, convertToHTML, EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import ls from 'local-storage'

export const SingleNoteView = ({cn}) => {
    const [singleData, setSingleData] = useState();
    const [data, setData] = useGlobalState('data');
    const [editorState, setEditorState] = React.useState(
      EditorState.createEmpty()
    );

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
      fetchSingleData();
    }, [cn]);

    const deleteNote = () => {
      axios.delete(`http://localhost:3001/api/notes/${cn}`).then(() => fetchData(), setSingleData(null))
    }

    const formattedDate = (nPDate) => {
      const createdDateParsed = new Date(Date.parse(nPDate))
      const day = createdDateParsed.getDate()
      const monthData = createdDateParsed.getMonth()
      const year = createdDateParsed.getFullYear()

      const month = ["January","February","March","April","May","June","July","August","September","October","November","December",];

      const formattedString = day + ' ' + month[monthData] + ' ' + year

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
              <li><FontAwesomeIcon icon={faTrashAlt} className='icon-trash' onClick={() => deleteNote()} /></li>
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
      // Local storage state reload -- Id needs loading on page render
      // Store note as markdown or HTML?
      
    return (
      <div>
        {singleData &&
          <div className={`${className}__wrapper`}>
          <ToolBar />
            <div className={`${className}__inner`}>
              <input type="text" className={`${className}__title`} value={singleData.title} placeholder="Title..." onChange={handleChange} />
              {console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))}
              <Editor editorState={editorState} onChange={changeText} />
            </div>
          </div>
        }     
      </div>
    )
}
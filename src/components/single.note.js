import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useGlobalState } from './state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import {stateToHTML} from 'draft-js-export-html';
import {Editor, convertToHTML, EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';

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
        //setEditorState(EditorState.createWithContent(ContentState.createFromText(JSON.parse(result.data.content))))
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(result.data.content))))
        //setEditorState(EditorState.createWithContent(ContentState.createFromText(result.data.content)))
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
        axios.delete(`http://localhost:3001/api/notes/${cn}`).then(() => fetchData() & setSingleData(null))
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

      const changeText = async (cn) => {
        const result = await axios.put(
          `http://localhost:3001/api/notes/${cn}`, JSON.stringify(convertToRaw(editorState.getCurrentContent())) 
          ).then( result => {setData(result.data)})
      };
      
      // To do:

      // Fix problem with getting content JSON.parse?
      
      return (
        <div>
          {singleData &&
            <div className={`${className}__wrapper`}>
            <ToolBar />
              <div className={`${className}__inner`}>
                <p className={`${className}__title`}>{singleData.title}</p>
                {console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))}

                <Editor editorState={editorState} onChange={setEditorState} />
              </div>
            </div>
          }     
        </div>
      )
}
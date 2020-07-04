import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useGlobalState } from './state';

export const SideBar = () => {
    const [, setData] = useGlobalState('data');

    const newNote = {
      title: "", 
      content: '{"blocks":[{"key":"b11l","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    };

    const newNotePage = async () => 
    await axios.post('http://localhost:3001/api/notes', newNote)
      .then(fetchData())
      .catch(function (error) {
        console.log(error)
      }).then(fetchData())

    const fetchData = async () => 
    await axios('http://localhost:3001/api/notes')
      .then( result => {setData(result.data)})

    return (
        <div className="sidebar">
          <div className='sidebar-container'>
            <FontAwesomeIcon icon={faFile} onClick={() => newNotePage()} size="lg" />
          </div>
        </div>  
    )
}
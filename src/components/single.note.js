import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useGlobalState } from './state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

export const SingleNoteView = ({cn}) => {

    const [singleData, setSingleData] = useState();
    const [data, setData] = useGlobalState('data');

    const className = 'single-note'

    const fetchSingleData = async () => {
      const result = await axios(
        `http://localhost:3001/api/notes/${cn}`
      ).then( result => {
        setSingleData(result.data)
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
      
      return (
        <div>
          {singleData &&
            <div className={`${className}__wrapper`}>
            <ToolBar />
              <div className={`${className}__inner`}>
                <input type="text" className={`${className}__title`} defaultValue={singleData.title} onChange=''/>
                <textarea defaultValue={singleData.content} />
              </div>
            </div>
          }     
        </div>
      )
}
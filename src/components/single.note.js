import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useGlobalState } from './state';

export const SingleNoteView = ({cn}) => {

    const [singleData, setSingleData] = useState();
    const [data, setData] = useGlobalState('data');


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
      
      return (
        <div>
          {singleData &&
            <>
              <p className={`__item-title`}>{singleData.title}</p>
              <p>{singleData.content}</p>
              <div onClick={() => deleteNote()}>x</div>
            </>
          }     
        </div>
      )
}
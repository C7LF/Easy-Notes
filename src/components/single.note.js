import React, {useState, useEffect} from 'react'
import axios from 'axios';

export const SingleNoteView = () => {

    const [singleData, setSingleData] = useState([]);

    const fetchData = async () => {
        const result = await axios(
          'http://localhost:3001/api/notes/5e2b14c46cec9643c4fe1b64',
        ).then( result => {setSingleData(result.singleData)})
      };
    
      useEffect(() => {
        fetchData();
      }, []);
      fetchData();
          return (
              <>
                <div>{singleData}</div>
              </>
          )
}
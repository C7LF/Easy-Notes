import React, {useState, useEffect} from 'react'
import axios from 'axios';

export const SingleNoteView = ({cn}) => {

    const [singleData, setSingleData] = useState();

    const fetchData2 = async () => {
        const result = await axios(
          `http://localhost:3001/api/notes/${cn}`
        ).then( result => {
          setSingleData(result.data)
        })
      };

      useEffect(() => {
        fetchData2();
      }, []);
  
          return (
              <div>
                {console.log(singleData)}
                {singleData && singleData.map(item => (
                  <>
                    <p className={`__item-title`}>{item.title}</p>
                    <p>{item.content}</p>
                  </>
                ))}
              </div>
          )
}
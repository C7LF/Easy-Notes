import React, {useState, useEffect} from 'react'
import axios from 'axios';

export const SingleNoteView = ({cn}) => {

    const [singleData, setSingleData] = useState();

    const fetchData2 = async () => {
        const result = await axios(
          `http://localhost:3001/api/notes/${cn}`
        ).then( result => {
          console.log('test')
          setSingleData(result.data)
        })
      };

      useEffect(() => {
        fetchData2();
      }, [cn]);
          return (
              <div>
                {console.log(singleData)}
                {singleData &&
                  <>
                    <p className={`__item-title`}>{singleData.title}</p>
                    <p>{singleData.content}</p>
                  </>
                }
                
              </div>
          )
}
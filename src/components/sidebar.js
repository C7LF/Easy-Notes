import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { Modal } from './modal'
import axios from 'axios'
import { useGlobalState } from './state';

export const SideBar = () => {
    const [data, setData] = useGlobalState('data');

    const [modal, setModal] = useState(false)
    const [newNote, setNewNote] = useState(
      {title: '', content: ''}
    );

    const modalState = () => !modal ? setModal(true) : setModal(false)

    const newNoteContent = () => {

      const fetchData = async () => {
        const result = await axios(
          'http://localhost:3001/api/notes',
          ).then( result => {setData(result.data)})
      };

      const handleChange = (event) => {
        setNewNote({...newNote, [event.target.name]: event.target.value})
      }
      
      const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/notes', newNote).then(fetchData())
          .catch(function (error) {
              console.log(error)
          }).then(() => fetchData()).then(() => setModal(false))
      }
      
      return (
        <>
          <div className="notes__add-wrapper">
              <div className="notes__bigform">
                <form onSubmit={handleSubmit} className="notes__add-form">
                  <div className="notes__text-inputs">
                    <input type="text" name='title' placeholder="title..." value={newNote.title} onChange={handleChange} />
                    <textarea name='content' placeholder="text..." value={newNote.content} onChange={handleChange} />
                  </div>
                  <div className="notes__button-input">
                    <input type="submit" />
                  </div>
                 </form>
              </div>
            </div>
            </>
      )
    }

    return (
        <div className="sidebar">
            <FontAwesomeIcon icon={faFile} onClick={modalState} />
            <Modal isVisible={modal} content={newNoteContent()}/>
        </div>
        
    )
}
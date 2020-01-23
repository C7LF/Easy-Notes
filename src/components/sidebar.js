import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { Modal } from './modal'
import { newNoteForm } from './new.note.modal.content'

export const SideBar = () => {
    const [modal, setModal] = useState(false)

    const modalState = () => !modal ? setModal(true) : setModal(false)

    return (
        <div className="sidebar">
            <FontAwesomeIcon icon={faFile} onClick={modalState} />
            <Modal isVisible={modal} content='test'/>
        </div>
        
    )
}
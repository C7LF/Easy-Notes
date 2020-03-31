import React from 'react'

export const Modal = ({isVisible, content}) => (
    isVisible ? ( 
        <>
        <div class="overlay">
            <div className="modal">
                {content}
            </div>
        </div>
        </>
     ) : (
        null
    )
)
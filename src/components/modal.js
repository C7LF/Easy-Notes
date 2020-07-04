import React from 'react'

export const Modal = ({isVisible, content}) => (
    isVisible ? ( 
        <>
            <div className="overlay">
                <div className="modal">
                    {content}
                </div>
            </div>
        </>
     ) : (
        null
    )
)
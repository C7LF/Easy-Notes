import React from 'react'

export const Modal = ({isVisible, content}) => (
    isVisible ? (
        <>
            {content}
        </>
    ) : (
        null
    )
)
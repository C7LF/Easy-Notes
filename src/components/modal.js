import React from 'react'

export const Modal = (modal, content) => (
    modal.isVisible ? (
    <h1>{content}</h1>
    ) : (
        null
    )
)
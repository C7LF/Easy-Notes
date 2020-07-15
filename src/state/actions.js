import {
    REQUEST_NOTES_PENDING,
    REQUEST_NOTES_SUCCESS,
    REQUEST_NOTES_FAILED,
    REQUEST_SINGLE_NOTE_FAILED,
    REQUEST_SINGLE_NOTE_PENDING,
    REQUEST_SINGLE_NOTE_SUCCESS
} from './constants'

// Fetch for all notes
export const requestNotes = (token) => (dispatch) => {
    dispatch({ type: REQUEST_NOTES_PENDING })
    fetch('/api/notes', { headers: {
        authorization: token
    }})
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_NOTES_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_NOTES_FAILED, payload: error }))
}

// // Fetch a single note
// export const requestSingleNote = (currentSingleNoteId) => (dispatch) => {
//     dispatch({ type: REQUEST_NOTES_PENDING })
//     fetch(`/api/notes/${currentSingleNoteId}`)
//         .then(res => res.json())
//         .then(data => dispatch({ type: REQUEST_SINGLE_NOTE_SUCCESS, payload: data }))
//         .catch(error => dispatch({ type: REQUEST_SINGLE_NOTE_FAILED, payload: error }))
// }
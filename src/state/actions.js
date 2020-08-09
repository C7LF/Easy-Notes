import {
    REQUEST_NOTES_PENDING,
    REQUEST_NOTES_SUCCESS,
    REQUEST_NOTES_FAILED,
    SET_ACCOUNT_PANE_OPEN,
    GET_NOTE_STATUS
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

export const setAccountPaneIsOpen = accountPaneIsOpen => ({
        type: SET_ACCOUNT_PANE_OPEN,
        payload: accountPaneIsOpen
})

export const setNoteStatus = noteStatus => ({
    type: GET_NOTE_STATUS,
    payload: noteStatus
})
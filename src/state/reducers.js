import {
    REQUEST_NOTES_PENDING,
    REQUEST_NOTES_SUCCESS,
    REQUEST_NOTES_FAILED,
    SET_CURRENT_USER,
    USER_LOADING,
    GET_ERRORS,
    SET_ACCOUNT_PANE_OPEN, 
    GET_NOTE_STATUS
} from './constants'

// Request all notes reducer
const initialStateNotes = {
    isPending: false,
    notes: [],
    error: ''
}

export const requestNotes = (state = initialStateNotes, action = {}) => {
    switch (action.type) {
        case REQUEST_NOTES_PENDING:
            return Object.assign({}, state, { isPending: true })
        case REQUEST_NOTES_SUCCESS:
            return Object.assign({}, state, { notes: action.payload, isPending: false })
        case REQUEST_NOTES_FAILED:
            return Object.assign({}, state, { notes: action.payload, isPending: false })
        default:
            return state
    }
}


// auth users
const isEmpty = require("is-empty")

const initialStateUser = {
    isAuthenticated: false,
    user: {},
    loading: false
}

export const authReducer = (state = initialStateUser, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

// auth error
const initialStateError = {}

export const errorReducer = (state = initialStateError, action) => {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload
        default:
            return state
    }
}

// Account Panel
const initialStateAccountPane = {accountPaneIsOpen: false}

export const accountPaneReducer = (state = initialStateAccountPane, action) => {
    switch(action.type) {
        case SET_ACCOUNT_PANE_OPEN:
            return {...state, accountPaneIsOpen: action.payload}
        default:
            return state
    }
}


// Note Status
const initialStateNoteStatus = null

export const noteStatusReducer = (state = initialStateNoteStatus, action) => {
    switch(action.type) {
        case GET_NOTE_STATUS:
            return action.payload
        default:
            return state
    }
}
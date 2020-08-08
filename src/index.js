import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { requestNotes, authReducer, errorReducer, accountPaneReducer, noteStatusReducer } from './state/reducers';
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./state/authActions";

import jwt_decode from "jwt-decode";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ requestNotes, auth: authReducer, errors: errorReducer, accountPaneIsOpen: accountPaneReducer, noteStatus: noteStatusReducer })

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken
    setAuthToken(token)
    const decoded = jwt_decode(token)
    store.dispatch(setCurrentUser(decoded))

    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser())

        window.location.href = "./auth/login"
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
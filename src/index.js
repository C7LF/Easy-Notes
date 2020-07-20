import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { requestNotes, requestSingleNote, authReducer, errorReducer, accountPaneReducer } from './state/reducers';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./state/authActions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ requestNotes, auth: authReducer, errors: errorReducer, accountPaneIsOpen: accountPaneReducer })

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
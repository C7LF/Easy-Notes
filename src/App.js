import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom'

import NotesWrapper from './components/notes'
import Register from './components/auth/register/register';

import Login from './components/auth/login/login';
import PrivateRoute from './components/auth/private-routes'

import { connect } from 'react-redux'

import './App.scss';

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

function App() {

  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path='/notes' component={NotesWrapper} />
        </Switch>
        <Route path='/auth/register' component={Register} />
        <Route path='/auth/login' component={Login} />
      </Router>
    </>
  )
}

export default connect(mapStateToProps)(App);

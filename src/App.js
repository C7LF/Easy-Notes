import React from 'react';
import './App.scss';
import Main from './components/main.panel'
import { SideBar } from './components/sidebar'
import { RegisterForm } from './components/auth/register';

import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom'

function App() {
  return (
    <>

      <Router>
        <Route path='/notes'>
          <SideBar />
          <Main />
        </Route>
        <Route path='/auth/register' component={RegisterForm} />
      </Router>
    </>
  )
}

export default App;

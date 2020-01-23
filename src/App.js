import React from 'react';
import axios from 'axios';
import './App.css';
import MainFunc from './components/main.panel'
import { SideBar } from './components/sidebar'

function App() {
  return (
    <>
      <SideBar />
      <MainFunc />
    </>
  )
}

export default App;

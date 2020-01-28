import React from 'react';
import axios from 'axios';
import './App.css';
import MainFunc from './components/main.panel'
import { SideBar } from './components/sidebar'
import { SingleNoteView } from './components/single.note'

function App() {
  return (
    <>
      <SideBar />
      <MainFunc />
      <SingleNoteView />
    </>
  )
}

export default App;

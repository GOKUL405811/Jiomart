import React,{useState} from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import './App.css';
import Jionav from './components/Jionav';
import Signin from './components/Signin';
import Grocart from './components/Grocart';
import Electronis from './components/Electronis';
import Homecycle from './components/Homecycle';
import Fashion from './components/Fashion';


function App() {
  return (
    <div className="maindiv1">

      <Router>
          <Routes>
            <Route path="/" element={<Jionav />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Grocart" element={<Grocart/>} />
            <Route path="/Electronis" element={<Electronis/>} />
            <Route path="/Homecycle" element={<Homecycle/>} />
            <Route path="/Fashion" element={<Fashion/>} />
          </Routes>
      </Router>
    </div>
  )
}

export default App

// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
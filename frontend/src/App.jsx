import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Apod from './pages/Apod';
import Mars from './pages/Mars';

function App() {


  return (
 <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Apod />} />
        <Route path="/mars" element={<Mars />} />
      </Routes>
    </Router>
  )
}

export default App

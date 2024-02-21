import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import Calendar from './pages/Calendar';
import Courses from './pages/Courses';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/courses" element={<Courses />} />
        {/* Add more routes as necessary */}
      </Routes>
    </div>
  );
}

export default App;

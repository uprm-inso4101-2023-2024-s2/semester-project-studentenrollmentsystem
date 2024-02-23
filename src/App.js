import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import Calendar from './pages/Calendar';
import FilterTest from './pages/FilterTest';
import OfferedCourses from './pages/OfferedCourses';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/filter-test" element={<FilterTest />} />
        <Route path="/offered-courses" element={<OfferedCourses />} />
        {/* Add more routes as necessary */}
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import StudentPage from './pages/studentPage'
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import Calendar from './pages/Calendar';
import FilterTest from './pages/FilterTest';
import OfferedCourses from './pages/OfferedCourses';
import SignUp from './pages/SignUp';
import LoginPage from './pages/Login';
import DummyDataMaker from './data/dummydata/DummyDataMaker';

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/studentpage" element={<StudentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/filter-test" element={<FilterTest />} />
        <Route path="/offered-courses" element={<OfferedCourses />} />
        <Route path="/dummy-data-maker" element={<DummyDataMaker />} />
        {/* Add more routes as necessary */}
      </Routes>
    </div>
  );
}

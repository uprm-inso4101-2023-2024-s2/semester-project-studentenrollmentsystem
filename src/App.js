import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import StudentPage from './pages/studentPage'
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import Calendar from './pages/Calendar';
import SignUp from './pages/SignUp';
import LoginPage from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/studentpage" element={<StudentPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes as necessary */}
      </Routes>
    </div>
  );
}

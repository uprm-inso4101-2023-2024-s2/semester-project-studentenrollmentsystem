import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import Calendar from './pages/Calendar';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />}/>
        {/* Add more routes as necessary */}
      </Routes>
    </div>
  );
}

export default App;

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
import ProfessorReview from './pages/ProfessorReview';
import FreeElectivesPage from './pages/FreeElectives';
import FreeElectives from './pages/FreeElectives';
import Footer from './components/footer';
import DummyDataMaker from './data/dummy_data/DummyDataMaker/DummyDataMaker';
import AcademicProgress from './pages/AcademicProgress';
import ForgotPassword from './pages/ForgotPassword';

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
        <Route path="/filter-test" element={<FilterTest />} />
        <Route path="/offered-courses" element={<OfferedCourses />} />
        <Route path="/professor-info" element={<ProfessorReview />} />
        <Route path= "/forgotPass" element={<ForgotPassword/>}/>
        <Route path="/free-electives" element={<FreeElectives />} />
        <Route path="/studentpage/academic-progress" element={<AcademicProgress />} />

        {/* Add more routes as necessary */}
      </Routes>
      <Footer/>
    </div>
  );
} 

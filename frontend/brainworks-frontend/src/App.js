// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';
import Analysis from './components/Analysis';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import './components/fonts/aileron/aileron.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Onboarding />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<Main />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/patient-list" element={<PatientList />} />
                <Route path="/patient-details" element={<PatientDetails />} />

            </Routes>
        </Router>
    );
}

export default App;

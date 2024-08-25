// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import Login from './components/Login'; // Login 컴포넌트 임포트

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Onboarding />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} /> {/* Login 컴포넌트를 렌더링 */}
            </Routes>
        </Router>
    );
}

export default App;

// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Onboarding />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<Main />} /> {/* 메인 화면 경로 추가 */}
            </Routes>
        </Router>
    );
}

export default App;

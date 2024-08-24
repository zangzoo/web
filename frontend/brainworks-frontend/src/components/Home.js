// src/components/Home.js

import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src="/brainlogo.png" alt="Logo" className="logo" /> {/* 아이콘 추가 */}
                    <h1>BrainWorks</h1>
                </div>
                <div className="navbar-right">
                    <a href="/home">Home</a>
                    <a href="/login">Login</a>
                </div>
            </nav>
            <div className="content">
                <h2>Welcome to BrainWorks</h2>
                <p>This is the home screen of your application.</p>
            </div>
        </div>
    );
}

export default Home;

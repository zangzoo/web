// src/components/Home.js
import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src="/brainlogo.png" alt="Logo" className="logo" />
                    <h1>BrainWorks</h1>
                </div>
                <div className="navbar-right">
                    <a href="/home">Home</a>
                    <a href="/login">Login</a>
                </div>
            </nav>
            <div className="header-content-container">
                <div className="header-background"></div>
                <div className="content">
                    <div className="scroll-text">
                        <p className="Welcome">Welcome</p>
                        <p>I'm <span className="brainworks">BrainWorks</span>, your personal assistant.</p>
                        <p>I specialize in diagnosing <span className="alzheimers">Alzheimer's disease</span>.</p>
                        <p>Please log in to use!</p>
                        <p>Please register or log in to access your account.</p>
                    </div>
                    <button className="login-button" onClick={() => window.location.href = '/login'}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;

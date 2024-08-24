// src/components/Home.js
import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <div className="header-background"></div>
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
            <div className="content">
                <div className="scroll-text">
                    <p>Hello</p>
                    <p>I'm BrainWork, your personal assistant.</p>
                    <p>I specialize in diagnosing Alzheimer's disease.</p>
                    <p>Please log in to use!</p>
                    <p>Please register or log in to access your account.</p>
                </div>
                <button className="login-button" onClick={() => window.location.href = '/login'}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Home;

// src/components/Home.js
import React, { useEffect } from 'react';
import './Home.css';

function Home() {

    useEffect(() => {
        const handleScroll = () => {
            const headerBackground = document.querySelector('.header-background');
            const content = document.querySelector('.content');
            if (window.scrollY > 50) {
                headerBackground.classList.add('scaled');
                content.style.marginTop = '860px';
            } else {
                headerBackground.classList.remove('scaled');
                content.style.marginTop = '720px';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            <div className="header-background"></div>
            <div className="content">
                <div className="scroll-text">
                    <p className="Welcome">Hello</p>
                    <p>I'm <span className="brainworks">BrainWorks<img src="/brainlogo.png" alt="Logo" /></span>, your personal assistant.</p>
                    <p>I specialize in diagnosing <span className="alzheimers">Alzheimer's disease</span>.</p>
                    <p>Please log in to use!</p>
                    <p className="small-text">Please register or log in to access your account.</p>
                </div>
                <button className="login-button" onClick={() => window.location.href = '/login'}>
                    Let's get Started!
                </button>
            </div>
        </div>
    );
}

export default Home;


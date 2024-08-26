import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
    const [isScaled, setIsScaled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScaled(window.scrollY > 50);
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

            <div className={`header-image-container ${isScaled ? 'scaled' : ''}`}>
                <img src="./humanbrain.jpg" alt="Header Image" className="header-image" />
                <div className="header-text">Welcome to BrainWorks!</div>
            </div>

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

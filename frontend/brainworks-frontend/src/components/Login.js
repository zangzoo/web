// src/components/Login.js
import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="login-container">
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
            <div className="login-form">
                <img src="/brainlogo.png" alt="Logo" className="login-logo" />
                <h2>Brain Works</h2>
                <input type="text" placeholder="아이디" className="login-input" />
                <input type="password" placeholder="비밀번호" className="login-input" />
                <div className="options">
                    <label>
                        <input type="checkbox" /> 로그인 정보 저장
                    </label>
                </div>
                <div className="login-buttons">
                    <button className="option-button">아이디 찾기</button>
                    <button className="option-button">회원가입</button>
                </div>
                <button className="login-button">Login</button>
            </div>
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // 예시로 하드코딩된 아이디와 비밀번호 설정
        const hardcodedUsername = 'admin';
        const hardcodedPassword = '1234';

        // 로그인 검증 로직
        if (username === hardcodedUsername && password === hardcodedPassword) {
            navigate('/main');
        } else {
            alert('Invalid username or password');
        }
    };

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
                <input
                    type="text"
                    placeholder="아이디"
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="options">
                    <label>
                        <input type="checkbox" /> 로그인 정보 저장
                    </label>
                </div>
                <div className="login-buttons">
                    <button className="option-button">아이디 찾기</button>
                    <button className="option-button">회원가입</button>
                </div>
                <button className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
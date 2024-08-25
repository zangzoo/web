// src/components/Main.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = () => {
        if (selectedFile) {
            // 파일 업로드 로직 추가 (필요에 따라)
            navigate('/analysis');
        } else {
            alert('Please select an image.');
        }
    };

    return (
        <div className="main-container">
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

            <div className="header-image-container">
                <img src="/Analysis.png" alt="Header Image" className="header-image" />
                <div className="header-text">
                    <h1>Analysis</h1>
                </div>
            </div>

            <div className="upload-section">
                <h2>Upload MRI Scan for Alzheimer's Detection</h2>
                <form>
                    <label htmlFor="file-upload" className="file-upload-label">
                        Upload Image:
                    </label>
                    <input type="file" id="file-upload" name="file-upload" />
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Main;

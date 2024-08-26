import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(""); // 환자 선택 state 추가
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    const handlePatientChange = (event) => {
        setSelectedPatient(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedPatient && selectedFile) {
            navigate('/analysis');
        } else {
            alert('Please select a patient and an image.');
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
                <div className="header-text">Analysis</div>
            </div>

            <div className="upload-section">
                <h2>Upload an Image for Alzheimer's Prediction</h2>
                <form>
                    <label htmlFor="patient-select" className="file-upload-label">
                        Select Patient:
                    </label>
                    <select
                        id="patient-select"
                        value={selectedPatient}
                        onChange={handlePatientChange}
                        className="patient-select"
                    >
                        <option value="">Please select a patient.</option>
                        <option value="song yeogyeong">song yeogyeong</option>
                        <option value="김새드">김새드</option>
                        <option value="김해피">김해피</option>
                        <option value="김맥주">김맥주</option>
                        <option value="김술잔">김술잔</option>
                        <option value="김애플">김애플</option>

                        {/* 환자 목록을 이곳에 추가 */}
                    </select>

                    <label htmlFor="file-upload" className="file-upload-label">
                        Upload Image:
                    </label>
                    <input type="file" id="file-upload" name="file-upload" onChange={handleFileChange} />
                </form>
                {previewUrl && (
                    <div className="image-preview">
                        <h3>Selected Image:</h3>
                        <img src={previewUrl} alt="Selected file" />
                    </div>
                )}
                <button type="button" className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Main;

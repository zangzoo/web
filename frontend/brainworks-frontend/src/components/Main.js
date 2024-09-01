import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import Loading from './Loading';

function Main() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();

    // Mock userId
    const userId = "Dr.Yeogyeong";

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file.name);

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
            setIsLoading(true);
            setTimeout(() => {
                navigate('/analysis', { state: { selectedPatient, selectedFile, previewUrl, userId } });
            }, 10000);
        } else {
            alert('Please select a patient and an image.');
        }
    };

    if (isLoading) {
        return <Loading patientName={selectedPatient} fileName={fileName} />;
    }

    return (
        <div className="main-container">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src="/brainlogo.png" alt="Logo" className="logo" />
                    <h1>BrainWorks</h1>
                </div>
                <div className="navbar-right">
                    <a href="/home">Home</a>
                    <span className="user-id">{userId}</span>
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
                        <option value="Han IUM">Han, IUM</option>
                        <option value="moon soyeon">moon soyeon</option>
                        <option value="jang jiwoo">jang jiwoo</option>
                        <option value="jo chaeeun">jo chaeeun</option>

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

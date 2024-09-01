import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import Loading from './Loading';

function Main() {
    const [selectedFiles, setSelectedFiles] = useState([null, null]);
    const [previewUrls, setPreviewUrls] = useState([null, null]);
    const [selectedPatient, setSelectedPatient] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [fileNames, setFileNames] = useState(["", ""]);
    const navigate = useNavigate();

    // Mock userId
    const userId = "Dr.Yeogyeong";

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        let newSelectedFiles = [...selectedFiles];
        let newFileNames = [...fileNames];
        let newPreviewUrls = [...previewUrls];

        newSelectedFiles[index] = file;
        newFileNames[index] = file.name;

        setSelectedFiles(newSelectedFiles);
        setFileNames(newFileNames);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviewUrls[index] = reader.result;
                setPreviewUrls(newPreviewUrls);
            };
            reader.readAsDataURL(file);
        } else {
            newPreviewUrls[index] = null;
            setPreviewUrls(newPreviewUrls);
        }
    };

    const handlePatientChange = (event) => {
        setSelectedPatient(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedPatient && selectedFiles[0] && selectedFiles[1]) {
            setIsLoading(true);
            setTimeout(() => {
                navigate('/analysis', { state: { selectedPatient, selectedFiles, previewUrls, userId, isNewUpload: true } });
            }, 10000);
        } else {
            alert('Please select a patient and two images.');
        }
    };

    if (isLoading) {
        return <Loading patientName={selectedPatient} fileName={fileNames.join(", ")} />;
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
                <h2>Upload Images for Alzheimer's Prediction</h2>
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
                        <option value="Moon Soyeon">Moon Soyeon</option>
                        <option value="Jang Jiwoo">Jang Jiwoo</option>
                        <option value="Jo Chaeeun">Jo Chaeeun</option>
                    </select>

                    {[0, 1].map(index => (
                        <div key={index}>
                            <label htmlFor={`file-upload-${index}`} className="file-upload-label">
                                Upload Image {index + 1}:
                            </label>
                            <input
                                type="file"
                                id={`file-upload-${index}`}
                                name={`file-upload-${index}`}
                                onChange={(event) => handleFileChange(event, index)}
                            />
                        </div>
                    ))}
                </form>
                {previewUrls[0] && (
                    <div className="image-preview">
                        <h3>Selected Image 1:</h3>
                        <img src={previewUrls[0]} alt="Selected file 1" />
                    </div>
                )}
                {previewUrls[1] && (
                    <div className="image-preview">
                        <h3>Selected Image 2:</h3>
                        <img src={previewUrls[1]} alt="Selected file 2" />
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

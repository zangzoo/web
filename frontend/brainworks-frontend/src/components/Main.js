import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
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

    const handleSubmit = () => {
        if (selectedFile) {
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
                <div className="header-text">Analysis</div>
            </div>

            <div className="upload-section">
                <h2>Upload MRI Scan for Alzheimer's Detection</h2>
                <form>
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

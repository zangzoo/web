import React from 'react';
import { useLocation } from 'react-router-dom';
import './Analysis.css';

function Analysis() {
    const location = useLocation();
    console.log('Received location.state:', location.state);
    const { selectedPatient, selectedFile, previewUrl, userId } = location.state || {};

    return (
        <div className="analysis-container">
            <header className="analysis-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                </div>
                <div className="user-info">
                    <button className="report-button">Download Report</button>
                    <span className="user-id">{userId}</span> {/* 여기에 userId를 추가 */}
                    <button className="logout-button">Logout</button>
                </div>
            </header>
            <main className="analysis-content">
                <section className="patient-info">
                    <h2>Patient Information</h2>
                    <p>ID: 12345</p>
                    <p>Name: {selectedPatient}</p>
                    <p>Department: Internal Medicine</p>
                    <p>Date: 2023-07-12</p>
                    <p>Diagnosis: Hypertension</p>
                </section>
                <section className="image-display">
                    <h2>MRI Scan</h2>
                    {previewUrl ? (
                        <img src={previewUrl} alt="MRI Scan" />
                    ) : (
                        <p>No image selected.</p>
                    )}
                </section>
                <section className="analysis-results">
                    <h2>Analysis Results</h2>
                    <p>Description: Non_Demented</p>
                    <p>Confidence: 0.7813544273376465</p>
                </section>
            </main>
        </div>
    );
}

export default Analysis;

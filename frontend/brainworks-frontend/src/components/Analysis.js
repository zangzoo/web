import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Analysis.css';

function Analysis() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPatient, selectedFile, previewUrl, userId } = location.state || {};

    const mriRecords = [
        { id: 1, date: '2022-06-15', description: 'MRI Scan 1', imageUrl: '/mri_scan1.gif' },
        { id: 2, date: '2023-07-01', description: 'MRI Scan 2', imageUrl: '/mri_scan2.gif' },
        { id: 3, date: '2024-08-10', description: 'MRI Scan 3', imageUrl: '/mri_scan3.gif' }
    ];

    const [currentImageUrl, setCurrentImageUrl] = useState(previewUrl);

    const handleRecordClick = (record) => {
        // Set the current image to the one associated with the clicked record
        setCurrentImageUrl(record.imageUrl);
    };

    return (
        <div className="analysis-container">
            <header className="analysis-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                    <button className="history-button">History</button>
                </div>
                <div className="user-info">
                    <button className="report-button">Download Report</button>
                    <span className="user-id">{userId}</span>
                    <button className="logout-button">Logout</button>
                </div>
            </header>
            <main className="analysis-content">
                <div className="left-panel">
                    <section className="patient-info">
                        <h2>Patient Information</h2>
                        <p>ID: 12345</p>
                        <p>Name: {selectedPatient}</p>
                        <p>Department: Internal Medicine</p>
                        <p>Date: 2023-07-12</p>
                        <p>Diagnosis: Hypertension</p>
                    </section>
                    <section className="mri-records">
                        <h2>Previous MRI Records</h2>
                        <ul>
                            {mriRecords.map(record => (
                                <li key={record.id} onClick={() => handleRecordClick(record)}>
                                    {record.date}: {record.description}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div className="right-panel">
                    <section className="image-display">
                        <h2>MRI Scan</h2>
                        {currentImageUrl ? (
                            <img src={currentImageUrl} alt="MRI Scan" />
                        ) : (
                            <p>No image selected.</p>
                        )}
                    </section>
                    <section className="analysis-results">
                        <h2>Analysis Results</h2>
                        <p>Description: Non_Demented</p>
                        <p>Confidence: 0.7813544273376465</p>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Analysis;

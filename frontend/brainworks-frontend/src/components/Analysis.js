import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Analysis.css';
import Modal from './Modal';

function Analysis() {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPatient, selectedFile, previewUrl, userId } = location.state || {};

    const handleLogout = () => {
        setShowModal(true);
    };

    const handleConfirmLogout = () => {
        setShowModal(false);
        navigate('/home');
    };

    const handleCancelLogout = () => {
        setShowModal(false);
    };

    const mriRecords = [
        { id: 1, date: '2023-06-15', description: 'MRI Scan 1', image: '/mri_scan1.gif' },
        { id: 2, date: '2023-07-01', description: 'MRI Scan 2', image: '/mri_scan2.gif' },
        { id: 3, date: '2023-08-10', description: 'MRI Scan 3', image: '/mri_scan3.gif' }
    ];

    const handleRecordClick = (record) => {
        navigate('/analysis', { state: { selectedPatient, previewUrl: record.image, userId } });
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
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <main className="analysis-content">
                <section className="left-panel">
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
                </section>

                <section className="right-panel">
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
                </section>
            </main>
            <Modal
                show={showModal}
                message="Are you sure you want to sign out?"
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
            />
        </div>
    );
}

export default Analysis;

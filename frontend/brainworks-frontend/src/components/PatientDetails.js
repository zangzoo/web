import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import './PatientDetails.css';

function PatientDetails() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const patient = {
        name: 'HAN, IUM',
        id: '2408271',
        age: '72 yr',
        gender: 'Female',
        birthdate: '1953.03.27',
        image: 'patient1.png',
    };

    const aiReports = [
        { id: 1, diagnosis: 'Alzheimer’s Disease', accuracy: '0.96' },
        { id: 2, diagnosis: 'Mild_Demented', accuracy: '0.64' },
        { id: 3, diagnosis: 'Mild_Demented', accuracy: '0.64' },
        { id: 4, diagnosis: 'Moderate_Demented', accuracy: '0.87' },
    ];

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

    return (
        <div className="patient-details-container">
            <header className="analysis-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                </div>
                <div className="user-info">
                    <span className="user-id">Dr. Yeogyeong</span>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <div className="patient-details-content">
                <h1 className="patient-details-header">{patient.name}'s Medical Record</h1>
                <div className="patients-info">
                    <img src={patient.image} alt={patient.name} className="patient-image"/>
                    <div>
                        <h2>{patient.name}</h2>
                        <p>Patient ID: {patient.id}</p>
                        <p>Age: {patient.age}</p>
                        <p>Gender: {patient.gender}</p>
                        <p>Date of Birth: {patient.birthdate}</p>
                    </div>
                </div>
                <div className="diagnose-button-container">
                    <button
                        className="diagnose-button"
                        onClick={() => navigate('/main')}
                    >
                        Start AI Diagnosis
                    </button>
                </div>
                <div className="ai-report-container">
                    <h3>AI Report:</h3>
                    {aiReports.map(report => (
                        <div key={report.id} className="ai-report-item">
                            <p>Diagnosis: {report.diagnosis}</p>
                            <p>Probability: {report.accuracy}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                show={showModal}
                message="Are you sure you want to log out?"
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
            />
        </div>
    );
}

export default PatientDetails;

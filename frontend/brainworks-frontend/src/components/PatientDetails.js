import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PatientDetails.css';  // 필요한 스타일을 적용합니다.

function PatientDetails() {
    const location = useLocation();
    const patient = location.state?.patient || {
        name: 'Unknown',
        image: '/default-image.png',
        lastVisit: 'N/A',
        diagnosis: 'N/A',
    };
    const navigate = useNavigate();

    const handleDiagnoseClick = () => {
        navigate('/main');
    };

    return (
        <div className="patient-details-container">
            <header className="analysis-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                </div>
                <div className="user-info">
                    <span className="user-id">Dr.David</span>
                    <button className="logout-button" onClick={() => navigate('/home')}>Logout</button>
                </div>
            </header>
            <div className="patient-details-content">
                <h1 className="patient-details-header">{patient.name}'s Medical Record</h1>
                <div className="patient-info">
                    <img src={patient.image} alt={patient.name} />
                    <div>
                        <h2>{patient.name}</h2>
                        <p>Date of Birth: 2024.08.06 (Age 45)</p>
                        <p>Last Visit: {patient.lastVisit}</p>
                        <p className="risk-group">Risk Group: {patient.diagnosis}</p>
                    </div>
                </div>
                <div className="diagnose-button-container">
                    <button className="diagnose-button" onClick={handleDiagnoseClick}>
                        Start AI Diagnosis
                    </button>
                </div>
                <div className="ai-report-container">
                    <h3>AI Report:</h3>
                    <p>Diagnosis: <span>Pending...</span></p>
                    <p>Probability: <span>Pending...</span></p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="patient-details-container">
            <header className="analysis-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                </div>
                <div className="user-info">
                    <span className="user-id">Dr.David</span>
                    <button className="logout-button" onClick={() => navigate('/home')}>Logout</button>
                </div>
            </header>
            <div className="patient-details-content">
                <h1 className="patient-details-header">{patient.name}'s Medical Record</h1>
                <div className="patient-info">
                    <img src={patient.image} alt={patient.name} />
                    <div>
                        <h2>{patient.name}</h2>
                        <p>Date of Birth: 2024.08.06 (Age 45)</p>
                        <p>Last Visit: {patient.lastVisit}</p>
                        <p className="risk-group">Risk Group: {patient.diagnosis}</p>
                    </div>
                </div>
                <div className="diagnose-button-container">
                    <button className="diagnose-button" onClick={handleDiagnoseClick}>
                        Start AI Diagnosis
                    </button>
                </div>
                <div className="ai-report-container">
                    <h3>AI Report:</h3>
                    <p>Diagnosis: <span>Pending...</span></p>
                    <p>Probability: <span>Pending...</span></p>
                </div>
            </div>
        </div>
    );
}

export default PatientDetails;

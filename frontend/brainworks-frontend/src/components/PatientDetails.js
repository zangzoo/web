import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PatientDetails() {
    const location = useLocation();
    const { patient } = location.state;
    const navigate = useNavigate();

    const handleDiagnoseClick = () => {
        navigate('/main');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
            <h1 style={{ textAlign: 'center' }}>Patient's Medical Record</h1>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src={patient.image} alt={patient.name} style={{ borderRadius: '50%', width: '100px', height: '100px', marginRight: '20px' }} />
                <div>
                    <h2>{patient.name}</h2>
                    <p>Date of Birth: 2024.08.06 (Age 45)</p>
                    <p>Last Visit: {patient.lastVisit}</p>
                    <p style={{ color: 'blue' }}>Risk Group: {patient.diagnosis}</p>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={handleDiagnoseClick} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Start AI Diagnosis
                </button>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>AI Report:</h3>
                <p>Diagnosis: <span style={{ color: '#888' }}>Pending...</span></p>
                <p>Probability: <span style={{ color: '#888' }}>Pending...</span></p>
            </div>
        </div>
    );
}

export default PatientDetails;

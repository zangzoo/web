import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Analysis.css';  // Analysis.css를 사용하여 동일한 헤더 스타일 적용

function PatientDetails() {
    const location = useLocation();
    const { patient } = location.state;
    const navigate = useNavigate();
    const { userId } = location.state || {}; // 로그인된 유저 정보

    const handleDiagnoseClick = () => {
        navigate('/main');
    };

    const handleLogout = () => {
        navigate('/login');
    };

    // 환자 목록 화면으로 이동하는 함수
    const handlePatientListClick = () => {
        navigate('/patient-list', {
            state: { userId } // 유저 정보를 환자 목록 페이지로 전달
        });
    };

    return (
        <div className="patient-details-container">
            {/* Header (Analysis와 동일한 헤더 스타일 적용) */}
            <header className="analysis-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                    <button className="patient-list-button" onClick={handlePatientListClick}>Patient List</button>
                </div>
                <div className="user-info">
                    <span className="user-id">{userId}</span>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            {/* Patient Details (나머지 부분은 기존의 PatientDetails 스타일 유지) */}
            <main className="patient-details-content">
                <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
                    <h1 style={{ textAlign: 'center' }}>{patient.name}'s Medical Record</h1>
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
            </main>
        </div>
    );
}

export default PatientDetails;

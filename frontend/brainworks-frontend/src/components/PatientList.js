import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientList.css';
import Modal from './Modal'; // 모달 컴포넌트 임포트

function PatientList() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // 모달 표시 상태 관리

    // Mock patient data
    const patients = [
        { id: 1, name: 'Sarang', image: 'patient1.png', lastVisit: '2024.08.23', progress: '55%', diagnosis: 'Mild Cognitive Impairment' },
        { id: 2, name: 'James', image: 'patient2.png', lastVisit: '2024.08.23', progress: '15%', diagnosis: 'Alzheimer\'s disease' },
        { id: 3, name: 'Pill', image: 'patient3.png', lastVisit: '2024.08.06', progress: '95%', diagnosis: 'Mild Cognitive Impairment' },
        { id: 4, name: 'Cloud', image: 'patient4.png', lastVisit: '2024.08.01', progress: '60%', diagnosis: 'Mild Cognitive Impairment' },
    ];

    const handlePatientClick = (patient) => {
        // Navigate to detailed patient information screen
        navigate('/patient-details', { state: { patient } });
    };

    const handleHomeClick = () => {
        navigate('/main');  // Main 화면으로 이동
    };

    const handleLogoutClick = () => {
        setShowModal(true); // 로그아웃 버튼 클릭 시 모달 표시
    };

    const handleConfirmLogout = () => {
        setShowModal(false);
        navigate('/home');  // 확인 버튼 클릭 시 Home 화면으로 이동
    };

    const handleCancelLogout = () => {
        setShowModal(false); // 취소 버튼 클릭 시 모달 닫기
    };

    return (
        <div className="patient-list-container">
            <header className="patient-list-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                </div>
                <div className="user-info">
                    <span className="user-id">Dr. David</span>
                    <button className="home-button" onClick={handleHomeClick}>Home</button>
                    <button className="logout-button" onClick={handleLogoutClick}>Logout</button> {/* 로그아웃 클릭 시 모달 표시 */}
                </div>
            </header>

            <main className="patient-list-content">
                <h2>Records</h2>
                <div className="search-bar">
                    <input type="text" placeholder="Patient Name Search" />
                    <button>Search</button>
                </div>
                <table className="patient-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Recent Visit</th>
                            <th>treatment progress</th>
                            <th>risk group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient.id} onClick={() => handlePatientClick(patient)}>
                                <td>
                                    <img src={patient.image} alt={patient.name} className="patient-image" />
                                    {patient.name}
                                </td>
                                <td>{patient.lastVisit}</td>
                                <td>{patient.progress}</td>
                                <td>{patient.diagnosis}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            <Modal
                show={showModal}
                message="Are you sure you want to log out?"
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
            />
        </div>
    );
}

export default PatientList;

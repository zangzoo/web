import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientList.css';
import Modal from './Modal';

function PatientList() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock patient data
    const patients = [
        { id: 1, name: 'Han, IUM', image: 'patient1.png', lastVisit: '2024.09.02', progress: '45%', diagnosis: 'Alzheimer’s Disease' },
        { id: 2, name: 'Moon, Soyeon', image: 'patient2.png', lastVisit: '2024.08.23', progress: '60%', diagnosis: 'Alzheimer\'s Disease' },
        { id: 3, name: 'Jang, Jiwoo', image: 'patient3.png', lastVisit: '2024.08.06', progress: '85%', diagnosis: 'Mild_Demented' },
        { id: 4, name: 'Cho, Chaeeun', image: 'patient4.png', lastVisit: '2024.04.01', progress: '60%', diagnosis: 'Moderate_Demented' },
    ];

    const handlePatientClick = (patient) => {
        navigate('/patient-details', { state: { patient } });
    };

    const handleHomeClick = () => {
        navigate('/main');
    };

    const handleLogoutClick = () => {
        setShowModal(true);
    };

    const handleConfirmLogout = () => {
        setShowModal(false);
        navigate('/home');
    };

    const handleCancelLogout = () => {
        setShowModal(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="patient-list-container">
            <header className="patient-list-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                </div>
                <div className="user-info">
                    <span className="user-id">Dr. Yeogyeong</span>
                    <button className="home-button" onClick={handleHomeClick}>Home</button>
                    <button className="logout-button" onClick={handleLogoutClick}>Logout</button> {/* 로그아웃 클릭 시 모달 표시 */}
                </div>
            </header>

            <main className="patient-list-content">
                <h2>Records</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Patient Name Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button>Search</button>
                </div>
                <table className="patient-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Recent Visit</th>
                            <th>Treatment Progress</th>
                            <th>Risk Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map(patient => (
                            <tr key={patient.id} onClick={() => handlePatientClick(patient)}>
                                <td className="name-column">
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

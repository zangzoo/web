import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientList.css';

function PatientList() {
    const navigate = useNavigate();

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

    return (
        <div className="patient-list-container">
            <header className="patient-list-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                </div>
                <div className="user-info">
                    <span className="user-id">Dr. David</span>
                    <button className="logout-button">Logout</button>
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
                            <th>이름</th>
                            <th>최근 진료 날짜</th>
                            <th>치료 진행도</th>
                            <th>위험군</th>
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
        </div>
    );
}

export default PatientList;

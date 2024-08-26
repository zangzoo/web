import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function PatientList() {
    const location = useLocation();
    const { userId } = location.state || {};
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Example: fetch(`/api/patients?doctorId=${userId}`)
        const mockPatients = [
            { id: 1, name: 'Patient 1', age: 60, diagnosis: 'Hypertension' },
            { id: 2, name: 'Patient 2', age: 70, diagnosis: 'Diabetes' },
            { id: 3, name: 'Patient 3', age: 65, diagnosis: 'Alzheimer' },
        ];
        setPatients(mockPatients);
    }, [userId]);

    return (
        <div>
            <h1>Patient List</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        {patient.name} - {patient.diagnosis}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PatientList;

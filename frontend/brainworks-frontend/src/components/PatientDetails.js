import React from 'react';
import { useLocation } from 'react-router-dom';

function PatientDetails() {
    const location = useLocation();
    const { patient } = location.state;

    return (
        <div>
            <h1>{patient.name} - 상세 정보</h1>
            {/* Display more detailed information about the patient */}
        </div>
    );
}

export default PatientDetails;

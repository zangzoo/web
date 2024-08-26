// Loading.js
import React from 'react';
import './Loading.css';

function Loading({ patientName, fileName }) {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>
                BrainWorks is analyzing based on
                <span className="patient-name"> {patientName}’s</span>
                <span className="file-name"> {fileName}</span>.
            </p>
        </div>
    );
}

export default Loading;

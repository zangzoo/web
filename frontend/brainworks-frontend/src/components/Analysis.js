import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import './Analysis.css';
import Modal from './Modal';
import './Font/Font.css';

function Analysis() {
    const [showModal, setShowModal] = useState(false);
    const [mriRecords, setMriRecords] = useState([
        {
            id: 1,
            date: '01-Sep-2024',
            description: 'MRI Scan 4',
            images: ['/0076_MRI_mpr-1_anon_sag_67.gif', '/0076_MRI_mpr-2_anon_sag_66.gif'],
            analysis: { description: 'Alzheimer’s Disease', accuracy: 0.9634178346327 },
            radiologistComment: "Based on the MRI findings and the patient's clinical symptoms, a diagnosis of Alzheimer's disease is strongly suggested.\nThe observed hippocampal and temporal lobe atrophy, ventricular enlargement, and white matter changes are consistent with typical imaging findings of Alzheimer's disease.\nTherefore, the patient is likely suffering from Alzheimer's disease, and further neuropsychological testing and treatment planning are recommended.",
            physicianComment: ""
        },
        {
            id: 2,
            date: '07-Feb-2024',
            description: 'MRI Scan 3',
            images: ['/mri_scan2.gif', '/mri_scan3.gif'],
            analysis: { description: 'Mild_Demented', accuracy: 0.6423453487357645 },
            radiologistComment: "Mild hippocampal atrophy observed, consistent with Mild Dementia.",
            physicianComment: "Recommend close monitoring and possible early intervention."
        },
        {
            id: 3,
            date: '07-Feb-2024',
            description: 'MRI Scan 2',
            images: ['/mri_scan2.gif', '/mri_scan3.gif'],
            analysis: { description: 'Mild_Demented', accuracy: 0.6423453487357645 },
            radiologistComment: "Mild hippocampal atrophy observed, consistent with Mild Dementia.",
            physicianComment: "Recommend close monitoring and possible early intervention."
        },
        {
            id: 4,
            date: '01-Aug-2023',
            description: 'MRI Scan 1',
            images: ['/mri_scan3.gif', '/mri_scan1.gif'],
            analysis: { description: 'Moderate_Demented', accuracy: 0.8712434532837645 },
            radiologistComment: "Upon analyzing the MRI results, there is clear evidence of Alzheimer’s disease progression. The scans reveal marked atrophy in the medial temporal lobes including the entorhinal cortex. The presence of diffuse cortical atrophy and prominent sulcal widening are also consistent with this diagnosis. Given these imaging findings and the patient’s cognitive decline, it is recommended to initiate a thorough evaluation with neuropsychological tests to assess the extent of impairment. Early intervention strategies and treatment planning should be considered to manage the disease effectively.",
            physicianComment: "Based on the medical examination results, memory decline and cognitive impairment were additionally observed; \n Neuropsychological testing is recommended to further assess the presence of Alzheimer's disease."
        }
    ]);

    const [selectedAnalysis, setSelectedAnalysis] = useState(mriRecords[0].analysis);
    const [selectedImages, setSelectedImages] = useState(mriRecords[0].images);
    const [selectedDate, setSelectedDate] = useState(mriRecords[0].date);
    const [selectedRadiologistComment, setSelectedRadiologistComment] = useState(mriRecords[0].radiologistComment);
    const [physicianComment, setPhysicianComment] = useState(mriRecords[0].physicianComment);
    const [selectedDateValue, setSelectedDateValue] = useState(new Date());
    const [isEditing, setIsEditing] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPatient, userId } = location.state || {};

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options).replace(/ /g, '-');
    };

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

    const handleRecordClick = (record) => {
        setSelectedAnalysis(record.analysis);
        setSelectedImages(record.images);
        setSelectedDate(record.date);
        setSelectedRadiologistComment(record.radiologistComment);
        setPhysicianComment(record.physicianComment);
        setSelectedDateValue(new Date(record.date));
    };

    const handleSave = () => {
        setIsEditing(false);
        const newRecord = {
            id: mriRecords.length + 1,
            date: formatDate(new Date()),
            description: `MRI Scan ${mriRecords.length + 1}`,
            images: selectedImages,
            analysis: selectedAnalysis,
            radiologistComment: selectedRadiologistComment,
            physicianComment: physicianComment
        };
        setMriRecords([newRecord, ...mriRecords]);
    };

    const handleCancel = () => {
        navigate('/main');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    // tileClassName 함수 정의
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            return mriRecords.some(record => record.date === formatDate(date)) ? 'highlighted-tile' : null;
        }
        return null;
    };

    const handleDateChange = (date) => {
        setSelectedDateValue(date);
        const matchingRecord = mriRecords.find(record => record.date === formatDate(date));
        if (matchingRecord) {
            handleRecordClick(matchingRecord);
        }
    };

    const handlePatientListClick = () => {
        navigate('/patient-list', {
            state: { userId }
        });
    };

    return (
        <div className="analysis-container">
            <header className="analysis-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                    <button className="patient-list-button" onClick={handlePatientListClick}>Patient List</button>
                </div>
                <div className="user-info">
                    <a href="/HanIum_2024_09_02.pdf" download="HanIum_2024_09_02.pdf" className="report-button">Download Report</a>
                    <span className="user-id">{userId}</span>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <main className="analysis-content">
                <section className="left-panel">
                    <section className="patient-info">
                        <h2>Patient Information</h2>
                        <p>Patient Name: HAN, IUM</p>
                        <p>Patient ID: 2408271</p>
                        <p>Gender / Age: Female / 72</p>
                        <p>Department: Neurology</p>
                        <p>Date of Consultation: 01-Aug-2024</p>
                        <p>Diagnosis: Alzheimer’s Disease</p>
                    </section>

                    <section className="radiology-records">
                        <h2>Previous MRI Records</h2>
                        <ul>
                            {mriRecords.map(record => (
                                <li
                                    key={record.id}
                                    onClick={() => handleRecordClick(record)}
                                    className={record.date === selectedDate ? 'selected-record' : ''}
                                >
                                    {record.date}: {record.description}
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>

                <section className="right-panel">
                    <section className="image-display">
                        <h2>MRI Scan</h2>
                        {selectedImages && selectedImages.length > 0 ? (
                            selectedImages.map((image, index) => (
                                <img key={index} src={image} alt={`MRI Scan ${index + 1}`} />
                            ))
                        ) : (
                            <p>No images selected.</p>
                        )}
                    </section>
                    <div className="results-comments-container">
                        <section className="ai-result">
                            <h2>AI Result</h2>
                            <p>Diagnosis: {selectedAnalysis.description}</p>
                            <p style={{ color: selectedAnalysis.accuracy >= 0.9 ? 'red' : 'black' }}>
                                Accuracy: {selectedAnalysis.accuracy}
                            </p>
                        </section>
                        <section className="radiologist-comment">
                            <h2>Radiologist Comment</h2>
                            {selectedRadiologistComment.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </section>
                    </div>
                    <section className="physician-comment">
                        <h2>Ordering Physician Comment</h2>
                        <textarea
                            value={physicianComment}
                            onChange={(e) => setPhysicianComment(e.target.value)}
                            placeholder="Please enter comments."
                            className={!isEditing ? "textarea-disabled" : ""}
                            disabled={!isEditing}
                        />
                        <div className="action-buttons">
                            {isEditing ? (
                                <button className="save-button" onClick={handleSave}>Draft Completed</button>
                            ) : (
                                <button className="edit-button" onClick={handleEdit}>Edit</button>
                            )}
                            <button className="cancel-button" onClick={handleCancel}>Draft Cancelled</button>
                        </div>
                    </section>
                </section>

                <section className="ferightpanel">
                    <section className="calendar-section">
                        <h2></h2>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDateValue}
                            locale="en-US"
                            tileClassName={tileClassName}
                        />
                    </section>

                    <section className="ad-related-test-orders">
                        <h2>AD related Test Orders</h2>
                        <div className="ad-orders-content">
                            <p>PET (Positron Emission Tomography)</p>
                            <p>SPECT (Single Photon Emission Computed Tomography)</p>
                            <p>EEG (Electroencephalogram)</p>
                            <p>fMRI (Functional MRI)</p>
                            <p>Neuropsychological Testing</p>
                            <p>&gt; Mini-Mental State Examination (MMSE)</p>
                            <p>&gt; Montreal Cognitive Assessment (MoCA)</p>
                            <p>&gt; ADAS-Cog(Alzheimer’s Disease Assessment Scale-Cognitive Subscale)</p>
                            <p>Blood Tests</p>
                            <p>&gt; ApoE gene test</p>
                            <p>&gt; Tau protein, beta amyloid</p>
                            <p>&gt; Vit B12</p>
                            <p>&gt; TFTs</p>
                            <p>&gt; CPR, ESR</p>
                            <p>Cerebrospinal Fluid Analysis</p>
                        </div>
                    </section>
                </section>
            </main>
            <Modal
                show={showModal}
                message="Are you sure you want to sign out?"
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
            />
        </div>
    );
}

export default Analysis;
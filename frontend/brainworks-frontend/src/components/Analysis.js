import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import './Analysis.css';
import Modal from './Modal';
import jsPDF from 'jspdf';
import './Font/Font.css';

function Analysis() {
    const [showModal, setShowModal] = useState(false);
    const [mriRecords, setMriRecords] = useState([
        {
            id: 1,
            date: '04-Sep-2023',
            description: 'MRI Scan 1',
            image: '/mri_scan1.gif',
            analysis: { description: 'Non_Demented', confidence: 0.7813544273376465 }
        },
        {
            id: 2,
            date: '07-Feb-2024',
            description: 'MRI Scan 2',
            image: '/mri_scan2.gif',
            analysis: { description: 'Mild_Demented', confidence: 0.6423453487357645 }
        },
        {
            id: 3,
            date: '01-Aug-2024',
            description: 'MRI Scan 3',
            image: '/mri_scan3.gif',
            analysis: { description: 'Moderate_Demented', confidence: 0.8712434532837645 }
        }
    ]);

    const [selectedAnalysis, setSelectedAnalysis] = useState(mriRecords[0].analysis);
    const [selectedImage, setSelectedImage] = useState(mriRecords[0].image);
    const [selectedDate, setSelectedDate] = useState(mriRecords[0].date);
    const [selectedDateValue, setSelectedDateValue] = useState(new Date());
    const [physicianComment, setPhysicianComment] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPatient, userId } = location.state || {};

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
        setSelectedImage(record.image);
        setSelectedDate(record.date);
    };

    const handleSave = () => {
        if (!selectedImage) {
            alert('No MRI scan selected to save.');
            return;
        }

        const currentDate = new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-');

        const newRecord = {
            id: mriRecords.length + 1,
            date: currentDate,
            description: `MRI Scan ${mriRecords.length + 1}`,
            image: selectedImage,
            analysis: {
                description: 'Demented',
                confidence: 0.9813544273376465
            }
        };

        setMriRecords([...mriRecords, newRecord]);
    };

    const handleCancel = () => {
        navigate('/main');
    };

    const downloadPDF = async () => {
        const doc = new jsPDF();

        doc.setFont("MaruBuri-Light");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        doc.text("BrainWorks Analysis Report", 20, 20);
        doc.text(`Patient Name: ${selectedPatient}`, 20, 30);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
        doc.text(`MRI Scan Description: ${selectedDate}`, 20, 50);
        doc.text(`Analysis: ${selectedAnalysis.description}`, 20, 60);
        doc.text(`Confidence: ${selectedAnalysis.confidence}`, 20, 70);

        if (selectedImage) {
            const img = new Image();
            img.src = selectedImage;
            doc.addImage(img, 'JPEG', 20, 80, 160, 90);
        }

        const currentDate = new Date().toISOString().slice(0, 10);
        const fileName = `${selectedPatient}_${currentDate}.pdf`;

        doc.save(fileName);
    };

    const handlePatientListClick = () => {
        navigate('/patient-list', {
            state: { userId }
        });
    };

    const handleDateChange = (date) => {
        setSelectedDateValue(date);
    };

    const handlePhysicianCommentChange = (event) => {
        setPhysicianComment(event.target.value);
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
                    <button className="report-button" onClick={downloadPDF}>Download Report</button>
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
                                <li key={record.id} onClick={() => handleRecordClick(record)}>
                                    {record.date}: {record.description}
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>

                <section className="right-panel">
                    <section className="image-display">
                        <h2>MRI Scan</h2>
                        {selectedImage ? (
                            <img src={selectedImage} alt="MRI Scan" />
                        ) : (
                            <p>No image selected.</p>
                        )}
                    </section>

                    <section className="results-comments-container">
                        <div className="ai-result">
                            <h2>AI Result</h2>
                            <p>Diagnosis: Alzheimer's Disease</p>
                            <p>Accuracy: 0.963</p>
                        </div>

                        <div className="radiologist-comment">
                            <h2>Radiologist Comment</h2>
                            <p>Based on the MRI findings and the patient's clinical symptoms, a diagnosis of Alzheimer's disease is strongly suggested. The observed hippocampal and temporal lobe atrophy, ventricular enlargement, and white matter changes are consistent with typical imaging findings of Alzheimer's disease. Therefore, the patient is likely suffering from Alzheimer's disease, and further neuropsychological testing and treatment planning are recommended.</p>
                        </div>
                    </section>

                    <section className="physician-comment">
                        <h2>Ordering Physician Comment</h2>
                        <textarea
                            placeholder="Enter Ordering Physician Comment"
                            value={physicianComment}
                            onChange={handlePhysicianCommentChange}
                        />
                    </section>
                    <div className="action-buttons">
                        <button className="save-button" onClick={handleSave}>Save</button>
                        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </section>

                <section className="ferightpanel">
                    <section className="calendar-section">
                        <h2></h2>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDateValue}
                            locale="en-US"
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

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; // 달력 라이브러리 추가
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
    const [selectedImage, setSelectedImage] = useState(mriRecords[0].image); // 선택된 이미지를 추적
    const [selectedDate, setSelectedDate] = useState(mriRecords[0].date); // 선택된 날짜를 추적
    const [selectedDateValue, setSelectedDateValue] = useState(new Date()); // 달력에서 선택한 날짜

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
        setSelectedDate(record.date); // 선택된 날짜 업데이트
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
        }).replace(/ /g, '-'); // 공백을 '-'로 교체하여 "DD-MMM-YYYY" 형식으로 변환

        const newRecord = {
            id: mriRecords.length + 1,
            date: currentDate, // 변환된 날짜 반영
            description: `MRI Scan ${mriRecords.length + 1}`, // 제목에 Scan 번호를 반영
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

        // PDF에 사용할 폰트를 설정합니다.
        doc.setFont("MaruBuri-Light");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        // PDF 내용 작성
        doc.text("BrainWorks Analysis Report", 20, 20);
        doc.text(`Patient Name: ${selectedPatient}`, 20, 30);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
        doc.text(`MRI Scan Description: ${selectedDate}`, 20, 50);
        doc.text(`Analysis: ${selectedAnalysis.description}`, 20, 60);
        doc.text(`Confidence: ${selectedAnalysis.confidence}`, 20, 70);

        // 이미지 추가
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
            state: { userId } // Pass the userId to the patient list page
        });
    };

    const handleDateChange = (date) => {
        setSelectedDateValue(date);
        // 이곳에 선택한 날짜를 기반으로 하는 추가 로직을 구현할 수 있습니다.
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
                    <section className="analysis-results">
                        <h2>Analysis Results</h2>
                        <p>Description: {selectedAnalysis.description}</p>
                        <p>Confidence: {selectedAnalysis.confidence}</p>
                        <div className="action-buttons">
                            <button className="save-button" onClick={handleSave}>Save</button>
                            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </section>
                </section>

                <section className="calendar-section">
                    <h2>Calendar</h2>
                    <Calendar onChange={handleDateChange} value={selectedDateValue} />
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

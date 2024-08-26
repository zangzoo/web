import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Analysis.css';
import Modal from './Modal';
import jsPDF from 'jspdf';
import './Font/Font.css';

function Analysis() {
    const [showModal, setShowModal] = useState(false);
    const [mriRecords, setMriRecords] = useState([
        {
            id: 1,
            date: '2023-06-15',
            description: 'MRI Scan 1',
            image: '/mri_scan1.gif',
            analysis: { description: 'Non_Demented', confidence: 0.7813544273376465 }
        },
        {
            id: 2,
            date: '2023-07-01',
            description: 'MRI Scan 2',
            image: '/mri_scan2.gif',
            analysis: { description: 'Mild_Demented', confidence: 0.6423453487357645 }
        },
        {
            id: 3,
            date: '2023-08-10',
            description: 'MRI Scan 3',
            image: '/mri_scan3.gif',
            analysis: { description: 'Moderate_Demented', confidence: 0.8712434532837645 }
        }
    ]);

    const [selectedAnalysis, setSelectedAnalysis] = useState(mriRecords[0].analysis);

    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPatient, previewUrl, userId } = location.state || {};

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
        navigate('/analysis', {
            state: {
                selectedPatient,
                previewUrl: record.image,
                userId,
                analysis: record.analysis
            }
        });
    };

    const handleSave = () => {
        if (!previewUrl) {
            alert('No MRI scan selected to save.');
            return;
        }

        const newRecord = {
            id: mriRecords.length + 1,
            date: new Date().toISOString().slice(0, 10),
            description: `MRI Scan ${mriRecords.length + 1}`,
            image: previewUrl,
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
        doc.setFont("MaruBuri-Light"); // 미리 로드된 폰트 사용
        doc.setFontSize(12); // 폰트 크기 설정
        doc.setTextColor(0, 0, 0); // 텍스트 색상을 검정색으로 설정

        // PDF 내용 작성
        doc.text("BrainWorks Analysis Report", 20, 20);
        doc.text(`Patient Name: ${selectedPatient}`, 20, 30);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
        doc.text(`MRI Scan Description: ${mriRecords[mriRecords.length - 1].description}`, 20, 50);
        doc.text(`Analysis: ${mriRecords[mriRecords.length - 1].analysis.description}`, 20, 60);
        doc.text(`Confidence: ${mriRecords[mriRecords.length - 1].analysis.confidence}`, 20, 70);

        // 이미지 추가
        if (previewUrl) {
            const img = new Image();
            img.src = previewUrl;
            doc.addImage(img, 'JPEG', 20, 80, 160, 90);
        }

        // 파일 이름 생성 및 PDF 저장
        const currentDate = new Date().toISOString().slice(0, 10);
        const fileName = `${selectedPatient}_${currentDate}.pdf`;

        doc.save(fileName);
    };

    return (
        <div className="analysis-container">
            <header className="analysis-header">
                <div className="logo">
                    <img src="/brainlogo.png" alt="BrainWorks Logo" />
                    <h1>BrainWorks</h1>
                    <button className="history-button">History</button>
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
                        <p>ID: 12345</p>
                        <p>Name: {selectedPatient}</p>
                        <p>Department: Internal Medicine</p>
                        <p>Date: 2023-07-12</p>
                        <p>Diagnosis: Hypertension</p>
                    </section>

                    <section className="mri-records">
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
                        {previewUrl ? (
                            <img src={previewUrl} alt="MRI Scan" />
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

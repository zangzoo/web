import React from 'react';
import './Modal.css';

function Modal({ show, message, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onConfirm}>확인</button>
                <button onClick={onCancel}>취소</button>
            </div>
        </div>
    );
}

export default Modal;

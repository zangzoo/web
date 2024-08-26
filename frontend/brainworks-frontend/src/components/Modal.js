import React from 'react';
import './Modal.css';

function Modal({ show, message, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button className="confirm-button" onClick={onConfirm}>Confirm</button>
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default Modal;

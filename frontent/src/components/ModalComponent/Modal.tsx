import React, { ReactNode } from 'react';
import './Modal.css'; 

type ModalProps = {
    children: ReactNode;
};

const ModalComponent: React.FC<ModalProps> = ({ children }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default ModalComponent;

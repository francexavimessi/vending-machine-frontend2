import React, { ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    onClose: () => void; // Function to handle closing the modal
    children: ReactNode; // Modal content
    title?: string; // Optional title for the modal
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
    // Function to handle clicking the close button
    const handleCloseClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick} className="close-button">

                        </a>
                    </div>
                    {title && <h1 className="modal-title">{title}</h1>}
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );

    // Use React Portal to render the modal in a separate DOM node
    const modalRoot = document.getElementById("modal-root");
    return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
};

export default Modal;

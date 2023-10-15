import React from 'react';
import "./Modal.css";

const Modal = (props) => {
    const closeModal = (event) => {
        event.stopPropagation();
        props.onClose();
    }

    return (
        <>
            <div id="myModal" className="modal" style={{ display: props.isOpen ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className='modal-header'>
                        {props.headerTitle && <div className='modal-header-title'>{props.headerTitle}</div>}
                        <span className="close" onClick={closeModal}>&times;</span>
                    </div>
                    <div className='modal-body'>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;

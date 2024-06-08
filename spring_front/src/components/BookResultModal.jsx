import React from 'react';
import '@/css/form/bookresult.css';
import BookResult from '@/User/BookResult';

const BookResultModal = ({ transportationtype, selectedTrainSeats, selectedTrain, train, handleClose }) => {
    return (
        <div className="bookresultmodal">
            <div className="modal-content">
            <span className="close" style={{ marginLeft:'530px' }} onClick={handleClose}>&times;</span>
                <BookResult transportationtype={transportationtype} selectedTrainSeats={selectedTrainSeats} selectedTrain={selectedTrain} train ={train} handleClose={handleClose} />
              
            </div>
        </div>
    );
};

export default BookResultModal;

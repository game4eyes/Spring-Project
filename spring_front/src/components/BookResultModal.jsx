import React from 'react';
import Bookresult from '../User/BookResult';
import '@/css/form/bookresult.css';

const BookResultModal = ({ transportationtype, selectedTrain, train, handleClose,trainprice }) => {
    return (
        <div className="bookresultmodal">
            <div className="modal-content">
            <span className="close" style={{ marginLeft:'530px' }} onClick={handleClose}>&times;</span>
                <Bookresult transportationtype={transportationtype} selectedTrain={selectedTrain} trainprice ={trainprice } handleClose={handleClose} />
              
            </div>
        </div>
    );
};

export default BookResultModal;

import React, { useState } from "react";
import { ReactComponent as SearchIcon } from '@/icon/search.svg';
import '@/css/SearchNavigateButton_popup.css';

const SearchNavigateButton = () => {
    // State to manage the visibility of the search bar and modal overlay
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showReservationOptions, setShowReservationOptions] = useState(false);

    function toggleSearch() {
        setSearchVisible(!searchVisible);
        const leftContent = document.querySelector('.searchnavigatebutton .left-content');
        leftContent.classList.toggle('open');
    }

    function handleSearch() {
        if (searchTerm.includes('버스')) {
            window.location.href = '/ticketbook/bus';
        } else if (searchTerm.includes('기차')) {
            window.location.href = '/ticketbook/train';
        } else if (searchTerm.includes('비행기') || searchTerm.includes('공항') || searchTerm.includes('항공')) {
            window.location.href = '/ticketbook/plane';
        } else if (searchTerm.includes('로그인')) {
            window.location.href = '/api/user/login';
        } else if (searchTerm.includes('가입')) {
            window.location.href = '/api/user/join';
        } else if (searchTerm.includes('예매') || searchTerm.includes('예약')) {
            setShowReservationOptions(true);
        }

        else{
            alert('페이지를 조회할 수 없습니다!');
        }
    }

    function handleReservation(option) {
        if (option === '버스') {
            window.location.href = '/ticketbook/bus';
        } else if (option === '기차') {
            window.location.href = '/ticketbook/train';
        } else if (option === '공항') {
            window.location.href = '/ticketbook/plane';
        }
    }

    function handleClosePopup() {
        setShowReservationOptions(false);
    }

  

    return (
        <div className="searchnavigatebutton">
            <div className="left-content" style={{ position: 'fixed', top: 700, bottom: 200, left: 30, width: '100%', display: 'flex', alignItems: 'center' }}>
                <button type="button" onClick={toggleSearch} style={{ backgroundColor: 'violet', border: 'none', cursor: 'pointer', marginRight: '10px', borderRadius: '5px', zIndex: 2 }}>
                    <SearchIcon style={{ width: '30px', height: '30px', fill: 'white', margin: '10 10 10 10' }} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
                    {searchVisible && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="이동할 페이지를 입력하세요"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    marginRight: '5px',
                                    boxSizing: 'border-box',
                                    height: '50px',
                                    zIndex: 300
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleSearch}
                                style={{
                                    background: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    zIndex: 300
                                }}
                            >
                                검색
                            </button>
                        </div>
                    )}
                    {showReservationOptions && (
                        <div>
                            <div className="modal-overlay" onClick={handleClosePopup}></div>
                            <div className="popup">
                                <p className="popup-text" style={{ marginRight: "20px" }}>어느 교통수단을 이용하시겠습니까?</p>
                                <button className="close-button" onClick={handleClosePopup}>X</button>
                                <br />
                                <div className="button-group" style={{ marginTop: '-15px' }}>
                                    <button className="popup-button" onClick={() => handleReservation('버스')}>버스</button>
                                    <button className="popup-button" onClick={() => handleReservation('기차')}>기차</button>
                                    <button className="popup-button" onClick={() => handleReservation('공항')}>공항</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchNavigateButton;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '@/css/form/bookresult.css';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const BookResult = ({ transportationtype, trainprice, handleClose }) => {
    const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['userEmail', 'bookingInfo']);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [train, setTrain] = useState(null);

    const [flight, setFlight] = useState(null); 
    const [selectedPlane, setSelectedPlane] = useState(null);
    const [flight_departureName,setFlight_departureName]=useState(null);
    const [flight_destinationName,setFlight_destinationName]=useState(null);

    const [showBookingResultModal, setShowBookingResultModal] = useState(false);

    useEffect(() => {
        if (transportationtype === 'bus') {
            const selectedTrain = JSON.parse(localStorage.getItem('selectedtrain'));
            const train = JSON.parse(localStorage.getItem('train'));
            setSelectedTrain(selectedTrain);
            setTrain(train);
        } else if (transportationtype === 'train') {
            const selectedTrain = JSON.parse(localStorage.getItem('selectedtrain'));
            const train = JSON.parse(localStorage.getItem('train'));
            setSelectedTrain(selectedTrain);
            setTrain(train);
        } else if (transportationtype === 'plane') {
            const selectedPlane = JSON.parse(localStorage.getItem('bookingData'));
            const flight = JSON.parse(localStorage.getItem('flight'));
            const flight_departureName = JSON.parse(localStorage.getItem('flight_departureName'));
            const flight_destinationName = JSON.parse(localStorage.getItem('flight_destinationName'));

            console.log('Loaded selectedPlane:', selectedPlane); // 디버그용 로그
            setSelectedPlane(selectedPlane);
            setFlight(flight);
            setFlight_departureName(flight_departureName);
            setFlight_destinationName(flight_destinationName);
        }
    }, [transportationtype]);

    const bookingCancel = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('예약을 취소하시겠습니까?');
        if (isConfirmed) {
            alert('예약이 취소되었습니다');
            handleClose();
        }
    };

    const handlePayment = async (amount, orderId, orderName) => {
        try {
            const tossPayments = await loadTossPayments(clientKey);
            tossPayments.requestPayment('카드', {
                amount: amount,
                orderId: orderId,
                orderName: orderName,
                customerName: '고객명', // 실제 고객 이름으로 대체하세요
                successUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/paysuccess',
                failUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/payfail',
            }).catch(function (error) {
                if (error.code === 'USER_CANCEL') {
                    // 사용자가 결제창을 닫았을 때 처리
                } else if (error.code === 'INVALID_CARD_COMPANY') {
                    // 유효하지 않은 카드 코드 처리
                } else {
                    // 기타 에러 처리
                    console.error(error);
                }
            });
        } catch (error) {
            console.error('토스 결제 로드 에러:', error);
        }
    };

    const handleBook_bus = async (e, bus, fare) => {
        e.preventDefault();
        console.log('handleBook_bus called with:', bus, fare); // 디버그용 로그
        await handlePayment(fare, `order_${bus.id}_${Date.now()}`, `${bus.name} 버스 티켓`);
    };

    const handleBook_plane = async (e, flight, fare, flight_departureName, flight_destinationName) => {
        e.preventDefault();
        console.log('handleBook_plane called with:', flight, fare); // 디버그용 로그
        await handlePayment(fare, `order_${flight.id}_${Date.now()}`, `${flight.airline} - ${flight_departureName} to ${flight_destinationName}`);
    };

    return (
        <>
            {transportationtype === 'bus' && (
                <div className="bookresultcontainer">
                    <h2 style={{ marginBottom: '30px' }}>예약 내용이 다음과 같습니까? (버스)</h2>
                    <hr />
                    <h2 style={{ marginBottom: '30px' }}>프로필</h2>
                    <div className="form-group">
                        <label>이메일</label>
                        <span>{cookies.userEmail}</span>
                    </div>
                    <div className="form-group">
                        <label>닉네임</label>
                        <span>닉네임 정보 입력(하드코딩)</span>
                    </div>
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>버스 정보</h2>
                    <div>
                        {selectedTrain && (
                            <>
                                <p>열차 이름: {selectedTrain.railName}</p>
                                <p>열차 종류: {selectedTrain.trainClass}</p>
                                <p>열차 번호: {selectedTrain.trainNo}</p>
                                <p>출발 시간: {selectedTrain.departureTime}</p>
                            </>
                        )}
                        {train && (
                            <>
                                <p>출발지: {train.departure}</p>
                                <p>도착지: {train.destination}</p>
                                <p>가격 : {trainprice}</p>
                                <p>날짜 : {train.date}</p>
                                <p>시간: {train.hour}</p>
                                <p>요일: {train.dayz}</p>
                            </>
                        )}
                    </div>
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <button type="button" style={{ marginRight: '40px' }} onClick={() => handlePayment(trainprice, `order_${selectedTrain.trainNo}_${Date.now()}`, `${selectedTrain.railName} 티켓`)}>결제</button>
                        <button type="button" onClick={(e) => handleBook_bus(e, selectedTrain, trainprice)}>결제</button>
                        <button type="button" onClick={bookingCancel}>취소</button>
                    </div>
                    {showBookingResultModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setShowBookingResultModal(false)}>&times;</span>
                                <p>예약이 취소되었습니다</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {transportationtype === 'train' && (
                <div className="bookresultcontainer">
                    <h2 style={{ marginBottom: '30px' }}>예약 내용이 다음과 같습니까? (기차)</h2>
                    <hr />
                    <h2 style={{ marginBottom: '30px' }}>프로필</h2>
                    <div className="form-group">
                        <label>이메일</label>
                        <span>{cookies.userEmail}</span>
                    </div>
                    <div className="form-group">
                        <label>닉네임</label>
                        <span>닉네임 정보 입력(하드코딩)</span>
                    </div>
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>열차 정보</h2>
                    <div>
                        {selectedTrain && (
                            <>
                                <p>열차 이름: {selectedTrain.railName}</p>
                                <p>열차 종류: {selectedTrain.trainClass}</p>
                                <p>열차 번호: {selectedTrain.trainNo}</p>
                                <p>출발 시간: {selectedTrain.departureTime}</p>
                            </>
                        )}
                        {train && (
                            <>
                                <p>출발지: {train.departure}</p>
                                <p>도착지: {train.destination}</p>
                                <p>가격 : {trainprice}</p>
                                <p>날짜 : {train.date}</p>
                                <p>시간: {train.hour}</p>
                                <p>요일: {train.dayz}</p>
                            </>
                        )}
                    </div>
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <button type="button" style={{ marginRight: '40px' }} onClick={() => handlePayment(trainprice, `order_${selectedTrain.trainNo}_${Date.now()}`, `${selectedTrain.railName} 티켓`)}>결제</button>
                        {/* <button type="button" onClick={(e) => handleBook_train(e, selectedPlane, selectedPlane.amount)}>결제</button> */}
                        <button type="button" onClick={bookingCancel}>취소</button>
                    </div>
                    {showBookingResultModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setShowBookingResultModal(false)}>&times;</span>
                                <p>예약이 취소되었습니다</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {transportationtype === 'plane' && (
                <div className="bookresultcontainer">
                    <h2 style={{ marginBottom: '30px' }}>예약 내용이 다음과 같습니까? (공항)</h2>
                    <hr />
                    <h2 style={{ marginBottom: '30px' }}>프로필</h2>
                    <div className="form-group">
                        <label>이메일</label>
                        <span>{cookies.userEmail}</span>
                    </div>
                    <div className="form-group">
                        <label>닉네임</label>
                        <span>닉네임 정보 입력(하드코딩)</span>
                    </div>
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>공항 정보</h2>
                    <div>
                        {selectedPlane && (
                            <>
                                <p>금액: ₩{selectedPlane.amount}</p>
                                <p>출발 시간: {selectedPlane.departureTime}</p>
                                <p>도착 시간: {selectedPlane.arrivalTime || '정보 없음'}</p>
                                <p>날짜: {selectedPlane.date}</p>
                                <p>이메일: {cookies.userEmail}</p>
                                <p>출발지: {selectedPlane.startStationName}</p>
                                <p>도착지: {selectedPlane.endStationName}</p>
                                <p>등급: {selectedPlane.grade}</p>
                                <p>운영자: {selectedPlane.operator}</p>
                                <p>좌석 번호: {selectedPlane.seatNum}</p>
                            </>
                        )}
                    </div>
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <button type="button" onClick={(e) => handleBook_plane(e, flight, selectedPlane.amount, flight_departureName, flight_destinationName)}>결제</button>
                        <button type="button" onClick={bookingCancel}>취소</button>
                    </div>
                    {showBookingResultModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setShowBookingResultModal(false)}>&times;</span>
                                <p>예약이 취소되었습니다</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default BookResult;

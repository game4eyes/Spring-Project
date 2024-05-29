import React, { useEffect, useState,useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '@/css/form/bookresult.css';

import { loadTossPayments } from '@tosspayments/payment-sdk';


const BookResult = ({ transportationtype, trainprice, handleClose }) => {   //기차 가격은 따로 만들어서 보내는 방식으로 함

    const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';




    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['userEmail', 'bookingInfo']);
    const [selectedTrain, setSelectedTrain] = useState(null);       // 기차 1차 폼 데이터
    const [train, setTrain] = useState(null);                       // 기차 2차 폼 데이터
    const [selectedPlane, setSelectedPlane] = useState(null);       // 공항 데이터
    const [showBookingResultModal, setShowBookingResultModal] = useState(false); // 모달 상태 추가

    // Retrieve selected train, train ticket, or booking data from local storage
    useEffect(() => {
        if (transportationtype === 'bus') {  // 버스일 경우 (아직 안함)
            const selectedTrain = JSON.parse(localStorage.getItem('selectedtrain'));
            const train = JSON.parse(localStorage.getItem('train'));
            setSelectedTrain(selectedTrain);
            setTrain(train);
        } else if (transportationtype === 'train') {  // 기차일 경우
            const selectedTrain = JSON.parse(localStorage.getItem('selectedtrain'));
            const train = JSON.parse(localStorage.getItem('train'));
            setSelectedTrain(selectedTrain);
            setTrain(train);
        } else if (transportationtype === 'plane') {  // 공항일 경우
            const selectedPlane = JSON.parse(localStorage.getItem('bookingData'));  //로컬스토리지에 저장된 부분을
            setSelectedPlane(selectedPlane);
        }
    }, [transportationtype]);

    const bookingCancel = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('예약을 취소하시겠습니까?');
        if (isConfirmed) {
            alert('예약이 취소되었습니다');
            handleClose(); // Close the modal
        }
    };





    const handleBook_bus = async (e, flight, fare) => {     //handlePayment함수와 기능 합치기
        e.preventDefault();
        try {
            const tossPayments = await loadTossPayments(clientKey);
            tossPayments.requestPayment('카드', {
                amount: fare,
                orderId: `order_${flight.id}_${Date.now()}`,
                orderName: `${flight.airline} - ${flight.departureName} to ${flight.destinationName}`,
                customerName: '고객명', // 실제 고객 이름으로 대체하세요
                successUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/paysuccess', // 성공시 URL
                failUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/payfail', // 실패시 URL
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
        // onSelectFareAndBook(flight, fare, flight.departureTime);
    };


    const handleBook_train = async (e, flight, fare) => {     //handlePayment함수와 기능 합치기
        e.preventDefault();
        try {
            const tossPayments = await loadTossPayments(clientKey);
            tossPayments.requestPayment('카드', {
                amount: fare,
                orderId: `order_${flight.id}_${Date.now()}`,
                orderName: `${flight.airline} - ${flight.departureName} to ${flight.destinationName}`,
                customerName: '고객명', // 실제 고객 이름으로 대체하세요
                successUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/paysuccess', // 성공시 URL
                failUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/payfail', // 실패시 URL
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
        // onSelectFareAndBook(flight, fare, flight.departureTime);
    };






    const handleBook_plane = async (e, flight, fare) => {     //handlePayment함수와 기능 합치기
        e.preventDefault();
        try {
            const tossPayments = await loadTossPayments(clientKey);
            tossPayments.requestPayment('카드', {
                amount: fare,
                orderId: `order_${flight.id}_${Date.now()}`,
                orderName: `${flight.airline} - ${flight.departureName} to ${flight.destinationName}`,
                customerName: '고객명', // 실제 고객 이름으로 대체하세요
                successUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/paysuccess', // 성공시 URL
                failUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/payfail', // 실패시 URL
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
        // onSelectFareAndBook(flight, fare, flight.departureTime);
    };


    //결제한 데이터를 쿠키에 저장
    const handlePayment = () => {
        let bookingInfo;
        if (transportationtype === 'bus' || transportationtype === 'train') {  // 버스나 기차일 경우
            bookingInfo = {
                railName: selectedTrain.railName,
                trainClass: selectedTrain.trainClass,
                trainNo: selectedTrain.trainNo,
                departureTime: selectedTrain.departureTime,
                departure: train.departure,
                destination: train.destination,
                trainprice: trainprice,
                date: train.date,
                hour: train.hour,
                dayz: train.dayz,
            };
        } else if (transportationtype === 'plane') {  // 공항일 경우
            bookingInfo = {
                email: cookies.userEmail, // 사용자 이메일
                startStationId: selectedPlane.startStationId,
                endStationId: selectedPlane.endStationId,
                startStationName: selectedPlane.startStationName,
                endStationName: selectedPlane.endStationName,
                stationClass: null, // 항공편의 경우 사용하지 않음
                operator: selectedPlane.operator, // FlightList에서 선택된 항공사 이름
                grade: selectedPlane.grade,
                seatNum: selectedPlane.seatNum,
                busSeatNum: null, // 항공편의 경우 사용하지 않음
                date: selectedPlane.date,
                departureTime: selectedPlane.departureTime,
                arrivalTime: selectedPlane.arrivalTime || '정보 없음', // 필요 시 추가
                amount: selectedPlane.amount
            };
        }

        setCookie('bookingInfo', bookingInfo, { path: '/' });
        navigate('/');
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
                        <button type="button" style={{ marginRight: '40px' }} onClick={handlePayment}>결제</button>
                        <button type="button" onClick={(e) => handleBook_bus(e, selectedPlane, selectedPlane.amount)}>결제</button>
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
                        <button type="button" style={{ marginRight: '40px' }} onClick={handlePayment}>결제</button>
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

                        
                        {/* <button type="button" style={{ marginRight: '40px' }} onClick={handlePayment}>결제</button>  */} 
                        <button type="button" onClick={(e) => handleBook_plane(e, selectedPlane, selectedPlane.amount)}>결제</button>
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

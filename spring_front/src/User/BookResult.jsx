import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '@/css/form/bookresult.css';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import LoginModal from '@/components/LoginModal';
import BookResultModal from '@/components/BookResultModal';
import { AuthContext } from '@/global/AuthContext';

const BookResult = ({ transportationtype, trainprice, handleClose }) => {
    const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['userEmail', 'bookingInfo']);

    const [selectedBus, setSelectedBus] = useState(null);
    const [bus, setBus] = useState(null);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [train, setTrain] = useState(null);
    const [flight, setFlight] = useState(null);
    const [selectedPlane, setSelectedPlane] = useState(null);
    const [flight_departureName, setFlight_departureName] = useState(null);
    const [flight_destinationName, setFlight_destinationName] = useState(null);

    const { isLoggedIn, setShowLoginModal } = useContext(AuthContext);
    const [paymentType, setPaymentType] = useState('카드');  // 결제 유형 상태
    const [showBookResultModal, setShowBookResultModal] = useState(false);
    const [showBookingResultModal, setShowBookingResultModal] = useState(false);

    const [selectedTrainSeats, setSelectedTrainSeats] = useState([]);
    useEffect(() => {
        if (transportationtype === 'bus') {
            const selectedBus = JSON.parse(localStorage.getItem('selectedbus'));
            const bus = JSON.parse(localStorage.getItem('bus'));
            setSelectedBus(selectedBus);
            setBus(bus);
        } else if (transportationtype === 'train') {
            const selectedTrain = JSON.parse(localStorage.getItem('selectedTrain'));
            const train = JSON.parse(localStorage.getItem('train'));
            const selectedSeatType = JSON.parse(localStorage.getItem('selectedSeatType'));
            const seatPrice = JSON.parse(localStorage.getItem('seatPrice'));
            // const selectedTrainSeats = JSON.parse(localStorage.getItem('selectedTrainSeats'));
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



   // 선택한 좌석 유형과 가격을 state로 설정
   const [selectedSeatType, setSelectedSeatType] = useState('');
   const [seatPrice, setSeatPrice] = useState('');

   // 선택한 좌석 유형과 가격을 state에 할당
//    useEffect(() => {
//        const seatType = JSON.parse(localStorage.getItem('selectedSeatType'));
//        const price = JSON.parse(localStorage.getItem('seatPrice'));
//        setSelectedSeatType(seatType);
//        setSeatPrice(price);
//    }, []);





    const bookingCancel = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('예약을 취소하시겠습니까?');
        if (isConfirmed) {
            alert('예약이 취소되었습니다');
            handleClose();
        }
    };
    let sessionStorage = window.sessionStorage;

    const handlePayment = async (amount, orderId, orderName) => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        const userEmail = sessionStorage.getItem('userEmail'); // Retrieve userEmail from sessionStorage

        if (!userEmail) {
            // Handle case when userEmail is not available in sessionStorage
            console.error('User email not found in sessionStorage');
            return;
        }

        if (window.confirm('예약 정보를 확인하셨습니까? 결제를 진행합니다.')) {
            try {
                const tossPayments = await loadTossPayments(clientKey);
                tossPayments.requestPayment(paymentType, {
                    amount,
                    orderId,
                    orderName,
                    userEmail, // Include userEmail in the payment request payload
                    successUrl: 'http://localhost:9090/api/user/toss/success',
                    failUrl: 'http://localhost:9090/api/user/toss/fail',
                }).then(response => {
                    console.log('Payment successful:', response);
                    setShowBookResultModal(true);  // 결제 성공 후 결과 모달 표시
                }).catch(error => {
                    console.error('Payment error:', error);
                });
            } catch (error) {
                console.error('Failed to load Toss Payments SDK:', error);
            }
        }
    };


    const handleBook_bus = async (e, bus, fare) => {
        e.preventDefault();
        console.log('handleBook_bus called with:', bus, fare); // 디버그용 로그
        await handlePayment(fare, `order_${selectedBus.id}_${Date.now()}`, `${selectedBus.carrier} - ${bus.departure} to ${bus.destination} 버스 티켓`);
    };

    const handleBook_train = async (e, selectedTrain, fare, train) => {
        e.preventDefault();
        console.log('handleBook_train called with:', selectedTrain, fare); // 디버그용 로그
        // await handlePayment(fare, `order_${selectedTrain.id}_${Date.now()}`, `${selectedTrain.lineName} 기차 티켓`);
        await handlePayment(fare, `order_${selectedTrain.id}_${Date.now()}`, `${selectedTrain.lineName} -   ${train.departure} to ${train.destination} 기차 티켓`);
    };

    const handleBook_plane = async (e, flight, fare, flight_departureName, flight_destinationName) => {
        e.preventDefault();
        console.log('handleBook_plane called with:', flight, fare); // 디버그용 로그
        await handlePayment(fare, `order_${flight.id}`, `${flight.airline} - ${flight_departureName} to ${flight_destinationName}`);
    };


    useEffect(() => {
        if (transportationtype === 'train') {
            const selectedSeatType = JSON.parse(localStorage.getItem('selectedSeatType'));
            const price = JSON.parse(localStorage.getItem('seatPrice'));
            setSelectedSeatType(selectedSeatType);
            setSeatPrice(price);
        }
    }, [transportationtype]);

    
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
                        {selectedBus && (
                            <>
                                <p>버스 번호 :{selectedBus.id}</p>
                                <p>출발 시간 : {selectedBus.departureTime}</p>
                                <p>도착 시간 : {selectedBus.arrivalTime}</p>
                                <p>운행 요일 : {selectedBus.frequency}</p>
                                <p>가격 : {selectedBus.price}</p>
                                <p>등급 : {selectedBus.carrier}</p>
                            </>
                        )}
                        {bus && (
                            <>
                                <p>출발지: {bus.departure}</p>
                                <p>도착지: {bus.destination}</p>
                                <p>날짜 : {bus.departureDate}</p>
                                <p>왕복 : {bus.isRoundTrip}</p>
                                <p>요일: {bus.dayz}</p>
                            </>
                        )}
                    </div>
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>결제수단 선택</h2>
                    <div>
                        <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
                            <option value="카드">카드</option>
                            <option value="가상계좌">가상계좌</option>
                            <option value="계좌이체">계좌이체</option>
                            <option value="휴대폰">휴대폰</option>
                        </select>
                    </div>
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <button type="button" style={{ marginRight: '40px' }} onClick={(e) => handleBook_bus(e, bus, selectedBus.price)}>결제</button>
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
                                <p>기차 ID : {selectedTrain.id}</p>
                                <p>기차 번호 : {selectedTrain.frequency}</p>
                                <p>열차 종류 : {selectedTrain.lineName}</p>
                                <p>출발 시간 : {selectedTrain.departureTime}</p>
                                <p>도착 시간: {selectedTrain.arrivalTime}</p>
                                {/* <p>가격 : {selectedTrainSeats}</p> */}
                                <p>좌석 유형: {selectedSeatType}</p> {/* 선택한 좌석의 유형 출력 */}
                                <p>가격: {seatPrice}</p> {/*선택한 좌석의 가격 출력  */}
                            </>
                        )}
                        {train && (
                            <>
                                <p>출발지 : {train.departure}</p>
                                <p>도착지 : {train.destination}</p>
                                {/* <p>가격 : {trainprice}</p> */}
                                <p>날짜 : {train.date}</p>
                                {/* <p>시간: {train.hour}</p> */}
                                <p>요일 : {train.weekdayCarrier}</p>
                            
                            </>
                        )}
                    </div>
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>결제수단 선택</h2>
                    <div>
                        <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
                            <option value="카드">카드</option>
                            <option value="가상계좌">가상계좌</option>
                            <option value="계좌이체">계좌이체</option>
                            <option value="휴대폰">휴대폰</option>
                        </select>
                    </div>
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                    <button type="button" style={{ marginRight: '40px' }} onClick={(e) => handleBook_train(e, selectedTrain, seatPrice, train)}>결제</button>


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
                    <h2 style={{ marginBottom: '30px' }}>예약 내용이 다음과 같습니까? (항공)</h2>
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
                    <h2 style={{ marginBottom: '30px' }}>항공 정보</h2>
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
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>결제수단 선택</h2>
                    <div>
                        <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
                            <option value="카드">카드</option>
                            <option value="가상계좌">가상계좌</option>
                            <option value="계좌이체">계좌이체</option>
                            <option value="휴대폰">휴대폰</option>
                        </select>
                    </div>
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
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
            {showBookResultModal && <BookResultModal />}
            {!isLoggedIn && <LoginModal />}
        </>
    );
};

export default BookResult;
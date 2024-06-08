import React, { useEffect, useState, euseContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import '@/css/form/bookresult.css';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import LoginModal from '@/components/LoginModal';
import BookResultModal from '@/components/BookResultModal';
import { AuthContext } from '@/global/AuthContext';
import { getUserInfo } from "@/api/todoApi.jsx";
import { bookinFail, booking, bookingComplete } from "@/api/booking.jsx";
import { tossPayment } from '../api/todoApi';

const BookResult = ({ transportationtype, trainprice, handleClose }) => {
    const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';
    const location = useLocation();
    const navigate = useNavigate();
    // const [cookies, setCookie] = useCookies(['userEmail', 'bookingInfo']);

    const [selectedBus, setSelectedBus] = useState(null);
    const [bus, setBus] = useState(null);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [train, setTrain] = useState(null);
    const [plane, setFlight] = useState(null);
    const [selectedPlane, setSelectedPlane] = useState(null);
    const [plane_departureName, setFlight_departureName] = useState(null);
    const [plane_destinationName, setFlight_destinationName] = useState(null);

    const { setShowLoginModal } = useContext(AuthContext);
    const [paymentType, setPaymentType] = useState('카드');  // 결제 유형 상태
    const [showBookResultModal, setShowBookResultModal] = useState(false);
    const [showBookingResultModal, setShowBookingResultModal] = useState(false);

    const [selectedTrainSeats, setSelectedTrainSeats] = useState([]);



    let sessionStorage = window.sessionStorage;
    const email = sessionStorage.getItem('email');

   
    // if(location.pathname.includes('/api/user/toss/success')){
    //     navigate('/');
    // }


    // if(location.pathname.includes('http://localhost:9090/api/user/toss/success')){
    //     navigate('/');
    // }


    // useEffect(() => {
    //     if (sessionStorage.email) {
    //       if (location.pathname.includes('/api/user/toss/success') || 
    //           location.pathname.includes('/ticketbook/plane') || 
    //           location.pathname.includes('/ticketbook/bus')) {
    //         handleClose(); // Close the modal after successful login
    //       } else {        
    //         navigate('/');
    //       }
    //     }
    //   }, [sessionStorage.email, navigate, location.pathname, handleClose]);



    useEffect(() => {
        if (transportationtype === 'bus') {
            const selectedBus = JSON.parse(localStorage.getItem('selectedbus'));
            const bus = JSON.parse(localStorage.getItem('bus'));
            setSelectedBus(selectedBus);
            setBus(bus);


            setPaymentType("카드");
        } else if (transportationtype === 'train') {
            const selectedTrain = JSON.parse(localStorage.getItem('selectedTrain'));
            const train = JSON.parse(localStorage.getItem('train'));
            const selectedSeatType_train = JSON.parse(localStorage.getItem('selectedSeatType_train'));
            const seatPrice_train = JSON.parse(localStorage.getItem('seatPrice_train'));
            // const selectedTrainSeats = JSON.parse(localStorage.getItem('selectedTrainSeats'));
            setSelectedTrain(selectedTrain);
            setTrain(train);

            setPaymentType("카드");

        } else if (transportationtype === 'plane') {
            const selectedPlane = JSON.parse(localStorage.getItem('selectedPlane'));
            const plane = JSON.parse(localStorage.getItem('plane'));
            const selectedSeatType_plane = JSON.parse(localStorage.getItem('selectedSeatType_plane'));
            const seatPrice_plane = JSON.parse(localStorage.getItem('seatPrice_plane'));

            // const plane_departureName = JSON.parse(localStorage.getItem('plane_departureName'));
            // const plane_destinationName = JSON.parse(localStorage.getItem('plane_destinationName'));

            console.log('Loaded selectedPlane:', selectedPlane); // 디버그용 로그
            setSelectedPlane(selectedPlane);
            setFlight(plane);
            setSelectedSeatType_plane(selectedSeatType_plane);
            setSeatPrice_plane(seatPrice_plane);
            // setFlight_departureName(plane_departureName);
            // setFlight_destinationName(plane_destinationName);

            setPaymentType("카드");
        }
    }, [transportationtype]);



    // 선택한 좌석 유형과 가격을 state로 설정
    const [selectedSeatType_train, setSelectedSeatType_train] = useState('');
    const [seatPrice_train, setSeatPrice_train] = useState('');

    const [selectedSeatType_plane, setSelectedSeatType_plane] = useState('');
    const [seatPrice_plane, setSeatPrice_plane] = useState('');

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
    // let sessionStorage = window.sessionStorage;

    const handlePayment = async (amount, orderId, orderName, email) => {
        console.log(orderId)
        if (!sessionStorage.email) {
            setShowLoginModal(true);
            return;
        }

        // const userEmail = sessionStorage.getItem('userEmail'); // Retrieve userEmail from sessionStorage

        if (!sessionStorage.getItem("email")) {
            // Handle case when userEmail is not available in sessionStorage
            console.error('User email not found in sessionStorage');
            return;
        }
        const requestPayment = {
            amount,
            orderId,
            orderName,
            userEmail: sessionStorage.getItem("email"),
            successUrl: 'http://www.trable.kro.kr:9090/api/user/toss/success',
            failUrl: 'http://www.trable.kro.kr:9090/api/user/toss/fail',


            // successUrl: 'http://localhost:9090/api/user/toss/success',
            // failUrl: 'http://localhost:9090/api/user/toss/fail',

            payType: "CASH"
        }

        if (window.confirm('예약 정보를 확인하셨습니까? 결제를 진행합니다.')) {
            try {
                const payments = tossPayment(requestPayment);
                const tossPayments = await loadTossPayments(clientKey);
                tossPayments.requestPayment(paymentType, {
                    amount,
                    orderId,
                    orderName,
                    customerEmail: sessionStorage.getItem("email"),
                    successUrl: 'http://www.trable.kro.kr:9090/api/user/toss/success',
                    failUrl: 'http://www.trable.kro.kr:9090/api/user/toss/fail',

                    // successUrl: 'http://localhost:9090/api/user/toss/success',
                    // failUrl: 'http://localhost:9090/api/user/toss/fail',

                }).then(response => {
                    console.log('Payment successful:', response);
                    const successful = bookingComplete({ email, orderId })


                    if(response.status >= 200 && response.status < 300){
                        navigate('/success-page');  // 결제 성공이면 여기로 이동
                    }

                    setShowBookResultModal(true);  // 결제 성공 후 결과 모달 표시
                }).catch(error => {
                    console.error('Payment error:', error);
                });
            } catch (error) {
                console.error('Failed to load Toss Payments SDK:', error);
            }
        } else {
            const data = {
                userEmail: email,
                orderId: orderId
            };
            const orderCalcelFail = bookinFail(data);
            if (orderCalcelFail) {
                return ("결제 취소 성공");
            } else {
                return ("결제 취소 실패 관리자에게 문의 바람")
            }
        }
    };




    const handleBook_bus = async (e, bus, selectedBus, email) => {
        const orderId = `order_${selectedBus.id}_${Date.now()}`;
        e.preventDefault();
        console.log('handleBook_bus called with:', bus, selectedBus.price); // 디버그용 로그
        const data = {
            userEmail: email,
            scheduleId: selectedBus.id,
            orderId: orderId,
            orderDate: bus.departureDate,
            grade: "Bus",
            seatOrderNum: 1
        }
        const bookingResult = booking(data)
        if (bookingResult) {
            console.log("결제 전 으로 데이터 삽입 완료")
            await handlePayment(selectedBus.price, data.orderId, `${selectedBus.carrier} - ${bus.departure} to ${bus.destination} 버스 티켓`, email);
        } else {
            return false;
        }

    };

    const handleBook_train = async (e, selectedTrain, fare, train, email, selectedSeatType_train) => {

        const orderId = `order_${selectedTrain.id}_${Date.now()}`;
        e.preventDefault();

        console.log('handleBook_train called with:', selectedTrain, fare); // 디버그용 로그

        const data = {
            userEmail: email,
            scheduleId: selectedTrain.id,
            orderId: orderId,
            orderDate: train.date,
            grade: selectedSeatType_train,
            seatOrderNum: 1
        }
        const bookingResult = booking(data)



        // await handlePayment(fare, `order_${selectedTrain.id}_${Date.now()}`, `${selectedTrain.lineName} 기차 티켓`);
        await handlePayment(seatPrice_train, data.orderId, `${selectedTrain.lineName} -   ${train.departure} to ${train.destination} 기차 티켓`);
    };

    const handleBook_plane = async (e, selectedPlane, fare, plane, email, selectedSeatType_plane) => {
        e.preventDefault();
        const orderId = `order_${selectedPlane.id}_${Date.now()}`
        console.log('handleBook_plane called with:', selectedPlane, fare); // 디버그용 로그
        const data = {
            userEmail: email,
            scheduleId: selectedPlane.id,
            orderId: orderId,
            orderDate: plane.date,
            grade: selectedSeatType_plane,
            seatOrderNum: 1
        }
        const bookingResult = booking(data)


        // await handlePayment(fare, `order_${selectedTrain.id}_${Date.now()}`, `${selectedTrain.lineName} 기차 티켓`);
        await handlePayment(seatPrice_plane, data.orderId, `${selectedPlane.lineName} -   ${plane.departure} to ${plane.destination} 공항 티켓`);
    };




    const handleBook_test = async (e, bus, selectedBus, email) => {     //돈 쓸 기분 내고 싶은 분은 쓰세요 (199,9999원 청구됨)
        const orderId = `order_${selectedBus.id}_${Date.now()}`;
        e.preventDefault();
        console.log('handleBook_bus called with:', bus, selectedBus.price); // 디버그용 로그
        const data = {
            userEmail: email,
            scheduleId: selectedBus.id,
            orderId: orderId,
            orderDate: bus.departureDate,
            grade: "Bus",
            seatOrderNum: 1
        }
        const bookingResult = booking(data)
        if (bookingResult) {
            console.log("결제 전 으로 데이터 삽입 완료")
            await handlePayment('19999999', data.orderId, `${selectedBus.carrier} - ${bus.departure} to ${bus.destination} 버스 티켓`, email);
        } else {
            return false;
        }

    };



    useEffect(() => {
        if (transportationtype === 'train') {
            const selectedSeatType_train = JSON.parse(localStorage.getItem('selectedSeatType_train'));
            const price_train = JSON.parse(localStorage.getItem('seatPrice_train'));
            setSelectedSeatType_train(selectedSeatType_train);
            setSeatPrice_train(price_train);
        }
        else if (transportationtype === 'plane') {
            const selectedSeatType_plane = JSON.parse(localStorage.getItem('selectedSeatType_plane'));
            // const price_plane = JSON.parse(localStorage.getItem('seatPrice_plane'));
            setSelectedSeatType_plane(selectedSeatType_plane);
            // setSeatPrice(price_plane);
        }
    }, [transportationtype]);

    // 유저 이메일로 사용자 정보를 가지고 오는 로직이 필요?
    // useEffect(() => {
    //     const userInfo = getUserInfo()
    // }, []);


    return (
        <>
            {transportationtype === 'bus' && (
                <div className="bookresultcontainer">
                    <h2 style={{ marginBottom: '30px' }}>예약 내용이 다음과 같습니까? (버스)</h2>
                    {/* <hr />
                    <h2 style={{ marginBottom: '30px' }}>프로필</h2>
                    <div className="form-group">
                        <label>이메일</label>
                        <span>{sessionStorage.email}</span>
                    </div>
                    <div className="form-group">
                        <label>닉네임</label>
                        <span>닉네임 정보 입력(하드코딩)</span>
                    </div> */}
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
                                {/* <p>요일: {bus.dayz}</p> */}
                            </>
                        )}
                    </div>
                    {/* <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>결제수단 선택</h2>
                    <div>
                        <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
                            <option value="카드">카드</option>
                            <option value="가상계좌">가상계좌</option>
                            <option value="계좌이체">계좌이체</option>
                            <option value="휴대폰">휴대폰</option>
                        </select>
                    </div> */}
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <button type="button" style={{ marginRight: '40px' }} onClick={(e) => handleBook_bus(e, bus, selectedBus, sessionStorage.email)}>결제</button>
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
                    {/* <hr />
                    <h2 style={{ marginBottom: '30px' }}>프로필</h2>
                    <div className="form-group">
                        <label>이메일</label>
                        <span>{sessionStorage.email}</span>
                    </div>
                    <div className="form-group">
                        <label>닉네임</label>
                        <span>닉네임 정보 입력(하드코딩)</span>
                    </div> */}
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>열차 정보</h2>
                    <div>
                        {selectedTrain && (
                            <>
                                {/* <p>기차 ID : {selectedTrain.id}</p> */}
                                <p>기차 번호 : {selectedTrain.frequency}</p>
                                <p>열차 종류 : {selectedTrain.lineName}</p>
                                <p>출발 시간 : {selectedTrain.departureTime}</p>
                                <p>도착 시간: {selectedTrain.arrivalTime}</p>
                                {/* <p>가격 : {selectedTrainSeats}</p> */}
                                <p>좌석 유형: {selectedSeatType_train}</p> {/* 선택한 좌석의 유형 출력 */}
                                <p>가격: {seatPrice_train}</p> {/*선택한 좌석의 가격 출력  */}
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
                    {/* <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>결제수단 선택</h2>
                    <div>
                        <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
                            <option value="카드">카드</option>
                            <option value="가상계좌">가상계좌</option>
                            <option value="계좌이체">계좌이체</option>
                            <option value="휴대폰">휴대폰</option>
                        </select>
                        </div>*/}
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <button type="button" style={{ marginRight: '40px' }} onClick={(e) => handleBook_train(e, selectedTrain, seatPrice_train, train, email, selectedSeatType_train)}>결제</button>


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
                    {/* <hr />
                    <h2 style={{ marginBottom: '30px' }}>프로필</h2>
                    <div className="form-group">
                        <label>이메일</label>
                        <span>{sessionStorage.email}</span>
                    </div>
                    <div className="form-group">
                        <label>닉네임</label>
                        <span>닉네임 정보 입력(하드코딩)</span>
                    </div> */}
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>열차 정보</h2>
                    <div>
                        {selectedPlane && (
                            <>
                                {/* <p>공항 ID : {selectedPlane.id}</p> */}
                                <p>기차 번호 : {selectedPlane.frequency}</p>
                                <p>열차 종류 : {selectedPlane.lineName}</p>
                                <p>출발 시간 : {selectedPlane.departureTime}</p>
                                <p>도착 시간: {selectedPlane.arrivalTime}</p>

                                <p>좌석 유형: {selectedSeatType_plane}</p> {/* 선택한 좌석의 유형 출력 */}
                                <p>가격: {seatPrice_plane}</p>     {/* 선택한 좌석의 가격 출력  */}
                            </>
                        )}
                        {plane && (
                            <>
                                <p>출발지 : {plane.departure}</p>
                                <p>도착지 : {plane.destination}</p>
                                {/* <p>가격 : {trainprice}</p> */}
                                <p>날짜 : {plane.date}</p>
                                {/* <p>시간: {train.hour}</p> */}
                                <p>요일 : {plane.weekdayCarrier}</p>

                            </>
                        )}
                    </div>
                    {/* <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <h2 style={{ marginBottom: '30px' }}>결제수단 선택</h2>
                    <div>
                        <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
                            <option value="카드">카드</option>
                            <option value="가상계좌">가상계좌</option>
                            <option value="계좌이체">계좌이체</option>
                            <option value="휴대폰">휴대폰</option>
                        </select>
                    </div> */}
                    <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <button type="button" style={{ marginRight: '40px' }} onClick={(e) => handleBook_plane(e, selectedPlane, seatPrice_plane, plane, email, selectedSeatType_plane)}>결제</button>


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
            {!sessionStorage.email && <LoginModal />}
        </>
    );
};

export default BookResult;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from "../components/Layout";
import '@/css/form/mypage.css';
import { getUserOrderInfo } from '@/api/dataApi';

const Mypage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const [showEmailPopup, setShowEmailPopup] = useState(false);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrderInfo(sessionStorage.email);
                setOrders(data.OrderList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [sessionStorage.email]);

    const handleProfileEdit = () => {
        alert('프로필 수정 페이지로 이동합니다.');
        navigate('/api/user/MypageModify');
    };

    const handleAccountDelete = () => {
        const isConfirmed = window.confirm('정말로 회원탈퇴 하시겠습니까?');
        if (isConfirmed) {
            alert('회원탈퇴가 완료되었습니다.');
            navigate('/');
        }
    };

    const bookingCancel = (order) => {
        const isConfirmed = window.confirm('예약을 취소하시겠습니까?');
        if (isConfirmed) {
            alert('예약이 취소되었습니다');
            navigate('/');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handlePriceCheck = () => {
        setShowEmailPopup(true);
    };

  
    return (
        <Layout title="마이페이지">
            <div className="mypage-container">
                <div style={{ display: 'flex' }}>
                    <h2 style={{ marginBottom: '40px' }}><span>{sessionStorage.email}</span>의 예약 정보</h2>
                    <div>
                        <button type="button" className="button-container" style={{ marginLeft: '25px', marginTop: '-3px', backgroundColor: 'orange', color: 'white', borderRadius: '5px' }} onClick={handlePriceCheck}>$</button>
                    </div>
                    {showEmailPopup && (
                        <div className="email-popup">
                            <p>가격은 이메일에서 확인하세요.</p>
                            <button onClick={() => setShowEmailPopup(false)}>닫기</button>
                        </div>
                    )}
                </div>
                <div>
                    {orders.length > 0 ? (
                        <ul className="order-list">
                            {orders.map((order, index) => (
                                <li key={index} className="order-item">
                                    <div className="order-detail"><strong>출발지 :</strong> {order.startName}</div>
                                    <div className="order-detail"><strong>도착지 :</strong> {order.endName}</div>
                                    <div className="order-detail"><strong>출발 시간 :</strong> {order.departureTime}</div>
                                    <div className="order-detail"><strong>도착 시간 :</strong> {order.arrivalTime}</div>
                                    <div className="order-detail"><strong>등급 :</strong> {order.grade}</div>

                                    {/* Conditional rendering based on order.grade */}
                                    {['general', 'special', 'standingFreeSeating'].includes(order.grade) ? (
                                        <>
                                            <div className="order-detail"><strong>기차 종류 :</strong> {order.operatorName}</div>
                                            <div className="order-detail"><strong>경로 :</strong> {order.railName}</div>
                                        </>
                                    ) : ['first', 'economy', 'business'].includes(order.grade) ? (
                                        <>
                                            <div className="order-detail"><strong>운행사 :</strong> {order.operatorName}</div>
                                            <div className="order-detail"><strong>경로 :</strong> {order.railName}</div>
                                        </>
                                    ) : (
                                        // Else case for bus
                                        <>
                                            <div className="order-detail"><strong>버스 종류 :</strong> {order.operatorName}</div>
                                            <div className="order-detail"><strong>경로 :</strong> {order.railName}</div>
                                        </>
                                    )}

                                    <div className="order-detail"><strong>예약 날짜 :</strong> {order.orderDate}</div>
                                    {/* <div className="button-container">
                                        <button type="button" className="cancel-button" style={{ backgroundColor: '#f44336' }} onClick={() => bookingCancel(order)}>취소</button>
                                    </div> */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>예약 정보가 없습니다</div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Mypage;





{/* {bookingInfo ? (
                    <div>
                        <h3>버스 정보</h3>
                        <p>출발지: {bookingInfo.departure}</p>
                        <p>도착지: {bookingInfo.destination}</p>
                        <p>가격 : {bookingInfo.trainprice}</p>
                        <p>날짜 : {bookingInfo.date}</p>
                        <p>시간: {bookingInfo.hour}</p>
                        <p>요일: {bookingInfo.dayz}</p>
                        <p>열차 이름: {bookingInfo.railName}</p>
                        <p>열차 종류: {bookingInfo.trainClass}</p>
                        <p>열차 번호: {bookingInfo.trainNo}</p>
                        <p>출발 시간: {bookingInfo.departureTime}</p>


                        <hr/> 
                        <h3>기차 정보</h3>
                        <p>출발지: {bookingInfo.departure}</p>
                        <p>도착지: {bookingInfo.destination}</p>
                        <p>가격 : {bookingInfo.trainprice}</p>
                        <p>날짜 : {bookingInfo.date}</p>
                        <p>시간: {bookingInfo.hour}</p>
                        <p>요일: {bookingInfo.dayz}</p>
                        <p>열차 이름: {bookingInfo.railName}</p>
                        <p>열차 종류: {bookingInfo.trainClass}</p>
                        <p>열차 번호: {bookingInfo.trainNo}</p>
                        <p>출발 시간: {bookingInfo.departureTime}</p>

                        <hr/> 
                        <h3>공항 정보</h3>
                        <p>금액: ₩{bookingInfo.amount}</p>
                        <p>출발 시간: {bookingInfo.departureTime}</p>
                        <p>도착 시간: {bookingInfo.arrivalTime || '정보 없음'}</p>
                        <p>날짜: {bookingInfo.date}</p>
                        <p>이메일: {bookingInfo.email}</p>
                        <p>출발지: {bookingInfo.startStationName}</p>
                        <p>도착지: {bookingInfo.endStationName}</p>
                        <p>등급: {bookingInfo.grade}</p>
                        <p>운영자: {bookingInfo.operator}</p>
                        <p>좌석 번호: {bookingInfo.seatNum}</p>
                        <div className="button-container">
                            <button type="button" className="cancel-button" style={{ backgroundColor: '#f44336' }} onClick={bookingcancel}>취소</button>
                        </div>
                    </div>
                ) : (
                    <p>예약된 열차 정보가 없습니다.</p>
                )} */}
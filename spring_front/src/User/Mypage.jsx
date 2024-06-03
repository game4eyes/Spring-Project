import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Layout from "../components/Layout";
import '@/css/form/mypage.css';
import { getUserOrderInfo } from '@/api/dataApi';

const Mypage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    // const [cookies, setCookie] = useCookies(['email', 'bookingInfo']);
    const [bookingInfo, setBookingInfo] = useState(null);
    const [orders, setOrders] = useState([]);
    // useEffect(() => {
    //     if (cookies.bookingInfo) {
    //         setBookingInfo(cookies.bookingInfo);
    //     }
    // }, [cookies.bookingInfo]);

    // console.log('User Email:', cookies.email);
    // console.log('Booking Info:', cookies.bookingInfo);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrderInfo(sessionStorage.email);
                setOrders(data.OrderList);  // Assuming your API returns a similar structure as the provided JSON
                console(data.OrderList);
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
        navigate('/api/user/MypageModify'); // 예시 경로
    };

    const handleAccountDelete = () => {
        const isConfirmed = window.confirm('정말로 회원탈퇴 하시겠습니까?');
        if (isConfirmed) {
            alert('회원탈퇴가 완료되었습니다.');
            navigate('/'); // 예시 경로
        }
    };

    const bookingcancel = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('예약을 취소하시겠습니까?');
        if (isConfirmed) {
            alert('예약이 취소되었습니다');
            // setCookie('bookingInfo', null, { path: '/' }); // bookingInfo 쿠키 삭제
            navigate('/');
        }
    };


    return (
        <Layout title="마이페이지">
            <div className="mypage-container">
                {/* <h2 style={{ marginBottom: '30px' }}>마이페이지</h2>
                <hr /> */}

                <h2 style={{ marginBottom: '40px' }}>프로필</h2>
                <div className="form-group">
                    <label>이메일</label>
                    <span>{sessionStorage.email}</span>
                </div>
                <div className="form-group">
                    <label>닉네임</label>
                    <span>닉네임 정보 입력(하드코딩)</span>
                </div>
                <div className="button-container profile-buttons">
                    <button type="button" style={{ backgroundColor: '#4CAF50', marginRight: '15px' }} onClick={handleProfileEdit}>수정하기</button>
                    <button type="button" style={{ backgroundColor: '#f44336' }} onClick={handleAccountDelete}>회원탈퇴</button>
                </div>
                <hr style={{ marginTop: '20px', marginBottom: '50px' }} />
                <h2 style={{ marginBottom: '40px' }}>예약 정보</h2>



                <div>
                    {/* <h2>Order List for {sessionStorage.email}</h2> */}
                    {orders.length > 0 ? (
                       <ul className="order-list">
                       {orders.map((order, index) => (
                           <li key={index} className="order-item">
                          
                               <div className="order-detail"><strong>출발지 :</strong> {order.startName}</div>
                               <div className="order-detail"><strong>도착지 :</strong> {order.endName}</div>
                               <div className="order-detail"><strong>출발 시간 :</strong> {order.departureTime}</div>
                               <div className="order-detail"><strong>도착 시간 :</strong> {order.arrivalTime}</div>
                               <div className="order-detail"><strong>등급 :</strong> {order.grade}</div>
                               <div className="order-detail"><strong>버스 종류 :</strong> {order.operatorName}</div>
                               <div className="order-detail"><strong>경로 :</strong> {order.railName}</div>
                               <div className="order-detail"><strong>예약 날짜 :</strong> {order.orderDate}</div>
                               <div className="button-container">
                            <button type="button" className="cancel-button" style={{ backgroundColor: '#f44336' }} onClick={bookingcancel}>취소</button>
                        </div>
                     
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
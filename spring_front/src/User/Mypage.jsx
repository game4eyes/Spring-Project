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

    const handlePriceCheck = () => {
        setShowEmailPopup(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                                    <div className="order-detail"><strong>예약 날짜 :</strong> {order.orderDate}</div>
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

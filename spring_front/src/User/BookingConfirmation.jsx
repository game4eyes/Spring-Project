import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

const BookingConfirmation = () => {
    const location = useLocation();
    const history = useHistory();
    const { bookingData } = location.state || {};

    const handleGoHome = () => {
        history.push('/');
    };

    return (
        <Layout title="예약 완료" body="예약이 성공적으로 완료되었습니다!">
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>예약이 완료되었습니다!</h2>
                {bookingData ? (
                    <div>
                        <p>다음은 예약 세부 정보입니다:</p>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li><strong>출발지:</strong> {bookingData.startStationName}</li>
                            <li><strong>도착지:</strong> {bookingData.endStationName}</li>
                            <li><strong>출발일:</strong> {bookingData.date}</li>
                            <li><strong>출발 시간:</strong> {bookingData.departureTime}</li>
                            <li><strong>요금:</strong> ₩{bookingData.amount}</li>
                        </ul>
                    </div>
                ) : (
                    <p>예약 세부 정보를 찾을 수 없습니다.</p>
                )}
                <button 
                    onClick={handleGoHome} 
                    style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                >
                    홈으로 돌아가기
                </button>
            </div>
        </Layout>
    );
};

export default BookingConfirmation;

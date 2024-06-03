import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import '@/css/SuccessPage.css'; // 수정된 CSS 파일 경로

const SuccessPage = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); // 홈 경로 설정
    };

    return (
        <div className="custom-container">
            <Header/>
            <h1 className="custom-title">결제 성공!</h1>
            <p className="custom-message">결제가 성공적으로 완료되었습니다.</p>
            <button onClick={handleBackToHome} className="custom-button">
                확인
            </button>
        </div>
    );
};

export default SuccessPage;

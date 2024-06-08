import React, { useState, useContext  } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { AuthContext } from '@/global/AuthContext'; 
import LoginModal from '@/components/LoginModal'; 
import BookResultModal from '@/components/BookResultModal'; 

const TossPay = ({ amount, orderId, orderName, userName, successUrl, failUrl, onSelectFareAndBook }) => {
    const [paymentType, setPaymentType] = useState('카드');
    const { isLoggedIn, showLoginModal, setShowLoginModal } = useContext(AuthContext);
    const [showBookResultModal, setShowBookResultModal] = useState(false);

    const handlePayment = async () => {

        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }
        setShowBookResultModal(true);

        if (confirm('예약 정보를 확인하셨습니까? 결제를 진행합니다.')) {
            try {
                const tossPayments = await loadTossPayments('test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb');
                tossPayments.requestPayment(paymentType, {
                    amount: '1,999,999',
                    orderId: '010-4593-2863',
                    orderName: '김윤기',
                    customerEmail: sessionStorage.getItem("email"),
                    successUrl: 'http://www.trable.kro.kr:9090/api/user/toss/success',
                    failUrl: 'http://www.trable.kro.kr:9090/api/user/toss/fail'
                }).then(response => {
                    console.log('Payment successful:', response);
                    onSelectFareAndBook();
                }).catch(error => {
                    console.error('Payment error:', error);
                });
            } catch (error) {
                console.error('Failed to load Toss Payments SDK:', error);
            }
        }
    };

    return (
        <div>
            <select className="payment-select" value={paymentType} onChange={e => setPaymentType(e.target.value)}>
                <option value="카드">카드</option>
                <option value="가상계좌">가상계좌</option>
                <option value="계좌이체">계좌이체</option>
                <option value="휴대폰">휴대폰</option>
            </select>
            <br/>
            <button onClick={handlePayment}>결제</button>
        </div>
    );
};


export default TossPay;

import React, { useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const TossPay = ({ amount, orderId, orderName, userName, successUrl, failUrl, onSelectFareAndBook }) => {
    const [paymentType, setPaymentType] = useState('카드');

    const handlePayment = async () => {
        try {
            const tossPayments = await loadTossPayments('test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb');
            tossPayments.requestPayment(paymentType, {
                amount,
                orderId,
                orderName,
                userName,
                successUrl,
                failUrl
            }).then(response => {
                console.log('Payment successful:', response);
                onSelectFareAndBook();
            }).catch(error => {
                console.error('Payment error:', error);
            });
        } catch (error) {
            console.error('Failed to load Toss Payments SDK:', error);
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
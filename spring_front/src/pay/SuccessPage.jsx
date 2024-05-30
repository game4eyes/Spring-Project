import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + btoa('test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R:'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ paymentKey, orderId, amount }),
                });

                if (!response.ok) {
                    throw new Error('Payment confirmation failed');
                }

                const paymentResult = await response.json();
                // 결제 완료 데이터를 백엔드로 전송
                await fetch('/api/payment-success', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paymentResult),
                });

                // 결제 성공 처리
                console.log('Payment confirmed and sent to backend:', paymentResult);
            } catch (error) {
                console.error('Error confirming payment:', error);
                // 결제 실패 처리
            }
        };

        if (paymentKey && orderId && amount) {
            confirmPayment();
        }
    }, [paymentKey, orderId, amount]);

    return (
        <div>
            <h1>결제 성공</h1>
            <p>결제가 성공적으로 완료되었습니다.</p>
        </div>
    );
};

export default SuccessPage;

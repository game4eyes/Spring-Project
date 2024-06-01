import React, { useCallback, useEffect } from 'react';
import { tossPayment } from '../api/todoApi'; // 경로 수정

const Pay = () => {
    const windowClose = () => {
        window.close();
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://js.tosspayments.com/v1/payment";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = useCallback(async () => {
        try {
            const paymentData = {
                amount: 1390000,
                orderId: 'bec1d544-2a34-4f44-ada0-c5213d8fd8dd',
                orderName: '포인트 충전',
                userName: 'game4eyes',
                userEmail: 'darkjjun68@gmail.com',
                payType: 'CARD',
                successUrl: 'http://localhost:9090/api/v1/payments/toss/success',
                failUrl: 'http://localhost:9090/api/v1/payments/toss/fail'
            };

            // 먼저 서버로 결제 데이터를 전송
            const result = await tossPayment(paymentData);
            console.log(result);

            // 서버 응답을 사용하여 토스 결제 창 띄우기
            const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb'; // 실제 클라이언트 키로 대체

            const tossPayments = tossPayments(clientKey);
            tossPayments.requestPayment(paymentData.payType, {
                amount: paymentData.amount,
                orderId: paymentData.orderId,
                orderName: paymentData.orderName,
                customerName: paymentData.userName,
                successUrl: paymentData.successUrl,
                failUrl: paymentData.failUrl
            });
        } catch (error) {
            console.error('Payment Error:', error);
        }
    }, []);

    return (
        <div>
            <h1>결제 시스템</h1>
            <section>
                <span>총 포인트 충전 금액 :</span>
                <span>58500원</span>
                <button id="payment-button" onClick={handlePayment}>58500원 충전하기</button>
            </section>
            <button onClick={windowClose}>닫기</button>
        </div>
    );
}

export default Pay;

import React, { useCallback, useEffect } from 'react';
import { tossPayment } from '../api/todoApi'; // 경로 수정

const Pay = () => {
    const windowClose = () => {
        window.close();
    }

    const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';

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
                amount: 58500,
                orderId: 'bec1d544-2a34-4f44-ada0-c5213d8fd8dd',
                orderName: '포인트 충전',
                customerName: 'test1234',
                customerEmail: 'darkjjun68@gmail.com',
                successUrl: 'http://localhost:9090/api/v1/payments/toss/success',
                failUrl: 'http://localhost:9090/api/v1/payments/toss/fail'
            };

            const result = await tossPayment(paymentData);
            console.log(result);
        } catch (error) {
            console.error(error);
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

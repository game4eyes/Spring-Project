import React, { useCallback, useEffect } from 'react';
import { tossPayment } from '../api/todoApi'; // 경로 수정

const Pay = () => {
    const windowClose = () => {
        window.close();
    }

    const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';

    // SDK를 동적으로 추가하는 useEffect
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://js.tosspayments.com/v1/payment";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 충전하기 버튼 클릭 시 호출되는 함수
    const handlePayment = useCallback(async () => {
        try {
            // 결제 정보 설정
            const paymentData = {
                amount: 58500,
                orderId: 'bec1d544-2a34-4f44-ada0-c5213d8fd8dd',
                orderName: '포인트 충전',
                customerName: 'test1234',
                customerEmail: 'darkjjun68@gmail.com',
                successUrl: 'http://localhost:9090/api/v1/payments/toss/success',
                failUrl: 'http://localhost:9090/api/v1/payments/toss/fail'
            };

            // Toss 결제 요청
            const result = await tossPayment(paymentData);
            
            // 결제 결과에 따른 처리
            console.log(result); // 결제 결과 출력
            
            // 성공하면 추가적인 작업 수행 가능
            // 예: 결제 완료 메시지 표시 등
            
        } catch (error) {
            console.error(error); // 에러 처리
        }
    }, []);

    return (
        <div>
            <h1>결제 시스템</h1>
            <section>
                {/* 총 포인트 충전 금액 */}
                <span>총 포인트 충전 금액 :</span>
                <span>58500원</span>
                {/* 결제 버튼 */}
                <button id="payment-button" onClick={handlePayment}>58500원 충전하기</button>
            </section>
            {/* 닫기 버튼 */}
            <button onClick={windowClose}>닫기</button>
        </div>
    );
}

export default Pay;

import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const Pay = () => {
    const windowClose = () => {
        window.close();
    }
//     const [popupData, setPopupData] = useState(null); // 팝업 창에서 받은 데이터를 저장하는 상태

//       // 팝업 창에서 데이터를 받아오는 함수
//   const receiveDataFromPopup = (data) => {
//     setPopupData(data); // 데이터를 상태에 저장
//   };

const clientKey = '테스트_클라이언트_키';

// 충전하기 버튼 클릭 시 호출되는 함수
const handlePayment = useCallback(() => {
    // 결제창 띄우기
    tossPayments.requestPayment('CARD', {
        amount: 58500,
        orderId: 'bec1d544-2a34-4f44-ada0-c5213d8fd8dd',
        orderName: '포인트 충전',
        customerName: '첫번째',
        customerEmail: 'test1@gmail.com',
        successUrl: 'http://localhost:9090/api/v1/payments/toss/success',
        failUrl: 'http://localhost:9090/api/v1/payments/toss/fail'
    });
}, []);

    return (
        <div>
            <h1>결제 시스템</h1>
            {/* 결제 버튼 */}
            <button onClick={handlePayment}>결제하기</button>
            {/* 닫기 버튼 */}
            <button onClick={windowClose}>닫기</button>
        </div>
    );
}

export default Pay;

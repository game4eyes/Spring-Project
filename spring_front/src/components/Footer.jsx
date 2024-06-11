import React from 'react';
import { Link } from 'react-router-dom';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { booking, bookingComplete, bookinFail } from '@/api/booking.jsx';
import { tossPayment } from '@/api/todoApi';


const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';
const handlePayment = async (amount, orderId, orderName, email, paymentType = "CASH") => {
  console.log(orderId)
  if (!sessionStorage.email) {
    setShowLoginModal(true);
    return;
  }

  if (!sessionStorage.getItem("email")) {
    console.error('User email not found in sessionStorage');
    return;
  }
  
  const requestPayment = {
    amount: '1,999,999',
    orderId: '010-4593-2863',
    orderName: '김윤기',
    userEmail: sessionStorage.getItem("email"),
    successUrl: 'http://www.trable.kro.kr:9090/api/user/toss/success',
    failUrl: 'http://www.trable.kro.kr:9090/api/user/toss/fail',
    payType: paymentType
  }

  if (window.confirm('예약 정보를 확인하셨습니까? 결제를 진행합니다.')) {
    try {
      const payments = tossPayment(requestPayment, paymentType);
      const tossPayments = await loadTossPayments(clientKey);
      tossPayments.requestPayment(paymentType, {
        amount: amount,
        orderId: orderId,
        orderName: orderName,
        customerEmail: sessionStorage.getItem("email"),
        successUrl: 'http://www.trable.kro.kr:9090/api/user/toss/success',
        failUrl: 'http://www.trable.kro.kr:9090/api/user/toss/fail'
      }).then(response => {
        console.log('Payment successful:', response);
        const successful = bookingComplete({ email, orderId })
        if(response.status >= 200 && response.between < 300){
          navigate('/success-page');
        }
        setShowBookResultModal(true);
      }).catch(error => {
        console.error('Payment error:', error);
      });
    } catch (error) {
      console.error('Failed to load Toss Payments SDK:', error);
    }
  } else {
    const data = {
      userEmail: email,
      orderId: orderId
    };
    const orderCalcelFail = bookinFail(data);
    if (orderCalcelFail) {
      return ("결제 취소 성공");
    } else {
      return ("결제 취소 실패 관리자에게 문의 바람")
    }
  }
};

const handleBook_Yoon = async (e) => {
  const email = sessionStorage.getItem('email');
  if (!email) {
    console.error('이메일 정보가 없습니다.');
    return; // 이메일이 없다면 함수를 빠져나갑니다.
  }

  // 예시로 몇 가지 값을 하드코딩하거나 다른 방식으로 값을 설정해야 할 수 있습니다.
  const selectedTrain = { id: 'train123' }; // 예시 값
  const train = { date: new Date().toDateString() }; // 예시 값
  const selectedSeatType_train = '일반석'; // 예시 값
  const orderId = `order_${selectedTrain.id}_${Date.now()}`;
  e.preventDefault();
  const data = {
      userEmail: email,
      scheduleId: selectedTrain.id,
      orderId: orderId,
      orderDate: train.date,
      grade: selectedSeatType_train,
      seatOrderNum: 1
  }
  const bookingResult = booking(data); // `booking` 함수는 정의되어 있어야 합니다.

  if (bookingResult) {
    await handlePayment('1999999', orderId, `김윤기`, email); // `handlePayment` 함수 역시 정의되어 있어야 합니다.
  } else {
    console.error('예약 실패');
  }
};
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.info}>
          <p style={styles.companyInfo}>
            대표이름: <button type="button" onClick={handleBook_Yoon} style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>김윤기</button> | 대표번호: 010-4593-2863
          </p>
          <p style={styles.address}>주소: 서울특별시 강남구 테헤란로 123-45</p>
          <p>&copy; 2024 MyWebsite. All rights reserved.</p>
        </div>
        <ul style={styles.nav}>
          <li style={styles.navItem}><a href="/" style={styles.link}>홈</a></li>
          <li style={styles.navItem}><Link to="/footer/Location" style={styles.link}>찾아오시는길</Link></li>
          <li style={styles.navItem}><Link to="/footer/TermsofUse" style={styles.link}>이용약관</Link></li>
          <li style={styles.navItem}><Link to="/footer/TravelTermsandConditions" style={styles.link}>여행약관</Link></li>
        </ul>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'black',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  info: {
    textAlign: 'left', // 좌측 정렬
    color :'white'
  },
  companyInfo: {
    margin: 0,
    fontSize: '16px', // 폰트 사이즈 조정
    color :'white'
  },
  address: {
    margin: '5px 0', // 주소와 다른 텍스트 사이의 간격 조정
    fontSize: '14px', // 폰트 사이즈 조정
    color :'white'
  },
  nav: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    margin: 0,
 
  },
  navItem: {
    marginRight: '20px',
    
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  }
}

export default Footer;

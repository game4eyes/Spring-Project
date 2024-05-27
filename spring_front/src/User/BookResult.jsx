import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Layout from "../components/Layout";
import '@/css/form/bookresult.css';
const Bookresult = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // URL에서 쿼리 매개변수 값들을 읽어옴
    const railName = searchParams.get('railName');
    const trainClass = searchParams.get('trainClass');
    const trainNo = searchParams.get('trainNo');
    const departureTime = searchParams.get('departureTime');

    const departure = searchParams.get('departure');
    const destination = searchParams.get('destination');
    const hour = searchParams.get('hour');
    const dayz = searchParams.get('dayz');
    const date = searchParams.get('date');
    const price = searchParams.get('price');
    const [cookies, setCookie] = useCookies(['userEmail', 'bookingInfo']); // bookingInfo 쿠키를 사용하여 예약 정보를 저장

    const bookingcancel = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('예약을 취소하시겠습니까?');
        if (isConfirmed) {
            // 예를 선택한 경우
            alert('예약이 취소되었습니다');
            window.location.href = '/ticketbook/train';
        } else {
            // 아니오를 선택한 경우
            // 아무 동작도 수행하지 않습니다.
        }
    }



    const handlePayment = () => {
        // 결제 버튼을 누를 때, 해당 정보를 쿠키에 저장
        const bookingInfo = {
            railName,
            trainClass,
            trainNo,
            departureTime,
            departure,
            destination,
            hour,
            dayz,
            date,
            price

        };

        setCookie('bookingInfo', bookingInfo, { path: '/' });
        // 결제 로직 수행...
        Navigate('/');
    };

    return (
        // <Layout title="예약 정보 확인">
            <div className="bookresultcontainer">
                <h2 style={{ marginBottom: '30px' }}>예약 내용이 다음과 같습니까?</h2>
                <hr></hr>

                <h2 style={{ marginBottom: '30px' }}>프로필</h2>
                <div className="form-group">
                    <label>이메일</label>
                    <span>{cookies.userEmail}</span>
                </div>
                <div className="form-group">
                    <label>닉네임</label>
                    <span>닉네임 정보 입력(하드코딩)</span>
                </div>
                <hr style={{marginTop:'20px', marginBottom:'30px'}} />
                <h2 style={{marginBottom:'30px'}}>열차 정보</h2>
                <div>
                    <p>출발지: {departure}</p>
                    <p>도착지: {destination}</p>
                    <p>가격 : {price}</p>
                    <p>날짜 : {date}</p>
                    <p>시간: {hour}</p>
                    <p>요일: {dayz}</p>
                    <p>열차 이름: {railName}</p>
                    <p>열차 종류: {trainClass}</p>
                    <p>열차 번호: {trainNo}</p>
                    <p>출발 시간: {departureTime}</p>
                    {/* 필요한 열차 정보를 여기에 추가 */}
                </div>

                <div style={{ display: 'flex' ,marginBottom:'30px'}}>
                    <button type="button" style={{marginRight:'40px'}} onClick={handlePayment}>결제</button>
                    <button type="button" onClick={bookingcancel}>취소</button>
                </div>
            </div>
       // </Layout>
    );
};

export default Bookresult;

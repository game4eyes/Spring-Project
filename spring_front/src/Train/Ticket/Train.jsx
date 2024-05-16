import React, { useState } from 'react';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Ad from '../../components/Ad';
import Footer from '../../components/Footer';
import Charge from '../../components/Charge';

// 기차 예약 컴포넌트
const Train = () => {
    // 초기 상태 정의
    const initState = {
        departure: '',            // 출발지
        destination: '',          // 도착지
        date: '',                 // 출발일
        passengerCount: '',       // 인원
        isRoundTrip: false,       // 왕복 여부
        selectedTrain: null,      // 선택된 기차 정보
        isDepartureModalOpen: false // 출발지 모달 창 열림 여부
    };

    // 상태(state)와 상태를 변경하는 함수(setter) 정의
    const [trainticket, setTrainticket] = useState(initState);

    // 출발지 변경 이벤트 핸들러
    const handleDepartureChange = (e) => {
        setTrainticket(prevState => ({
            ...prevState,
            departure: e.target.value
        }));
    };


    
    // 도착지 변경 이벤트 핸들러
    const handleDestinationChange = (e) => {
        setTrainticket(prevState => ({
            ...prevState,
            destination: e.target.value
        }));
    };

    // 출발일 변경 이벤트 핸들러
    const handleDateChange = (e) => {
        setTrainticket(prevState => ({
            ...prevState,
            date: e.target.value
        }));
    };

    // 인원 변경 이벤트 핸들러
    const handlePassengerCountChange = (e) => {
        setTrainticket(prevState => ({
            ...prevState,
            passengerCount: e.target.value
        }));
    };

    // 팝업 열기 이벤트 핸들러
    const openPopup = (stationClass,id) => () => {
        const value = id === 'departure' ? trainticket.departure='departure': trainticket.destination='destination';
        
        const params = new URLSearchParams({
            [id]: value,
            stationClass: stationClass.toString(), 
        });
        window.open(`http://localhost:5173/search/searchtrain?${params}`, '_blank', 'width=600,height=400');
    };

    // 예약 양식 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: 예약 정보 처리
    };


    const changeDepartureDestination = ( ) => {
        let tmp ="";
        tmp=document.getElementById("departure").value;
        document.getElementById("departure").value=document.getElementById("destination").value;
        document.getElementById("destination").value = tmp;



    }



    // JSX 반환
    return (
        <div className="train_book">
        <form onSubmit={handleSubmit}>
            <Header/>
            <Article title="기차 승차권 예매" body="정보 입력" />
            <h4>기차 예약</h4>
            {/* 출발지 입력란 */}
            <label>
                출발지:
                <input
                    type="text"
                    value={trainticket.departure}
                    onChange={handleDepartureChange}
                    placeholder="출발지를 입력하세요"
                    onClick={openPopup('3','departure')} // 클릭한 대상의 ID를 전달
                    id="departure"
                />
            </label>
            <br />
            {/* 도착지 입력란 */}
            <label>
                도착지:
                <input
                    type="text"
                    value={trainticket.destination}
                    onChange={handleDestinationChange}
                    placeholder="도착지를 입력하세요"
                    onClick={openPopup('3','destination')} // 클릭한 대상의 ID를 전달
                    id="destination"
                />
            </label>
            <br />
            <button type ="button" onClick={changeDepartureDestination}>출발지↔도착지</button>

            {/* 출발일 선택란 */}
            <label>
                출발일:
                <input type="date" onChange={handleDateChange} />
            </label>
            <br />
            {/* 인원 선택란 */}
            <label>
                인원:
                <select value={trainticket.passengerCount} onChange={handlePassengerCountChange}>
                    <option value="">인원을 선택하세요</option>
                    <option value="1">1명</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                    <option value="4">4명</option>
                    <option value="5">5명</option>
                </select>
            </label>
            <br />
            {/* 예약하기 버튼 */}
            <button type="submit">예매하기</button>
            {/* 요금제 컴포넌트 */}
            <Charge id={2}/>
        </form>
        {/* 광고 컴포넌트 */}
        <Ad/>
        {/* 푸터 컴포넌트 */}
        <Footer />
    </div>
    );
};

export default Train;

import React, { useState } from 'react';
import BusSeat from '../../components/BusSeat';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Ad from '../../components/Ad';
import Footer from '../../components/Footer';
import Charge from '../../components/Charge';




const Airport = () => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [passengerCount, setPassengerCount] = useState('');
    const [disability, setDisability] = useState(false);
    const [legroom, setLegroom] = useState(false);
    const [window, setWindow] = useState(false);

    // 출발지 변경 시 호출될 함수
    const handleDepartureChange = (e) => {
        console.log('출발지:', e.target.value);
        setDeparture(e.target.value);
    };

    // 도착지 변경 시 호출될 함수
    const handleDestinationChange = (e) => {
        console.log('도착지:', e.target.value);
        setDestination(e.target.value);
    };

    // 날짜 변경 시 호출될 함수
    const handleDateChange = (e) => {
        console.log('날짜:', e.target.value);
        setDate(e.target.value);
    };

    // 시간 변경 시 호출될 함수
    const handleTimeChange = (e) => {
        console.log('시간:', e.target.value);
        setTime(e.target.value);
    };

    // 인원 변경 시 호출될 함수
    const handlePassengerCountChange = (e) => {
        console.log('인원:', e.target.value);
        setPassengerCount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            departure,
            destination,
            date,
            time,
            passengerCount
        });
    };

    return (
        <div className="airport_book">
        <form onSubmit={handleSubmit}>
            <Header/>
            <Article title ="공항 승차권 예매" body ="정보 입력"></Article>
            <h3>공항 예약</h3>
            
            <label>
                출발지:
                <select value={departure} onChange={handleDepartureChange}>
                    <option value="">출발지를 선택하세요</option>
                    <option value="서울">서울</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                </select>
            </label>
            <br />
            <label>
                도착지:
                <select value={destination} onChange={handleDestinationChange}>
                    <option value="">도착지를 선택하세요</option>
                    <option value="서울">서울</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                </select>
            </label>
            <br />
            <label>
                출발일:
                <input type="date" onChange={handleDateChange} />
            </label>
            <br />
        <div>
          <input
            type="checkbox"
            checked={disability}
            onChange={() => setDisability(!disability)}
          />
          <label>장애가 있습니다.</label>
        </div>
        <br/>
        <div>
          <input
            type="checkbox"
            checked={legroom}
            onChange={() => setLegroom(!legroom)}
          />
          <label>Legroom</label>
        </div>
        <br/>
        <div>
          <input
            type="checkbox"
            checked={window}
            onChange={() => setWindow(!window)}
          />
          <label>Window Seat</label>
        </div>
            {/* <label>
                시간:
                <select value={time} onChange={handleTimeChange}>
                    <option value="">시간을 선택하세요</option>
                    <option value="06:00">06:00</option>
                    <option value="09:00">09:00</option>
                    <option value="12:00">12:00</option>
                    <option value="15:00">15:00</option>
                    <option value="18:00">18:00</option>
                </select>
            </label>
            <br /> */}

            {/* <label>
                인원:
                <select value={passengerCount} onChange={handlePassengerCountChange}>
                    <option value="">인원을 선택하세요</option>
                    <option value="1">1명</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                    <option value="4">4명</option>
                    <option value="5">5명</option>
                </select>
            </label>
            <br /> */}

            <button type="submit">예매하기</button>
        
        <Charge id={3}/>
        </form>
        <Ad/>
        <Footer />
        </div>
    );
};

export default Airport;

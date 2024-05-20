import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Ad from '../../components/Ad';
import Footer from '../../components/Footer';
import Charge from '../../components/Charge';
import DateInput from '../PlaneComponent/DateInput';
import SelectInput from '../PlaneComponent/SelectInput';
import Checkbox from '../PlaneComponent/Checkbox';
import TimeInput from '../PlaneComponent/TimeInput';
import AirportsData from '../PlaneComponent/AirportsData';
import { getAirInfo } from '../../api/dataApi';
import FlightList from '../PlaneComponent/FlightList';

const Plane = () => {
    const today = new Date().toISOString().split('T')[0];
    const [ticketInfo, setTicketInfo] = useState({
        departure: '',
        destination: '',
        date: today,
        time: '06:00',
        dayz: '',
        passengerCount: '1',
        seatType: 'standard',
        disability: false,
        legroom: false,
        window: false
    });
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        // 요일을 설정하는 로직
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = days[new Date(ticketInfo.date).getDay()];
        const formattedHour = ticketInfo.time.split(':')[0]; // "06:00"에서 "06"만 추출
    
        if (ticketInfo.departure && ticketInfo.destination && formattedHour && dayOfWeek) {
            getAirInfo(ticketInfo.departure, ticketInfo.destination, formattedHour, dayOfWeek)
                .then(data => {
                    console.log("API Data Received:", data);
                    setFlights(data);
                })
                .catch(err => {
                    console.error('Failed to fetch flights:', err);
                    setFlights([]); // 오류 발생 시 flights 배열 비우기
                });
        }
    
        // 상태 업데이트는 API 호출 조건 검사 이후에 수행
        setTicketInfo(prev => ({ ...prev, dayz: dayOfWeek }));
    }, [ticketInfo.departure, ticketInfo.destination, ticketInfo.date, ticketInfo.time]);

    // 출발지와 도착지 옵션 로직은 변경 없음
    const getValidDepartureOptions = () => {
        return AirportsData.filter(airport => Object.keys(routes).includes(airport.stationID.toString()))
                           .map(airport => ({
                               value: airport.stationID,
                               label: airport.stationName
                           }));
    };
    const getDestinationOptions = () => {
        return routes[ticketInfo.departure] ? 
               AirportsData.filter(airport => routes[ticketInfo.departure].includes(airport.stationID.toString()))
                           .map(airport => ({
                               value: airport.stationID,
                               label: airport.stationName
                           })) 
               : [];
    };
    const routes = {
        "3500001": ["3500003", "3500004", "3500013", "3500012", "3500008"],
        "3500004": ["3500003"],
        "3500003": ["3500005", "3500006", "3500008"],
        "3500002": ["3500004"],
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(ticketInfo);
    };

    return (
        <div className="plane_book">
            <Header />
            <Article title="공항 승차권 예매" body="정보 입력" />
            <form onSubmit={handleSubmit}>
                <SelectInput label="출발지" value={ticketInfo.departure} onChange={e => setTicketInfo({...ticketInfo, departure: e.target.value})} options={getValidDepartureOptions()} /><br/>
                <SelectInput label="도착지" value={ticketInfo.destination} onChange={e => setTicketInfo({...ticketInfo, destination: e.target.value})} options={getDestinationOptions()} disabled={!ticketInfo.departure} /><br/>
                <DateInput label="출발일" value={ticketInfo.date} onChange={e => setTicketInfo({...ticketInfo, date: e.target.value})} /><br/>
                <TimeInput label="출발 시간" value={ticketInfo.time} onChange={e => setTicketInfo({...ticketInfo, time: e.target.value})} />
                <SelectInput label="인원" value={ticketInfo.passengerCount} onChange={e => setTicketInfo({...ticketInfo, passengerCount: e.target.value})} options={Array.from({length: 10}, (_, i) => ({value: i + 1, label: `${i + 1}명`}))} />
                <SelectInput label="좌석 유형" value={ticketInfo.seatType} onChange={e => setTicketInfo({...ticketInfo, seatType: e.target.value})} options={[{value: 'standard', label: '일반'}, {value: 'premium', label: '프리미엄'}]} />
                <Checkbox checked={ticketInfo.disability} onChange={() => setTicketInfo({...ticketInfo, disability: !ticketInfo.disability})} label="장애가 있습니다" />
                <Checkbox checked={ticketInfo.legroom} onChange={() => setTicketInfo({...ticketInfo, legroom: !ticketInfo.legroom})} label="Legroom" />
                <Checkbox checked={ticketInfo.window} onChange={() => setTicketInfo({...ticketInfo, window: !ticketInfo.window})} label="Window Seat" />
                <FlightList flights={flights} />
                <button type="submit">조회하기</button>
            </form>
            <Charge id={3} />
            <Ad />
            <Footer />
        </div>
    );
};

export default Plane;

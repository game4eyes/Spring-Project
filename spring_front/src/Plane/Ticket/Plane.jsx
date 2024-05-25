import React, { useState } from 'react';
import DateInput from '../PlaneComponent/DateInput';
import SelectInput from '../PlaneComponent/SelectInput';
import Checkbox from '../PlaneComponent/Checkbox';
import TimeInput from '../PlaneComponent/TimeInput';
import AirportsData from '../PlaneComponent/AirportsData';
import Layout from '../../components/Layout';
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
        window: false,
        fare: 0,
        operator: '', // 추가: 항공사 이름
    });

    const [flights, setFlights] = useState([]);
    const [selectedDepartureTime, setSelectedDepartureTime] = useState(ticketInfo.time);

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
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = days[new Date(ticketInfo.date).getDay()];
        const formattedHour = ticketInfo.time.split(':')[0];

        getAirInfo(ticketInfo.departure, ticketInfo.destination, formattedHour, dayOfWeek)
            .then(data => {
                console.log("API Data Received:", data);
                setFlights(data);
            })
            .catch(err => {
                console.error('Failed to fetch flights:', err);
                setFlights([]);
            });

        setTicketInfo(prev => ({ ...prev, dayz: dayOfWeek }));
    };

    const onSelectFareAndBook = (flight, fare, departureTime) => {
        setTicketInfo(prev => {
            const updatedTicketInfo = { ...prev, fare, operator: flight.airline, time: departureTime };

            const bookingData = {
                email: 'user@example.com', // 사용자 이메일
                startStationId: parseInt(updatedTicketInfo.departure),
                endStationId: parseInt(updatedTicketInfo.destination),
                startStationName: AirportsData.find(airport => airport.stationID === parseInt(updatedTicketInfo.departure)).stationName,
                endStationName: AirportsData.find(airport => airport.stationID === parseInt(updatedTicketInfo.destination)).stationName,
                stationClass: null, // 항공편의 경우 사용하지 않음
                operator: updatedTicketInfo.operator, // FlightList에서 선택된 항공사 이름
                grade: updatedTicketInfo.seatType,
                seatNum: parseInt(updatedTicketInfo.passengerCount),
                busSeatNum: null, // 항공편의 경우 사용하지 않음
                date: updatedTicketInfo.date,
                departureTime: updatedTicketInfo.time,
                arrivalTime: null, // 필요 시 추가
                amount: updatedTicketInfo.fare
            };

            console.log('보내야 하는 데이터임!!!!! : ', bookingData); // bookingData를 로그에 출력합니다.

            // history.push('/confirmation', { bookingData }); @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 데이터 예약 완료로 보내기 위해 있음


            return updatedTicketInfo;
        });
    };

    console.log('이게 티켓정보임 : ', ticketInfo); // 여기서 ticketInfo 값을 확인합니다.

    const [popupWindow, setPopupWindow] = useState(null);

    const handleChargeClick = () => {
        const newPopup = window.open('http://localhost:5173/pay/chargeinfo/plane', '_blank', 'width=600,height=400');
        setPopupWindow(newPopup);
    };

    const departureName = AirportsData.find(airport => airport.stationID === parseInt(ticketInfo.departure))?.stationName || '';
    const destinationName = AirportsData.find(airport => airport.stationID === parseInt(ticketInfo.destination))?.stationName || '';

    return (
        <Layout title="공항 승차권 예매" body="정보 입력">
            <div className="plane_book">
                <form onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: 'left', marginBottom: '50px' }}>공항 예약</h2>
                    <SelectInput label="출발지" value={ticketInfo.departure} onChange={e => setTicketInfo({...ticketInfo, departure: e.target.value})} options={getValidDepartureOptions()} /><br/>
                    <SelectInput label="도착지" value={ticketInfo.destination} onChange={e => setTicketInfo({...ticketInfo, destination: e.target.value})} options={getDestinationOptions()} disabled={!ticketInfo.departure} /><br/>
                    <DateInput label="출발일" value={ticketInfo.date} onChange={e => setTicketInfo({...ticketInfo, date: e.target.value})} /><br/>
                    <TimeInput label="출발 시간" value={selectedDepartureTime} onChange={e => setSelectedDepartureTime(e.target.value)} /><br/>
                    <SelectInput label="인원" value={ticketInfo.passengerCount} onChange={e => setTicketInfo({...ticketInfo, passengerCount: e.target.value})} options={Array.from({length: 10}, (_, i) => ({value: i + 1, label: `${i + 1}명`}))} /><br/>
                    <SelectInput label="좌석 유형" value={ticketInfo.seatType} onChange={e => setTicketInfo({...ticketInfo, seatType: e.target.value})} options={[{value: 'standard', label: '일반'}, {value: 'premium', label: '프리미엄'}]} />
                    <Checkbox checked={ticketInfo.disability} onChange={() => setTicketInfo({...ticketInfo, disability: !ticketInfo.disability})} label="장애가 있습니다" />
                    <Checkbox checked={ticketInfo.legroom} onChange={() => setTicketInfo({...ticketInfo, legroom: !ticketInfo.legroom})} label="Legroom" />
                    <Checkbox checked={ticketInfo.window} onChange={() => setTicketInfo({...ticketInfo, window: !ticketInfo.window})} label="Window Seat" />
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginRight: '10px', marginBottom: '35px'}}>
                        <button type="submit">조회하기</button>
                        <button type="button" style={{ backgroundColor: 'green' }} onClick={handleChargeClick} className="fee-check-button">수수료확인</button>
                    </div>
                    <FlightList 
                        flights={flights} 
                        onSelectFareAndBook={(flight, fare, departureTime) => onSelectFareAndBook(flight, fare, departureTime)} 
                        departureName={departureName} 
                        destinationName={destinationName} 
                        selectedDepartureTime={selectedDepartureTime} // 추가: 사용자가 선택한 출발 시간을 전달
                    />
                </form>
            </div>
        </Layout>
    );
};

export default Plane;

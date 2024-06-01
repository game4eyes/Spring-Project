import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import DateInput from '../PlaneComponent/DateInput';
import SelectInput from '../PlaneComponent/SelectInput';
import Checkbox from '../PlaneComponent/Checkbox';
import TimeInput from '../PlaneComponent/TimeInput';
import AirportsData from '../PlaneComponent/AirportsData';
import Layout from '../../components/Layout';
import { getAirInfo } from '../../api/dataApi';
import FlightList from '../PlaneComponent/FlightList';
import StartStationList from '../../components/StartStationList';
import EndStationList from '../../components/EndStationList';

const Plane = () => {
    const today = new Date().toISOString().split('T')[0];
    const [cookies] = useCookies(['userEmail']);
    const userEmail = cookies.userEmail || '';
    const [ticketInfo, setTicketInfo] = useState({
        departure: '',
        destination: '',
        date: today,
        // time: '06:00',
        departureTime: '06',
        weekdayCarrier: '',
        dayz: '',
        passengerCount: '1',
        seatType: '',
        disability: false,
        legroom: false,
        window: false,
        fare: 0,
        operator: '',
        userEmail: userEmail,
        startStationName: '',
        endStationName: ''
    });

    const [flights, setFlights] = useState([]);
    const [selectedDepartureTime, setSelectedDepartureTime] = useState(ticketInfo.departureTime);

    // const getValidDepartureOptions = () => {
    //     return AirportsData.filter(airport => Object.keys(routes).includes(airport.stationID.toString()))
    //                        .map(airport => ({
    //                            value: airport.stationID,
    //                            label: airport.stationName
    //                        }));
    // };

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

    const handleStartStationIdChange = (Id, name) => {
        setTicketInfo(prevState => ({
            ...prevState,
            departure: Id,
            startStationName: name,
            destination: '',
        }));
    };

    const handleEndStationIdChange = (Id, name) => {
        setTicketInfo(prevState => ({
            ...prevState,
            destination: Id,
            endStationName: name,
        }));
    };


    const handleHourChange = (e) => {
        setTicketInfo(prevTicketInfo => ({
            ...prevTicketInfo,
            departureTime: e.target.value
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = days[new Date(ticketInfo.date).getDay()];
        const formattedHour = selectedDepartureTime.split(':')[0];

        if (!ticketInfo.departure) {
            alert('출발지를 선택해주세요.');
            return;
        }

        if (!ticketInfo.destination) {
            alert('도착지를 선택해주세요.');
            return;
        }

        if (!ticketInfo.seatType) {
            alert('좌석 유형을 선택해주세요.');
            return;
        }

        // getAirInfo(ticketInfo.departure, ticketInfo.destination, formattedHour, dayOfWeek)
        //     .then(data => {
        //         console.log("API Data Received:", data);
        //         setFlights(data);
        //     })
        //     .catch(err => {
        //         console.error('Failed to fetch flights:', err);
        //         setFlights([]);
        //     });

        // setTicketInfo(prev => ({ ...prev, dayz: dayOfWeek }));

         getAirInfo(ticketInfo.departure, ticketInfo.destination, ticketInfo.weekdayCarrier,ticketInfo.departureTime)
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
            const updatedTicketInfo = { ...prev, fare, operator: flight.airline, departureTime: flight.departureTime, arrivalTime: flight.arrivalTime };

            const bookingData = {
                email: userEmail,
                startStationId: parseInt(updatedTicketInfo.departure),
                endStationId: parseInt(updatedTicketInfo.destination),
                startStationName: AirportsData.find(airport => airport.stationID === parseInt(updatedTicketInfo.departure)).stationName,
                endStationName: AirportsData.find(airport => airport.stationID === parseInt(updatedTicketInfo.destination)).stationName,
                stationClass: null,
                operator: updatedTicketInfo.operator,
                grade: updatedTicketInfo.seatType,
                seatNum: parseInt(updatedTicketInfo.passengerCount),
                busSeatNum: null,
                date: updatedTicketInfo.date,
                departureTime: updatedTicketInfo.departureTime,
                arrivalTime: updatedTicketInfo.arrivalTime,
                amount: updatedTicketInfo.fare
            };

            console.log('보내야 하는 데이터임!!!!! : ', bookingData);

            localStorage.setItem('bookingData', JSON.stringify(bookingData));
            localStorage.setItem('flight', JSON.stringify(flight));
            localStorage.setItem('flight_departureName', JSON.stringify(bookingData.startStationName));
            localStorage.setItem('flight_destinationName', JSON.stringify(bookingData.endStationName));

            return updatedTicketInfo;
        });
    };

    console.log('이게 티켓정보임 : ', ticketInfo);

    const [popupWindow, setPopupWindow] = useState(null);

    const handleChargeClick = () => {
        const newPopup = window.open('http://localhost:5173/pay/chargeinfo/plane', '_blank', 'width=600,height=400');
        setPopupWindow(newPopup);
    };

    const handleweekdayCarrierChange = (e) => {
        setTicketInfo(prevTicketInfo => ({
            ...prevTicketInfo,
            weekdayCarrier: e.target.value
        }));
    };

    const departureName = AirportsData.find(airport => airport.stationID === parseInt(ticketInfo.departure))?.stationName || '';
    const destinationName = AirportsData.find(airport => airport.stationID === parseInt(ticketInfo.destination))?.stationName || '';

    return (
        <Layout title="공항 승차권 예매" body="정보 입력">
            <div className="plane_book">
                <form onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: 'left', marginBottom: '50px' }}>공항 예약</h2>
                    <StartStationList
                        stationTypeId={'2'}
                        onStationSelect={handleStartStationIdChange}
                    // options={getValidDepartureOptions()}
                    />
                    <EndStationList
                        startStationId={ticketInfo.departure}
                        onStationSelect={handleEndStationIdChange}
                        // options={getDestinationOptions()} 
                        disabled={!ticketInfo.departure}
                    />
                    <DateInput
                        label="출발일"
                        value={ticketInfo.date}
                        onChange={e => setTicketInfo({ ...ticketInfo, date: e.target.value })}
                    /><br />
                    {/* <TimeInput 
                        label="출발 시간" 
                        value={selectedDepartureTime} 
                        onChange={e => setSelectedDepartureTime(e.target.value)} 
                    /><br/> */}
                    <div>
                    <label>
                        요일 <br></br>
                        <select value={ticketInfo.weekdayCarrier} onChange={handleweekdayCarrierChange}>
                            <option value="">시간을 선택하세요</option>
                            <option value="일">일</option>
                            <option value="월">월</option>
                            <option value="화">화</option>
                            <option value="수">수</option>
                            <option value="목">목</option>
                            <option value="금">금</option>
                            <option value="토">토</option>
                        </select>
                    </label>
                    </div>
                    <div>
                        <label>
                            시간
                            <select style={{ width: '50%', marginLeft: '10px' }} value={ticketInfo.departureTime} onChange={handleHourChange}>
                                <option value="">시간을 선택하세요</option>
                                <option value="00">00:00</option>
                                <option value="01">01:00</option>
                                <option value="02">02:00</option>
                                <option value="03">03:00</option>
                                <option value="04">04:00</option>
                                <option value="05">05:00</option>
                                <option value="06">06:00</option>
                                <option value="07">07:00</option>
                                <option value="08">08:00</option>
                                <option value="09">09:00</option>
                                <option value="10">10:00</option>
                                <option value="11">11:00</option>
                                <option value="12">12:00</option>
                                <option value="13">13:00</option>
                                <option value="14">14:00</option>
                                <option value="15">15:00</option>
                                <option value="16">16:00</option>
                                <option value="17">17:00</option>
                                <option value="18">18:00</option>
                                <option value="19">19:00</option>
                                <option value="20">20:00</option>
                                <option value="21">21:00</option>
                                <option value="22">22:00</option>
                                <option value="23">23:00</option>
                            </select>
                        </label>
                    </div>

                    <SelectInput
                        label="인원"
                        value={ticketInfo.passengerCount}
                        onChange={e => setTicketInfo({ ...ticketInfo, passengerCount: e.target.value })}
                        options={Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `${i + 1}명` }))}
                    /><br />
                    <SelectInput
                        label="좌석 유형"
                        value={ticketInfo.seatType}
                        onChange={e => setTicketInfo({ ...ticketInfo, seatType: e.target.value })}
                        options={[{ value: 'economy', label: '이코노미' }, { value: 'business', label: '비즈니스' }, { value: 'first', label: '퍼스트' }]}
                        required
                    />
                    <Checkbox
                        checked={ticketInfo.disability}
                        onChange={() => setTicketInfo({ ...ticketInfo, disability: !ticketInfo.disability })}
                        label="장애가 있습니다"
                    />
                    <Checkbox
                        checked={ticketInfo.legroom}
                        onChange={() => setTicketInfo({ ...ticketInfo, legroom: !ticketInfo.legroom })}
                        label="Legroom"
                    />
                    <Checkbox
                        checked={ticketInfo.window}
                        onChange={() => setTicketInfo({ ...ticketInfo, window: !ticketInfo.window })}
                        label="Window Seat"
                    />
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginRight: '10px', marginBottom: '35px' }}>
                        <button type="submit">조회하기</button>
                        <button type="button" style={{ backgroundColor: 'green' }} onClick={handleChargeClick} className="fee-check-button">수수료확인</button>
                    </div>
                    <FlightList
                        flights={flights}
                        onSelectFareAndBook={onSelectFareAndBook}
                        startStationName={ticketInfo.startStationName}
                        endStationName={ticketInfo.endStationName}
                        departure={ticketInfo.departure}
                        destination={ticketInfo.destination}
                         departureName={ticketInfo.departureName} 
                        // destinationName={destinationName} 
                        // selectedDepartureTime={selectedDepartureTime}
                        weekdayCarrier ={ticketInfo.weekdayCarrier}

                    />
                </form>
            </div>
        </Layout>
    );
};

export default Plane;

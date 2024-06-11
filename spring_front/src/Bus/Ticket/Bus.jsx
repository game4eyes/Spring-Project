import React, { useEffect, useState } from 'react';
import BusList from '../Search/list/BusList';
import Charge from '../../components/Charge';
import { getEndStationList } from '../../api/dataApi';
import Layout from '../../components/Layout';
import '@/css/form/bookingform.css';
import StartStationList from '../../components/StartStationList';
import EndStationList from '../../components/EndStationList';
import '@/css/List.css';

const Bus = () => {
    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().slice(0, 10);
    };

    const today = new Date();
    const tomorrow = addDays(today, 1);

    const ticketInfo = {
        departure: '',
        destination: '',
        departureDate: tomorrow,
        returnDate: '',
        passengerCount: '',
        isRoundTrip: false,
        gradeCarrier: "전체",
        isDepartureModalOpen: false,
        startStationId: '',
        endStationId: '',
        departureTime: '06',
        dayz: '',
    };

    const [bus, setBus] = useState(ticketInfo);
    const [popupWindow, setPopupWindow] = useState(null);

    useEffect(() => {
        if (bus.startStationId) {
            getEndStationList(bus.startStationId)
                .then(data => {
                    setBus(prevState => ({
                        ...prevState,
                        endStations: data,
                    }));
                });
        }
    }, [bus.startStationId]);

    const handleStartStationIdChange = (Id, name) => {
        setBus(prevState => ({
            ...prevState,
            startStationId: Id,
            departure: name, // Update departure stationName
            endStationId: '', // Reset end station when start station changes
            endStations: [], // Reset end stations list
        }));
    };

    const handleEndStationIdChange = (Id, name) => {
        setBus(prevState => ({
            ...prevState,
            endStationId: Id,
            destination: name, // Update destination stationName
        }));
    };

    const handleChange = (key, value) => {
        setBus(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bus);
        setBus(prevState => ({
            ...prevState,
            isDepartureModalOpen: true
        }));
    };

    const handleDepartureTimeChange = (e) => {
        setBus(prevState => ({
            ...prevState,
            departureTime: e.target.value
        }));
    };

    const handleChargeClick = () => {
        const newPopup = window.open('http://localhost:5173/pay/chargeinfo/bus', '_blank', 'width=600,height=400');
        setPopupWindow(newPopup);
    };

    return (
        <Layout title="버스 승차권 예매" body="정보 입력">
            <div className="bus_book">
                <form onSubmit={handleSubmit} style={{ marginLeft: '10%' }}>
                    <h2 style={{ textAlign: 'left', marginBottom: '50px', marginTop: '30px' }}>버스 예약</h2>
                    <div className="col1">
                        <div> {/* 출발지 */}
                            <StartStationList stationTypeId={'1'} onStationSelect={handleStartStationIdChange} />
                        </div>
                        <div> {/* 도착지 */}
                            <EndStationList startStationId={bus.startStationId} onStationSelect={handleEndStationIdChange} />
                        </div>

                    <label>
                        가는 날<br></br>
                        <input 
                            type="date" 
                            value={bus.departureDate} 
                            min={tomorrow} 
                            onChange={(e) => handleChange('departureDate', e.target.value)} 
                            style={{ width: '50%', marginLeft: '10px' }} 
                        />
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={bus.isRoundTrip} onChange={() => handleChange('isRoundTrip', !bus.isRoundTrip)} />
                        왕복 여행<br></br>
                    </label>
                    <br />
                    {bus.isRoundTrip && (
                        <label>
                            <input
                                type="date"
                                value={bus.returnDate}
                                onChange={(e) => handleChange('returnDate', e.target.value)}
                                min={bus.departureDate}
                                style={{ width: '50%', marginLeft: '10px' }}
                            />
                        </label>
                    )}
                    {!bus.isRoundTrip && (
                        <label>
                            오는 날<br></br>
                            <input
                                type="date"
                                value={bus.returnDate}
                                onChange={(e) => handleChange('returnDate', e.target.value)}
                                min={bus.departureDate}
                                disabled
                                style={{ width: '50%', marginLeft: '10px' }}
                            />
                        </label>
                    )}
                    <br />
                    버스등급<br></br>
                    <select style={{ width: '50%', marginLeft: '10px' }} value={bus.gradeCarrier} onChange={(e) => handleChange('gradeCarrier', e.target.value)}>
                        <option value="전체">전체</option>
                        <option value="일반">일반</option>
                        <option value="우등">우등</option>
                        <option value="심야 일반">심야 일반</option>
                        <option value="심야 우등">심야 우등</option>
                        <option value="프리미엄">프리미엄</option>
                        <option value="심야 프리미엄">심야 프리미엄</option>
                    </select>
                    <br />
                    <br/>
                    <div>
                        <label>
                            시간<br></br>
                            <select style={{ width: '50%', marginLeft: '10px' }} value={bus.departureTime} onChange={handleDepartureTimeChange}>
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
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '85px', marginRight: '10px', marginBottom: '35px' }}>
                        <button type="submit" style={{ marginTop: '0px', marginRight: '40px' }}>조회하기</button>
                        <button type="button" style={{ backgroundColor: 'green' }} className='fee-check-button' onClick={handleChargeClick}>수수료확인</button>
                    </div>
                    </div>
                    {bus.isDepartureModalOpen &&
                        <BusList
                            startStationId={bus.startStationId}
                            endStationId={bus.endStationId}
                            gradeCarrier={bus.gradeCarrier}
                            departureTime={bus.departureTime}
                            departure={bus.departure}
                            destination={bus.destination}
                            isRoundTrip={bus.isRoundTrip}
                            departureDate={bus.departureDate}
                            passengerCount={bus.passengerCount}
                            bus ={bus}
                        />
                    }
                </form>
            </div>
        </Layout>
    );
};

export default Bus;

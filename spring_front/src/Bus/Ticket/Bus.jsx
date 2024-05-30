import React, { useEffect, useRef, useState } from 'react';
import BusList from '../Search/list/BusList';
import Charge from '../../components/Charge';
import { getBusSchedule, getBusTerminalList, getEndStationList } from '../../api/dataApi';
import Layout from '../../components/Layout';
import '@/css/form/bookingform.css';
import StartStationList from '../../components/StartStationList';
import EndStationList from '../../components/EndStationList';

const Bus = () => {
    const ticketInfo = {
        departure: '',
        destination: '',
        departureDate: new Date().toISOString().slice(0, 10),
        returnDate: '',
        passengerCount: '',
        isRoundTrip: false,
        busclass: "",
        isDepartureModalOpen: false,
        startStationID: '',
        endStationID: '',
    };

    const [bus, setBus] = useState(ticketInfo);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (bus.startStationID && !bus.endStationID) {
            getEndStationList(bus.startStationID)
                .then(data => {
                    setBus(prevState => ({
                        ...prevState,
                        endStations: data,
                    }));
                });
        } else if (bus.startStationID && bus.endStationID) {
            getBusSchedule(bus.startStationID, bus.endStationID)
                .then(data => {
                    setBus(prevState => ({
                        ...prevState,
                        result: data,
                    }));
                });
        }
    }, [bus.startStationID, bus.endStationID]);

    const handleStartStationIDChange = (id, name) => {
        setBus(prevState => ({
            ...prevState,
            startStationID: id,
            departure: name, // Update departure stationName
            endStationID: '', // Reset end station when start station changes
            endStations: [], // Reset end stations list
        }));
    };

    const handleEndStationIDChange = (id, name) => {
        setBus(prevState => ({
            ...prevState,
            endStationID: id,
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

    const handleChargeClick = () => {
        // Handle charge click
    };

    return (
        <Layout title="버스 승차권 예매" body="정보 입력">
            <div className="bus_book">
                <form onSubmit={handleSubmit} style={{ marginLeft: '10%' }}>
                    <h2 style={{ textAlign: 'left', marginBottom: '50px', marginTop: '30px' }}>버스 예약</h2>
                    <div className="col1">
                        <div> {/* 출발지 */}
                            <StartStationList stationTypeId={'1'} onStationSelect={handleStartStationIDChange} />
                        </div>
                        <div> {/* 도착지 */}
                            <EndStationList startStationId={bus.startStationID} onStationSelect={handleEndStationIDChange} />
                        </div>
                    </div>

                    <label>
                        가는 날
                        <input type="date" value={bus.departureDate} onChange={(e) => handleChange('departureDate', e.target.value)} style={{ width: '50%', marginLeft: '10px' }} />
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
                            오는 날
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
                    버스등급
                    <select style={{ width: '50%', marginLeft: '10px' }} value={bus.Busclass} onChange={(e) => handleChange('busclass', e.target.value)}>
                        <option value="">전체</option>
                        <option value="1">일반</option>
                        <option value="2">우등</option>
                        <option value="3">심야고속</option>
                        <option value="4">시외우등</option>
                        <option value="5">심야우등</option>
                        <option value="6">프리미엄우등</option>
                        <option value="7">프리미엄심야우등</option>
                        <option value="8">프리미엄우등(주말)</option>
                    </select>
                    <br />
                    {/* 선택 좌석: <input type="text" id="seatResult" value={bus.seats.value} onChange={handleSeatResultChange} readOnly/> */}
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '85px', marginRight: '10px', marginBottom: '35px' }}>
                        <button type="submit" style={{ marginTop: '0px', marginRight: '40px' }}>조회하기</button>
                        <button type="button" style={{ backgroundColor: 'green' }} className='fee-check-button' onClick={handleChargeClick}>수수료확인</button>
                    </div>

                    {/* <div className='col2'>
                        <button type="button" className="exchange-button" style={{ backgroundColor: 'orange', marginTop: '15px', marginLeft: "-150px", height: "100px", width: '100px' }} onClick={changeDepartureDestination}><ExchangeIcon /></button>
                    </div> */}
                    <br />


                    {bus.isDepartureModalOpen &&
                        <BusList
                            startStationID={bus.startStationID}
                            endStationID={bus.endStationID}
                            bus={bus}
                            busclass={bus.busclass}
                            departure={bus.departure}
                            destination={bus.destination}
                        />
                    }
                </form>


            </div >
        </Layout >
    );
};

export default Bus;

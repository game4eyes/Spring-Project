import React, { useEffect, useRef, useState } from 'react';

//import '@/css/BusSeat.css';
import BusList from '../Search/list/BusList';
// import { getCityInfo } from '../../api/todoApi';
import Charge from '../../components/Charge';
import { getBusSchedule, getBusTerminalList } from '../../api/dataApi';
import Layout from '../../components/Layout';
import { ReactComponent as ExchangeIcon } from '@/icon/exchange.svg';
import '@/css/form/bookingform.css';


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
        startStationID: '', //출발지코드
        endStationID: '',   //도착지코드

    };

    const [busticket, setBusticket] = useState(ticketInfo);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (busticket.startStationID && busticket.endStationID) {
            getBusSchedule(busticket.startStationID, busticket.endStationID)
                .then(data => {
                    setResult(data);
                })
        }
    }, [busticket.startStationID, busticket.endStationID]);

    const [cities, setCities] = useState([]);
    const inputRef = useRef(null);

    const handleChange = (key, value) => {
        setBusticket(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputRef.current) {
            if (result) {
                compareResult(result);
            } else {
                console.error('Result is null or undefined');
            }

            inputRef.current.setAttribute('input_test', '입력이 아닌 받아오는 값으로 인한 change변경!');
            setBusticket({
                ...busticket,
                departure: document.getElementById('departure').value,
                destination: document.getElementById('destination').value,
                startStationID: document.getElementById('departure_stationID').value,
                endStationID: document.getElementById('destination_stationID').value,
                isDepartureModalOpen: true
            });
        }
    };

    const handleStartStationIDChange = (e) => {
        setBusticket(prevState => ({
            ...prevState,
            startStationID: e.target.value,
        }));
    };

    const handleEndStationIDChange = (e) => {
        setBusticket(prevState => ({
            ...prevState,
            endStationID: e.target.value
        }));
    };

    const handleSeatResultChange = (e) => {
        setBusticket(prevState => ({
            ...prevState,
            seats: e.target.value
        }));
    };

    const openPopup = (stationClass, departure_destination) => () => {
        const departure = document.getElementById("departure").value;
        const destination = document.getElementById("destination").value;
        const params = new URLSearchParams({
            departure: departure.toString(),
            destination: destination.toString(),
        });
        const newPopup = window.open(`http://localhost:5173/search/searchbus?${params}`, '_blank', 'width=600,height=400');
    };

    const changeDepartureDestination = () => {
        let tmp = document.getElementById("departure").value;
        document.getElementById("departure").value = document.getElementById("destination").value;
        document.getElementById("destination").value = tmp;
        tmp = document.getElementById("departure_stationID").value;
        document.getElementById("departure_stationID").value = document.getElementById("destination_stationID").value;
        document.getElementById("destination_stationID").value = tmp;
    };

    const compareResult = (result) => {
        if (Array.isArray(result)) {
            result.forEach((item) => {
                if (item.startStationID === document.getElementById('departure_stationID').value) {
                    setBusticket(prevState => ({
                        ...prevState,
                        startStationID: document.getElementById('departure_stationID').value,
                    }));
                }
                if (item.endStationID === document.getElementById('destination_stationID').value) {
                    setBusticket(prevState => ({
                        ...prevState,
                        endStationID: document.getElementById('destination_stationID').value,
                    }));
                }
            });
        } else {
            console.error('Result is not an array:', result);
        }
    };

    // 수수료 정보 팝업 열기 이벤트 핸들러
    const [popupWindow, setPopupWindow] = useState(null);

    const handleChargeClick = () => {
        const newPopup = window.open('http://localhost:5173/pay/chargeinfo/bus', '_blank', 'width=600,height=400');
        setPopupWindow(newPopup);
    };

    // const renderChargeInPopup = () => {
    //     if (popupWindow) {
    //       popupWindow.document.body.innerHTML = `
    //         <div style="padding: 20px;">
    //           <h2>수수료 정보</h2>
    //           <button onclick="window.close()">닫기</button>
    //           <div>
    //             <Charge id={1} />
    //           </div>
    //         </div>
    //       `;
    //     }
    // };

    return (

        <Layout title="버스 승차권 예매" body="정보 입력">
            <div className="bus_book">
                <form onSubmit={handleSubmit} style={{ marginLeft: '10%' }}>
                    <h2 style={{ textAlign: 'left', marginBottom: '50px',marginTop: '30px' }}>버스 예약</h2>
                    <div className="col1">

                        <div style={{ display: 'flex' }}>
                            <div className='column1'>
                                <label>
                                    출발지
                                    <input
                                        type="text"
                                        value={busticket.departure.value}
                                        onChange={(e) => handleChange('departure', e.target.value)}
                                        placeholder="출발지를 입력하세요"
                                        onClick={openPopup()}
                                        id="departure"
                                        style={{ width: '100%', marginLeft: '10px' }}
                                    />
                                    <input
                                        type="hidden"
                                        value={busticket.startStationID.value}
                                        onChange={handleStartStationIDChange}
                                        id="departure_stationID"
                                        ref={inputRef}
                                    />
                                </label>
                                <br />
                                <label>
                                    도착지
                                    <input
                                        type="text"
                                        value={busticket.destination.value}
                                        onChange={(e) => handleChange('destination', e.target.value)}
                                        placeholder="도착지를 입력하세요"
                                        id="destination"
                                        onClick={openPopup()}
                                        style={{ width: '100%', marginLeft: '10px' }}
                                    />
                                    <input
                                        type="hidden"
                                        value={busticket.endStationID.value}
                                        onChange={handleEndStationIDChange}
                                        id="destination_stationID"
                                        ref={inputRef}
                                    />
                                </label>
                            </div>
                            <div className='button-container column2'>
                                <button type="button" className="exchange-button" style={{ backgroundColor: 'orange', marginLeft: "50px", marginTop: '50px', height: "100px", width: '100px' }}  onClick={changeDepartureDestination}><ExchangeIcon /></button>
                            </div>

                        </div>
                        <br />

                        <label>
                            가는 날

                            <input type="date" value={busticket.departureDate} onChange={(e) => handleChange('departureDate', e.target.value)
                            } style={{ width: '50%', marginLeft: '10px' }} />
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" checked={busticket.isRoundTrip} onChange={() => handleChange('isRoundTrip', !busticket.isRoundTrip)} />
                            왕복 여행<br></br>
                        </label>
                        <br />
                        {busticket.isRoundTrip && (
                            <label>
                                <input
                                    type="date"
                                    value={busticket.returnDate}
                                    onChange={(e) => handleChange('returnDate', e.target.value)}
                                    min={busticket.departureDate}
                                    style={{ width: '50%', marginLeft: '10px' }}
                                />
                            </label>
                        )}
                        {!busticket.isRoundTrip && (
                            <label>
                                오는 날
                                <input
                                    type="date"
                                    value={busticket.returnDate}
                                    onChange={(e) => handleChange('returnDate', e.target.value)}
                                    min={busticket.departureDate}
                                    disabled
                                    style={{ width: '50%', marginLeft: '10px' }}
                                />
                            </label>
                        )}
                        <br />
                        버스등급
                        <select style={{ width: '50%', marginLeft: '10px' }} value={busticket.Busclass} onChange={(e) => handleChange('busclass', e.target.value)}>
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
                        {/* 선택 좌석: <input type="text" id="seatResult" value={busticket.seats.value} onChange={handleSeatResultChange} readOnly/> */}
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '85px', marginRight: '10px', marginBottom: '35px' }}>
                            <button type="submit" style={{ marginTop: '0px', marginRight: '40px' }}>조회하기</button>
                            <button type="button" style={{ backgroundColor: 'green' }} className='fee-check-button' onClick={handleChargeClick}>수수료확인</button>
                        </div>
                    </div>
                    {/* <div className='col2'>
                        <button type="button" className="exchange-button" style={{ backgroundColor: 'orange', marginTop: '15px', marginLeft: "-150px", height: "100px", width: '100px' }} onClick={changeDepartureDestination}><ExchangeIcon /></button>
                    </div> */}
                    <br />


                    {busticket.isDepartureModalOpen &&
                        <BusList
                            startStationID={busticket.startStationID}
                            endStationID={busticket.endStationID}
                            busticket={busticket}
                            busclass={busticket.busclass}
                        />
                    }
                </form>


            </div>
        </Layout>
    );
};

export default Bus;

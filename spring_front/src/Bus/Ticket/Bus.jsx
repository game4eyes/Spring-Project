import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import Ad from '../../components/Ad';
//import '@/css/BusSeat.css';
import BusList from '../Search/list/BusList';
// import { getCityInfo } from '../../api/todoApi';
import Charge from '../../components/Charge';
import { getBusSchedule, getBusTerminalList } from '../../api/dataApi';
import Layout from '../../components/Layout';

const Bus = () => {
    const initState = {
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

    const [busticket, setBusticket] = useState(initState);
    const [result, setResult] = useState(null);







    useEffect(() => {
        if (busticket.startStationID && busticket.endStationID) {
            getBusSchedule(busticket.startStationID, busticket.endStationID)
                .then(data => {
                    setResult(data);
                })
        }
    }, [busticket.startStationID, busticket.endStationID]);

    // useEffect(() => {
    //     console.log(result);
    // }, [result]);





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
        console.log(busticket.busclass);
        if (inputRef.current) {
            if (result) {
                compareResult(result);
            } else {
                //    alert('검색 결과 값이 없습니다!'); 시점 이슈
                console.error('Result is null or undefined');
            }

            inputRef.current.setAttribute('input_test', '입력이 아닌 받아오는 값으로 인한 change변경!');
            console.log('입력이 아닌 받아오는 값으로 인한 change변경');
            setBusticket({
                ...busticket,
                departure: document.getElementById('departure').value,
                destination: document.getElementById('destination').value,
                startStationID: document.getElementById('departure_stationID').value,
                endStationID: document.getElementById('destination_stationID').value,
                isDepartureModalOpen: true
            });
            // console.log(busticket);
            console.log(busticket.startStationID);
            console.log(busticket.endStationID);
        }
    };


    const handleStartStationIDChange = (e) => {
       // console.log('Updating startStationID to:', e.target.value);
        setBusticket(prevState => ({
            ...prevState,
            startStationID: e.target.value,
        }));
    };

    const handleEndStationIDChange = (e) => {
      //  console.log('Updating endStationID to:', e.target.value);
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
        console.log(busticket.seat);
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


    return (
        <div className="bus_book">
         
                <Layout title="버스 승차권 예매222" body="정보 입력">
            <form onSubmit={handleSubmit}>
               


                <h3>버스 예약</h3>
                <label>
                    출발지:
                    <input
                        type="text"
                        value={busticket.departure.value}
                        onChange={(e) => handleChange('departure', e.target.value)}
                        placeholder="출발지를 입력하세요"
                        onClick={openPopup()}
                        id="departure"
                    />

                    {/* 히든값 */}
                    <input type="text"
                        value={busticket.startStationID.value}
                        onChange={handleStartStationIDChange}
                        id="departure_stationID"
                        ref={inputRef}
                    />
                </label>
                <br />
                <label>
                    도착지:
                    <input
                        type="text"
                        value={busticket.destination.value}
                        onChange={(e) => handleChange('destination', e.target.value)}
                        placeholder="도착지를 입력하세요"
                        id="destination"
                        onClick={openPopup()}
                    />
                    {/* 히든값 */}
                    <input type="text"
                        value={busticket.endStationID.value}
                        onChange={handleEndStationIDChange}
                        id="destination_stationID"
                        ref={inputRef}
                    />
                </label>
                <br />
                <button type="button" onClick={changeDepartureDestination}>출발지↔도착지</button>






                <label>
                    가는 날:
                    <input type="date" value={busticket.departureDate} onChange={(e) => handleChange('departureDate', e.target.value)} />
                </label>
                <br />
                <label>
                    <input type="checkbox" checked={busticket.isRoundTrip} onChange={() => handleChange('isRoundTrip', !busticket.isRoundTrip)} />
                    왕복 여행
                </label>
                <br />
                {busticket.isRoundTrip && (
                    <label>
                        오는 날:
                        <input
                            type="date"
                            value={busticket.returnDate}
                            onChange={(e) => handleChange('returnDate', e.target.value)}
                            min={busticket.departureDate}
                        />
                    </label>
                )}
                {!busticket.isRoundTrip && (
                    <label>
                        오는 날:
                        <input
                            type="date"
                            value={busticket.returnDate}
                            onChange={(e) => handleChange('returnDate', e.target.value)}
                            min={busticket.departureDate}
                            disabled
                        />
                    </label>
                )}
                <br />
                버스등급:
                <select value={busticket.Busclass} onChange={(e) => handleChange('busclass', e.target.value)}>
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

                <br />
                <button type="submit">조회하기</button>

                {busticket.isDepartureModalOpen &&
                    <BusList
                        startStationID={busticket.startStationID}
                        endStationID={busticket.endStationID}
                        busticket={busticket}
                        busclass={busticket.busclass}
                    />
                }
                <Charge id={1} />
            </form>

            </Layout>
        </div>
    );
};

export default Bus;

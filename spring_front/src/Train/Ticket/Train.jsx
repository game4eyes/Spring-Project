import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Ad from '../../components/Ad';
import Footer from '../../components/Footer';
import Charge from '../../components/Charge';
import TrainList from '../Search/list/TrainList';
import { getTrainInfo } from '../../api/dataApi';
import Layout from '../../components/Layout';
import { ReactComponent as ExchangeIcon } from '@/icon/exchange.svg';

const Train = () => {
    const initialTicketInfo = {
        departure: '',
        destination: '',
        date: new Date().toISOString().slice(0, 10),
        hour: '06',
        dayz: '',
        selectedTrain: null,
        isDepartureModalOpen: false,
        startStationID: '',
        endStationID: '',
    };

    const [train, setTrain] = useState(initialTicketInfo);
    const [result, setResult] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const inputRef = useRef(null);
    const [popupWindow, setPopupWindow] = useState(null);

    useEffect(() => {
        if (train.startStationID && train.endStationID && train.hour && train.dayz) {
            getTrainInfo(train.startStationID, train.endStationID, train.hour, train.dayz)
                .then(data => {
                    setResult(data);
                });
        }
    }, [train.startStationID, train.endStationID, train.hour, train.dayz]);

    useEffect(() => {
        const departure_ID = document.getElementById("departure_stationID").value;
        const destination_ID = document.getElementById("destination_stationID").value;
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const today = new Date();
        const todayDayz = days[today.getDay()];

        setTrain(prevTrain => ({
            ...prevTrain,
            startStationID: departure_ID,
            endStationID: destination_ID,
            dayz: todayDayz
        }));
    }, []);

    const handleHourChange = (e) => {
        setTrain(prevTrain => ({
            ...prevTrain,
            hour: e.target.value
        }));
    };

    const handleDayzChange = (e) => {
        setTrain(prevTrain => ({
            ...prevTrain,
            dayz: e.target.value
        }));
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().slice(0, 10);

        if (selectedDate < currentDate) {
            alert("지난 날짜를 선택할 수 없습니다.");
            return;
        }

        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const selectedDayz = days[new Date(selectedDate).getDay()];

        setTrain(prevState => ({
            ...prevState,
            dayz: selectedDayz,
            date: selectedDate
        }));
    };

    const handleDepartureChange = (e) => {
        setTrain(prevState => ({
            ...prevState,
            departure: e.target.value
        }));
    };

    const handleDestinationChange = (e) => {
        setTrain(prevState => ({
            ...prevState,
            destination: e.target.value
        }));
    };

    const handleStartStationIDChange = (e) => {
        setTrain(prevState => ({
            ...prevState,
            startStationID: e.target.value,
        }));
    };

    const handleEndStationIDChange = (e) => {
        setTrain(prevState => ({
            ...prevState,
            endStationID: e.target.value
        }));
    };

    const openPopup = (stationClass, departure_destination) => () => {
        const value = departure_destination === 'departure' ? document.getElementById("departure").value : document.getElementById("destination").value;

        const params = new URLSearchParams({
            [departure_destination]: value,
            stationClass: stationClass.toString(),
        });

        const newPopup = window.open(`http://localhost:5173/search/searchtrain?${params}`, '_blank', 'width=600,height=400');
        newPopup.setTrainAndUpdate = setTrainAndUpdate;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTrain(prevState => ({
            ...prevState,
            departure: document.getElementById('departure').value,
            destination: document.getElementById('destination').value,
            startStationID: document.getElementById('departure_stationID').value,
            endStationID: document.getElementById('destination_stationID').value,
            isDepartureModalOpen: true
        }));
    };

    const changeDepartureDestination = () => {
        let tmp = document.getElementById("departure").value;
        document.getElementById("departure").value = document.getElementById("destination").value;
        document.getElementById("destination").value = tmp;

        tmp = document.getElementById("departure_stationID").value;
        document.getElementById("departure_stationID").value = document.getElementById("destination_stationID").value;
        document.getElementById("destination_stationID").value = tmp;
    };

    const setTrainAndUpdate = (stationName, inputId) => {
        setTrain(prevState => ({
            ...prevState,
            [inputId]: stationName
        }));
        document.getElementById(inputId).value = stationName;
    };

    const setStationCodeAndUpdate = () => {
        const departure_stationID = document.getElementById("departure_stationID").value;
        const destination_stationID = document.getElementById("destination_stationID").value;

        setTrain(prevState => ({
            ...prevState,
            startStationID: departure_stationID,
            endStationID: destination_stationID
        }));
    };

    useEffect(() => {
        setStationCodeAndUpdate();
    }, [train.departure, train.destination]);

    useEffect(() => {
        setStationCodeAndUpdate();
    }, [train.isDepartureModalOpen]);

    const handleChargeClick = () => {
        const newPopup = window.open('http://localhost:5173/pay/chargeinfo/train', '_blank', 'width=600,height=400');
        setPopupWindow(newPopup);
    };

    return (
        <Layout title="기차 승차권 예매" body="정보 입력">
           <div className="train_book" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* 세로로 나열될 요소들 */}

                <form onSubmit={handleSubmit}>
                    <h2 style={{ marginBottom: '50px' }}>기차 예약</h2>
                    <div className="col1">
                        <div className="column1_2" style={{ display: 'flex' }}>
                            <div className="column1" style={{ width: '600px' }}>
                                <label>
                                    출발지<br></br>
                                    <input
                                        type="text"
                                        value={train.departure.value}
                                        onChange={handleDepartureChange}
                                        placeholder="출발지를 입력하세요"
                                        onClick={openPopup('3', 'departure')}
                                        id="departure"
                                        readOnly
                                        style={{ width: '50%', marginLeft: '10px' }}
                                    />
                                    <input
                                        type="hidden"
                                        value={train.startStationID}
                                        onChange={handleStartStationIDChange}
                                        id="departure_stationID"
                                        ref={inputRef}
                                    />
                                </label>
                                <br />
                                <label>
                                    도착지<br></br>
                                    <input
                                        type="text"
                                        value={train.destination.value}
                                        onChange={handleDestinationChange}
                                        placeholder="도착지를 입력하세요"
                                        onClick={openPopup('3', 'destination')}
                                        id="destination"
                                        readOnly
                                        style={{ width: '50%', marginLeft: '10px' }}
                                    />
                                    <input
                                        type="hidden"
                                        value={train.endStationID}
                                        onChange={handleEndStationIDChange}
                                        id="destination_stationID"
                                        ref={inputRef}
                                    />
                                </label>
                                <br />
                            </div>
                            <div className='button-container column2'>
                                <button type="button" className="exchange-button" style={{ backgroundColor: 'orange', marginTop: '50px', marginLeft: '-150px', height: "100px", width: '100px' }} onClick={changeDepartureDestination}><ExchangeIcon /></button>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <label style={{ marginRight: '30px' }}>
                                출발일<br></br>
                                <input type="date" value={train.date} onChange={handleDateChange} min={new Date().toISOString().slice(0, 10)} />
                            </label>
                            <label>
                                요일 <br></br>
                                <select value={train.dayz} onChange={handleDayzChange} disabled>
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
                        <br />
                        <div>
                            <label>
                                시간


                                
                                <select style={{ width: '50%', marginLeft: '10px' }} value={train.hour} onChange={handleHourChange}>
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
                    <br />

                    <div>
                    {train.isDepartureModalOpen &&
                        <TrainList
                            startStationID={train.startStationID}
                            endStationID={train.endStationID}
                            dayz={train.dayz}
                            hour={train.hour}
                            train={train}
                        />
                    }
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Train;

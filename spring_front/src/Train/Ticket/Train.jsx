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
import StartStationList from '../../components/StartStationList';
import EndStationList from '../../components/EndStationList';

const Train = () => {
    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().slice(0, 10);
    };

    const today = new Date();
    const tomorrow = addDays(today, 1);

    const initialTicketInfo = {
        departure: '',
        destination: '',
        date: tomorrow,
        departureTime: '06',
        weekdayCarrier: '',
        selectedTrain: null,
        isDepartureModalOpen: false,
        startStationId: '',
        endStationId: '',
    };

    const [train, setTrain] = useState(initialTicketInfo);
    const [result, setResult] = useState(null);
    const [selectedDate, setSelectedDate] = useState(tomorrow);
    const inputRef = useRef(null);
    const [popupWindow, setPopupWindow] = useState(null);

    useEffect(() => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const today = new Date();
        const todayweekdayCarrier = days[today.getDay()];

        setTrain(prevTrain => ({
            ...prevTrain,
            weekdayCarrier: todayweekdayCarrier
        }));
    }, []);

    const handleHourChange = (e) => {
        setTrain(prevTrain => ({
            ...prevTrain,
            departureTime: e.target.value
        }));
    };

    const handleweekdayCarrierChange = (e) => {
        setTrain(prevTrain => ({
            ...prevTrain,
            weekdayCarrier: e.target.value
        }));
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;

        if (selectedDate < tomorrow) {
            alert("오늘 이후의 날짜를 선택해주세요.");
            return;
        }

        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const selectedweekdayCarrier = days[new Date(selectedDate).getDay()];

        setTrain(prevState => ({
            ...prevState,
            weekdayCarrier: selectedweekdayCarrier,
            date: selectedDate
        }));
    };

    const handleStartStationIdChange = (Id, name) => {
        setTrain(prevState => ({
            ...prevState,
            startStationId: Id,
            departure: name, // Update departure stationName
            endStationId: '', // Reset end station when start station changes
            endStations: [], // Reset end stations list
        }));
    };

    const handleEndStationIdChange = (Id, name) => {
        setTrain(prevState => ({
            ...prevState,
            endStationId: Id,
            destination: name, // Update destination stationName
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTrain(prevState => ({
            ...prevState,
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

    const handleChargeClick = () => {
        const newPopup = window.open('http://localhost:5173/pay/chargeinfo/train', '_blank', 'width=600,height=400');
        setPopupWindow(newPopup);
    };

    return (
        <Layout title="기차 승차권 예매" body="정보 입력">
            <div className="train_book" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{ marginBottom: '50px' }}>기차 예약</h2>
                    <div className="col1">
                        <div>
                            <StartStationList stationTypeId={'3'} onStationSelect={handleStartStationIdChange} />
                        </div>
                        <div>
                            <EndStationList startStationId={train.startStationId} onStationSelect={handleEndStationIdChange} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <label style={{ marginRight: '30px' }}>
                                출발일<br></br>
                                <input type="date" value={train.date} onChange={handleDateChange} min={tomorrow} />
                            </label>
                            <label>
                                요일 <br></br>
                                <select value={train.weekdayCarrier} onChange={handleweekdayCarrierChange} disabled>
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
                                <select style={{ width: '50%', marginLeft: '10px' }} value={train.departureTime} onChange={handleHourChange}>
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
                                startStationId={train.startStationId}
                                endStationId={train.endStationId}
                                weekdayCarrier={train.weekdayCarrier}
                                departureTime={train.departureTime}
                                date={train.date}
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

import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Ad from '../../components/Ad';
import Footer from '../../components/Footer';
import Charge from '../../components/Charge';
import PlaneList from '../Search/list/PlaneList';
// import { getPlaneSchedule } from '../../api/dataApi';
import Layout from '../../components/Layout';
import { ReactComponent as ExchangeIcon } from '@/icon/exchange.svg';
import StartStationList from '../../components/StartStationList';
import EndStationList from '../../components/EndStationList';

const Plane = () => {

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
        selectedPlane: null,
        isDepartureModalOpen: false,
        startStationId: '',
        endStationId: '',
    };

    const [plane, setPlane] = useState(initialTicketInfo);
    const [result, setResult] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const inputRef = useRef(null);
    const [popupWindow, setPopupWindow] = useState(null);

    // useEffect(() => {
    //     if (plane.startStationId && plane.endStationId && plane.departureTime && plane.weekdayCarrier) {
    //         getPlaneInfo(plane.startStationId, plane.endStationId, plane.departureTime, plane.weekdayCarrier)
    //             .then(data => {
    //                 setResult(data);
    //             });
    //     }
    // }, [plane.startStationId, plane.endStationId, plane.departureTime, plane.weekdayCarrier]);

    useEffect(() => {
        // const departure_ID = document.getElementById("departure_stationID").value;
        // const destination_ID = document.getElementById("destination_stationID").value;
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const today = new Date();
        const todayweekdayCarrier = days[today.getDay()];

        setPlane(prevPlane => ({
            ...prevPlane,
            // startStationId: departure_ID,
            // endStationId: destination_ID,
            weekdayCarrier: todayweekdayCarrier
        }));
    }, []);

    const handleHourChange = (e) => {
        setPlane(prevPlane => ({
            ...prevPlane,
            departureTime: e.target.value
        }));
    };

    const handleweekdayCarrierChange = (e) => {
        setPlane(prevPlane => ({
            ...prevPlane,
            weekdayCarrier: e.target.value
        }));
    };

const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10); // 내일 날짜

    if (selectedDate < tomorrow) {
        alert("내일 이후 날짜만 선택할 수 있습니다.");
        return;
    }

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const selectedweekdayCarrier = days[new Date(selectedDate).getDay()];

    setPlane(prevState => ({
        ...prevState,
        weekdayCarrier: selectedweekdayCarrier,
        date: selectedDate
    }));
};


    const handleStartStationIdChange = (Id, name) => {
        setPlane(prevState => ({
            ...prevState,
            startStationId: Id,
            departure: name, // Update departure stationName
            endStationId: '', // Reset end station when start station changes
            endStations: [], // Reset end stations list
        }));
    };

    const handleEndStationIdChange = (Id, name) => {
        setPlane(prevState => ({
            ...prevState,
            endStationId: Id,
            destination: name, // Update destination stationName
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(plane);
        setPlane(prevState => ({
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

    const setPlaneAndUpdate = (stationName, inputId) => {
        setPlane(prevState => ({
            ...prevState,
            [inputId]: stationName
        }));
        document.getElementById(inputId).value = stationName;
    };

    // const setStationCodeAndUpdate = () => {
    //     const departure_stationID = document.getElementById("departure_stationID").value;
    //     const destination_stationID = document.getElementById("destination_stationID").value;

    //     setPlane(prevState => ({
    //         ...prevState,
    //         startStationId: departure_stationID,
    //         endStationId: destination_stationID
    //     }));
    // };

    // useEffect(() => {
    //     setStationCodeAndUpdate();
    // }, [plane.departure, plane.destination]);

    // useEffect(() => {
    //     setStationCodeAndUpdate();
    // }, [plane.isDepartureModalOpen]);

    const handleChargeClick = () => {
        const newPopup = window.open('http://localhost:5173/pay/chargeinfo/plane', '_blank', 'width=600,height=400');
        setPopupWindow(newPopup);
    };

    // const handlePayment = async (amount, orderId, orderName) => {
    //     const userEmail = sessionStorage.getItem('userEmail'); // Retrieve userEmail from sessionStorage

    //     if (!userEmail) {
    //         console.error('User email not found in sessionStorage');
    //         return;
    //     }

    //     try {
    //         // Redirect to Toss Payments sandbox environment with userEmail included in the URL
    //         const tossPaymentsUrl = `https://payment-gateway-sandbox.tosspayments.com?userEmail=${encodeURIComponent(userEmail)}&amount=${amount}&orderId=${orderId}&orderName=${orderName}`;
    //         window.location.href = tossPaymentsUrl;
    //     } catch (error) {
    //         console.error('Failed to redirect to Toss Payments:', error);
    //     }
    // };

    return (
        <Layout title="항공권 예매" body="정보 입력">
            <div className="train_book" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{ marginBottom: '50px' }}>항공권 예매</h2>
                    <div className="col1">
                        <div>
                            <StartStationList stationTypeId={'2'} onStationSelect={handleStartStationIdChange} />
                        </div>
                        <div>
                            <EndStationList startStationId={plane.startStationId} onStationSelect={handleEndStationIdChange} />
                        </div>
                        {/* <div className="column1_2" style={{ display: 'flex' }}>
                            <div className="column1" style={{ width: '600px' }}>
                                <br />
                            </div>
                            <div className='button-container column2'>
                                <button type="button" className="exchange-button" style={{ backgroundColor: 'orange', marginTop: '50px', marginLeft: '-150px', height: "100px", width: '100px' }} onClick={changeDepartureDestination}><ExchangeIcon /></button>
                            </div>
                        </div> */}
                        <div style={{ display: 'flex' }}>
                            <label style={{ marginRight: '30px' }}>
                                출발일<br></br>
                                <input type="date" value={plane.date} onChange={handleDateChange} min={new Date().toISOString().slice(0, 10)} />
                            </label>
                            <label>
                                요일 <br></br>
                                <select value={plane.weekdayCarrier} onChange={handleweekdayCarrierChange} disabled>
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
                                <select style={{ width: '50%', marginLeft: '10px' }} value={plane.departureTime} onChange={handleHourChange}>
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
                        {plane.isDepartureModalOpen &&
                            <PlaneList
                                startStationId={plane.startStationId}
                                endStationId={plane.endStationId}
                                weekdayCarrier={plane.weekdayCarrier}
                                departureTime={plane.departureTime}
                                // weekdayCarrier={plane.weekdayCarrier}
                                // departureTime={plane.departureTime}
                                date ={plane.date}
                                plane={plane}
                            />
                        }
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Plane;
 
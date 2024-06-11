import React, { useState } from 'react';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import Ad from '../../components/Ad';
import '@/css/BusSeat.css';
import BusList from '../../components/search/list/BusList';
import { getCityInfo } from '../../api/todoApi';
import Charge from '../../components/Charge';

const initState = {
    departure: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengerCount: '',
    isRoundTrip: false,
    selectedBus: null,
    isDepartureModalOpen: false 
};

const Bus = () => {     

    const [busticket, setBusticket] = useState(initState);

    const cityInfoClickEvent = () => {
        console.log("dk");
        getCityInfo();
    }

    const handleChange = (key, value) => {
        setBusticket(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(busticket);
        setBusticket(prevState => ({
            ...prevState,
            isDepartureModalOpen: true
        }));
    };

    const openPopup = () => {
        window.open('http://localhost:5173/search/searchbus', '_blank', 'width=600,height=400');
    };



    // const change_Departure_Destination = (e) => {
    //     let tmp = "";
    //     tmp = document.getElementById("start").value;
    //     document.getElementById("start").value = document.getElementById("finish").value;
    //     document.getElementById("finish").value = tmp;
    //     handleSubmit(e);
    //     if (document.getElementById("start").value === "" || document.getElementById("finish").value === "") {
    //         alert('출발지와 도착지를 입력해주세요!')
    //         document.getElementById("finish").focus();
    //         return;
    //     }

    // };



    const change_Departure_Destination = () => {
        // 출발지와 도착지 값을 서로 교환
        setBusticket(prevState => ({
            ...prevState,
            departure: busticket.destination,
            destination: busticket.departure
        }));
        
        if (document.getElementById("start").value === "" || document.getElementById("finish").value === "") {
            alert('출발지와 도착지를 입력해주세요!');
            document.getElementById("finish").focus();
        }
    };
    

    return (
        <div className="bus_book">
            <form onSubmit={handleSubmit}>
                <Header />
                <Article title="버스 승차권 예매" body="정보 입력" />
                <button onClick={cityInfoClickEvent}>클릭</button>
                <h3>버스 예약</h3>
                {/* 출발지 검색창 */}
                <label> 
                    출발지:
                    <input
                        type="text"
                        value={busticket.departure}
                        onChange={(e) => handleChange('departure', e.target.value)}
                        placeholder="출발지를 입력하세요"
                        onClick={openPopup}
                        id="start"
                    />
                </label>
                <br />
                {/* 도착지 검색창 */}
                <label>
                    도착지:
                    <input
                        type="text"
                        value={busticket.destination}
                        onChange={(e) => handleChange('destination', e.target.value)}
                        placeholder="도착지를 입력하세요"
                        id="finish"
                        onClick={openPopup}
                    />
                </label>
                <br />
                <button type="button" onClick={change_Departure_Destination}>출발지↔도착지</button>
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
                <select value={busticket.selectedBus} onChange={(e) => handleChange('selectedBus', e.target.value)}>
                    <option value="">전체</option>
                    <option value="Bus1">일반</option>
                    <option value="Bus2">시외고속</option>
                    <option value="Bus3">심야고속</option>
                    <option value="Bus4">시외우등</option>
                    <option value="Bus5">심야우등</option>
                    <option value="Bus6">프리미엄우등</option>
                    <option value="Bus7">프리미엄심야우등</option>
                    <option value="Bus8">프리미엄우등(주말)</option>
                    <option value="Bus9">프리미엄심야우등(주말)</option>
                </select>
                <br />
                <button type="submit">조회하기</button>
            <Charge id={1}/>
            </form>
            {busticket.isDepartureModalOpen && <BusList />}
            <Ad />
            <Footer />
        </div>
    );
};

export default Bus;

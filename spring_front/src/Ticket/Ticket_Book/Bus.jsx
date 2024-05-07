import React, { useState } from 'react';
import Header from '../../components/Header';
import BusSeat from '../../components/BusSeat';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import Ad from '../../components/Ad';
import '@/css/BusSeat.css';
import BusList from '../../components/search/list/BusList';
import Charge from '../../components/Charge';



    
const Bus = () => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengerCount, setPassengerCount] = useState('');
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [selectedBus, setSelectedBus] = useState(null); // State to track selected bus

    const [isDepartureModalOpen, setIsDepartureModalOpen] = useState(false);
    const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);


   
        const openNewWindow = () => {
            // 새로운 윈도우를 엽니다.
            window.open('http://localhost:5173/search/searchbus', '_blank', 'width=600,height=400');
        };

    
    const handleDepartureChange = (e) => {
        setDeparture(e.target.value);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const handleDepartureDateChange = (e) => {
        setDepartureDate(e.target.value);
    };

    const handleReturnDateChange = (e) => {
        setReturnDate(e.target.value);
    };

    const handlePassengerCountChange = (e) => {
        setPassengerCount(e.target.value);
    };

    const handleToggleRoundTrip = () => {
        setIsRoundTrip(!isRoundTrip);
        if (!isRoundTrip) {
            setReturnDate('');
        }
    };

    const handleBusSelect = (e) => {
        setSelectedBus(e.target.value);
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

    const change_Departure_Destination = () => {
        openPopup();

        let tmp = busticket.departure;
        setBusticket(prevState => ({
            ...prevState,
            departure: busticket.destination,
            destination: tmp
        }));

        if (busticket.destination === "" || busticket.departure === "") {
            alert('출발지와 도착지를 입력해주세요!')
        }
        console.log({
            departure,
            destination,
            departureDate,
            returnDate,
            passengerCount,
            isRoundTrip,
            selectedBus // Include selected bus in the console log
        });
    };

    const openDepartureModal = () => {
        setIsDepartureModalOpen(true);
    };


    const closeDepartureModal = () => {
        setIsDepartureModalOpen(false);

    };

    return (
        <div className="bus_book">
            <form onSubmit={handleSubmit}>
                <Header />
                <Article title="버스 승차권 예매" body="정보 입력" />
                <h3>버스 예약</h3>
                {/* 출발지 검색창 */}
                <label onClick={openNewWindow}> 
                    출발지:
                    <input
                        type="text"
                        value={departure}
                        onChange={handleDepartureChange}
                        placeholder="출발지를 입력하세요"
                        id="start"
                    />
                </label>
                <br />
                {/* 도착지 검색창 */}
                <label onClick={openNewWindow}>
                    도착지:
                    <input
                        type="text"
                        value={destination}
                        onChange={handleDestinationChange}
                        placeholder="도착지를 입력하세요"
                        id="finish"
                    />
                </label>
                <br />
                <label>
                    가는 날:
                    <input type="date" value={departureDate} onChange={handleDepartureDateChange} />
                </label>
                <br />
                <label>
                    <input type="checkbox" checked={isRoundTrip} onChange={handleToggleRoundTrip} />
                    왕복 여행
                </label>
                <br />
                {isRoundTrip && (
                    <label>
                        오는 날:
                        <input
                            type="date"
                            value={returnDate}
                            onChange={handleReturnDateChange}
                            min={departureDate}
                           
                        />
                    </label>
                )}
                {!isRoundTrip && (
                    <label>
                        오는 날:
                        <input
                            type="date"
                            value={returnDate}
                            onChange={handleReturnDateChange}
                            min={departureDate}
                            disabled
                        />
                    </label>
                )}
                <br />
              
                버스등급:
                <select value={selectedBus} onChange={handleBusSelect}>
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

                    {/* Add more options as needed */}
                </select>
                <br />
                {/* <PopupExample/> */}
                {selectedBus && <BusSeat />}
                <button type="submit">조회하기</button>
            <Charge id={1}/>
            </form>
           <div>

           <BusList/>
           <br/>
           </div>
            {isDepartureModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeDepartureModal}>&times;</span>
                        {/* Render your ResultModal component here */}
                    </div>
                   
                </div>
            )}
          
            <Ad />
            <Footer />
        </div>
    );
};

export default Bus;

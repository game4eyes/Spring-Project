import React, { useState } from 'react';
import Header from '../../components/Header';
import BusSeat from '../../components/BusSeat';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import Ad from '../../components/Ad';


const Bus = () => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengerCount, setPassengerCount] = useState('');
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [selectedBus, setSelectedBus] = useState(null); // State to track selected bus

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

    return (
        <div className="bus_book">
        <form onSubmit={handleSubmit}>
            <Header/>
            <Article title ="버스 승차권 예매" body ="정보 입력"></Article>
            <h3>버스 예약</h3>
            <label>
                출발지:
                <input type="text" value={departure} onChange={handleDepartureChange} />
            </label>
            <br />
            <label>
                도착지:
                <input type="text" value={destination} onChange={handleDestinationChange} />
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
                    <input type="date" value={returnDate} onChange={handleReturnDateChange} />
                </label>
            )}
            <br />
            {/* <label>
                인원 수:
                <input type="number" value={passengerCount} onChange={handlePassengerCountChange} />
            </label> */}
            <br />
            <br />
            {/* Select box for bus list */}
            <label>
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
            </label>
            <br />
         
            {/* Render BusSeat only when a bus is selected */}
            {selectedBus && <BusSeat />}
            <button type="submit">예약하기</button>
        </form>
         <Ad/>
         <Footer />
         </div>
    );
};

export default Bus;

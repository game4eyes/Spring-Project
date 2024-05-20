import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Ad from '../../components/Ad';
import Footer from '../../components/Footer';
import Charge from '../../components/Charge';
import DateInput from '../PlaneComponent/DateInput';
import SelectInput from '../PlaneComponent/SelectInput';
import Checkbox from '../PlaneComponent/Checkbox';
import AirportsData from '../PlaneComponent/AirportsData';

const Plane = () => {
    const today = new Date().toISOString().split('T')[0];
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState(today); // 초기값으로 오늘 날짜 설정
    const [dayz, setDayz] = useState(''); // 요일 상태 추가
    const [passengerCount, setPassengerCount] = useState('1');
    const [seatType, setSeatType] = useState('standard');
    const [disability, setDisability] = useState(false);
    const [legroom, setLegroom] = useState(false);
    const [window, setWindow] = useState(false);

    useEffect(() => {
        // 초기 요일 설정
        const dateObj = new Date(today);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayName = days[dateObj.getDay()];
        setDayz(dayName);
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);

        const dateObj = new Date(newDate);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayName = days[dateObj.getDay()];
        setDayz(dayName); // 요일 설정
    };


    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@작업해라



    // 노선 정보
    const routes = {
        "3500001": ["3500003", "3500004", "3500013", "3500012", "3500008"], // 김포
        "3500004": ["3500003"], // 김해
        "3500003": ["3500005", "3500006", "3500008"], // 제주
        "3500002": ["3500004"], // 인천
    };


    const getValidDepartureOptions = () => {
        // routes에 정의된 출발지만 필터링
        return AirportsData.filter(airport => Object.keys(routes).includes(airport.stationID.toString()));
    };

    const getDestinationOptions = () => {
        return routes[departure] ? AirportsData.filter(airport => routes[departure].includes(airport.stationID.toString())) : [];
    };

    


    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@작업해라



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            departure,
            destination,
            date,
            dayz, // 요일도 출력
            passengerCount,
            seatType,
            disability,
            legroom,
            window
        });
    };

    return (
        <div className="plane_book">
            <Header />
            <Article title="공항 승차권 예매" body="정보 입력" />
            <form onSubmit={handleSubmit}>
                <label>
                    출발지:
                    <select value={departure} onChange={e => setDeparture(e.target.value)}>
                        <option value="">공항을 선택하세요</option>
                        {getValidDepartureOptions().map(airport => (
                            <option key={airport.stationID} value={airport.stationID}>
                                {airport.stationName}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    도착지:
                    <select value={destination} onChange={e => setDestination(e.target.value)} disabled={!routes[departure]}>
                        <option value="">도착지를 선택하세요</option>
                        {getDestinationOptions().map(airport => (
                            <option key={airport.stationID} value={airport.stationID}>
                                {airport.stationName}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <DateInput label="출발일" onChange={handleDateChange} />
                <br/>
                <SelectInput label="인원" value={passengerCount} onChange={setPassengerCount} options={Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `${i + 1}명` }))} />
                <br/>
                <SelectInput label="좌석 유형" value={seatType} onChange={setSeatType} options={[{ value: 'standard', label: '일반' }, { value: 'premium', label: '프리미엄' }]} />
                <br/>
                <Checkbox checked={disability} onChange={() => setDisability(!disability)} label="장애가 있습니다" />
                <Checkbox checked={legroom} onChange={() => setLegroom(!legroom)} label="Legroom" />
                <Checkbox checked={window} onChange={() => setWindow(!window)} label="Window Seat" />
                <button type="submit">예매하기</button>
            </form>
            <Charge id={3} />
            <Ad />
            <Footer />
        </div>
    );
};

export default Plane;
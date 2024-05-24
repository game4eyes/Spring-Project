import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Ad from '../../components/Ad';
import Footer from '../../components/Footer';
import Charge from '../../components/Charge';
import TrainList from '../Search/list/TrainList';
import { getTrainInfo } from '../../api/dataApi';
import Layout from '../../components/Layout';


// 기차 예약 컴포넌트
const Train = () => {
    // 초기 상태 정의
    const ticketInfo = {
        departure: '',            // 출발지
        destination: '',          // 도착지
        date: new Date().toISOString().slice(0, 10),                 // 출발일
        hour: '06',                 // 출발 시간
        dayz: '',             //요일
        // passengerCount: '',       // 인원
        //  isRoundTrip: false,       // 왕복 여부
        selectedTrain: null,      // 선택된 기차 정보
        isDepartureModalOpen: false, // 출발지 모달 창 열림 여부

        startStationID: '',      //출발지코드
        endStationID: '',        //도착지코드
    };

    // 상태(state)와 상태를 변경하는 함수(setter) 정의
    const [trainticket, setTrainticket] = useState(ticketInfo);

    const [result, setResult] = useState(null);

    useEffect(() => {
        if (trainticket.startStationID && trainticket.endStationID && trainticket.hour && trainticket.dayz) {
            getTrainInfo(trainticket.startStationID, trainticket.endStationID,trainticket.hour,trainticket.dayz)
                .then(data => {
                    setResult(data);
                })
        }
    }, [trainticket.startStationID, trainticket.endStationID]);

    useEffect(() => {
        console.log(result);
    }, [result]);

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // 오늘 날짜로 초기화

    const inputRef = useRef(null);


    useEffect(() => {
        // 출발지와 도착지의 역 코드 설정
        const departure_ID = document.getElementById("departure_stationID").value;
        const destination_ID = document.getElementById("destination_stationID").value;

        // 현재 요일 설정
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const today = new Date();
        const todayDayz = days[today.getDay()];

        // 상태 업데이트
        setTrainticket(prevTrainticket => ({
            ...prevTrainticket,
            startStationID: departure_ID,
            endStationID: destination_ID,
            dayz: todayDayz
        }));
    }, []);





    const handleHourChange = (e) => {
        setTrainticket((prevTrainticket) => ({
            ...prevTrainticket,
            hour: e.target.value
        }));
    };

    const handleDayzChange = (e) => {
        setTrainticket((prevTrainticket) => ({
            ...prevTrainticket,
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

        // 계산된 요일 구하기
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const selectedDayz = days[new Date(selectedDate).getDay()];

        // 상태 업데이트
        setTrainticket(prevState => ({
            ...prevState,
            dayz: selectedDayz,
            date: selectedDate
        }));
    };



    // // 출발지 변경 이벤트 핸들러
    const handleDepartureChange = (e) => {
        setTrainticket(prevState => ({
            ...prevState,
            departure: e.target.value
        }));
    };



    // // 도착지 변경 이벤트 핸들러
    const handleDestinationChange = (e) => {
        setTrainticket(prevState => ({
            ...prevState,
            destination: e.target.value
        }));
    };





    const handleStartStationIDChange = (e) => {
        console.log('Updating startStationID to:', e.target.value);
        setTrainticket(prevState => ({
            ...prevState,
            startStationID: e.target.value,
        }));
    };


    const handleEndStationIDChange = (e) => {
        console.log('Updating endStationID to:', e.target.value);
        setTrainticket(prevState => ({
            ...prevState,
            endStationID: e.target.value
        }));
    };







    // 팝업 열기 이벤트 핸들러
    const openPopup = (stationClass, departure_destination) => () => {
        const value = departure_destination === 'departure' ? document.getElementById("departure").value : document.getElementById("destination").value;

        // URL 파라미터 설정
        const params = new URLSearchParams({
            [departure_destination]: value,
            stationClass: stationClass.toString(),
        });


        // 새로운 팝업 창 열기
        const newPopup = window.open(`http://localhost:5173/search/searchtrain?${params}`, '_blank', 'width=600,height=400');

        // 부모 창의 setTrainticketAndUpdate 함수 전달
        newPopup.setTrainticketAndUpdate = setTrainticketAndUpdate;
    };


    // 예약 양식 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
   

        // isDepartureModalOpen 상태를 true로 변경하여 TrainList 컴포넌트를 렌더링합니다.
        console.log(trainticket);
     
        if (inputRef.current) {
            if (result) {
                compareResult(result);
            } else {
              //  alert('검색 결과 값이 없습니다!');
                console.error('Result is null or undefined');
            }

            inputRef.current.setAttribute('input_test', '입력이 아닌 받아오는 값으로 인한 change변경!');
            console.log('입력이 아닌 받아오는 값으로 인한 change변경');
            setTrainticket({
                ...trainticket,
                departure: document.getElementById('departure').value,
                destination: document.getElementById('destination').value,
                startStationID: document.getElementById('departure_stationID').value,
                endStationID: document.getElementById('destination_stationID').value,
                isDepartureModalOpen: true
            });
        }
    };


    const compareResult = (result) => {
        if (Array.isArray(result)) {
            result.forEach((item) => {
                if (item.startStationID === document.getElementById('departure_stationID').value) {
                    setTrainticket(prevState => ({
                        ...prevState,
                        startStationID: document.getElementById('departure_stationID').value,
                    }));
                }
    
                if (item.endStationID === document.getElementById('destination_stationID').value) {
                    setTrainticket(prevState => ({
                        ...prevState,
                        endStationID: document.getElementById('destination_stationID').value,
                    }));
                    
                }     
            });
        } else {
            //alert('조회값이 없습니다!');
            console.error('Result is not an array:', result);
        }
    };


    //출발지,도착지 값 서로 바꾸기
    const changeDepartureDestination = () => {
        let tmp = "";
        tmp = document.getElementById("departure").value;
        document.getElementById("departure").value = document.getElementById("destination").value;
        document.getElementById("destination").value = tmp;

        let tmp2 = "";
        tmp = document.getElementById("departure_stationID").value;
        document.getElementById("departure_stationID").value = document.getElementById("destination_stationID").value;
        document.getElementById("destination_stationID").value = tmp;

    }


    // setTrainticket 함수 정의
    const setTrainticketAndUpdate = (stationName, inputId) => {
        // trainticket 상태를 업데이트합니다.
        setTrainticket(prevState => ({
            ...prevState,
            [inputId]: stationName
        }));

        // 입력란에 선택한 역 이름을 설정합니다.
        document.getElementById(inputId).value = stationName;
    }



    const setStationCodeAndUpdate = () => {
        // trainticket 상태를 업데이트합니다.
        const departure_stationID = document.getElementById("departure_stationID").value;
        const destination_stationID = document.getElementById("destination_stationID").value;

        setTrainticket(prevState => ({
            ...prevState,
            startStationID: departure_stationID,
            endStationID: destination_stationID
        }));
    }

    // 상태 변경을 감지하고 startStationID와 endStationID를 업데이트합니다.
    useEffect(() => {
        setStationCodeAndUpdate();
    }, [trainticket.departure, trainticket.destination]); // departure와 destination 상태가 변경될 때마다 호출

    // 다음과 같이 상태 변경을 감지할 수도 있습니다.
    useEffect(() => {
        setStationCodeAndUpdate();
    }, [trainticket.isDepartureModalOpen]); // isDepartureModalOpen 상태가 변경될 때마다 호출



    // JSX 반환
    return (
        <div className="train_book">

            <Layout title="기차 승차권 예매" body="정보 입력">
            <form onSubmit={handleSubmit}>
                <h4>기차 예약</h4>
                {/* 출발지 입력란 */}
                <label>
                    출발지:
                    <input
                        type="text"
                        value={trainticket.departure.value}
                        onChange={handleDepartureChange}
                        placeholder="출발지를 입력하세요"
                        onClick={openPopup('3', 'departure')} // 클릭한 대상의 ID를 전달
                        id="departure"
                        readOnly
                    />
                     {/* Hidden 값 */}
                     <input type="text"
                    value={trainticket.startStationID.value}
                    onChange={handleStartStationIDChange}
                    id="departure_stationID"
                    ref={inputRef}

                 />
                </label>
                <br />

                {/* 도착지 입력란 */}
                <label>
                    도착지:
                    <input
                        type="text"
                        value={trainticket.destination.value}
                        onChange={handleDestinationChange}
                        placeholder="도착지를 입력하세요"
                        onClick={openPopup('3', 'destination')} // 클릭한 대상의 ID를 전달
                        id="destination"
                        readOnly
                    />
                  {/* Hidden 값 */}
                <input type="text"
                    value={trainticket.endStationID.value}
                    onChange={handleEndStationIDChange}
                    id="destination_stationID"
                    ref={inputRef}
                />
                </label>
                <br />
                <button type="button" onClick={changeDepartureDestination}>출발지↔도착지</button>
                <br />



               

           

                {/* 출발일 선택란 */}

                <label>
                    출발일:
                    <input type="date" value={trainticket.date} onChange={handleDateChange} min={new Date().toISOString().slice(0, 10)} max={(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).toISOString().slice(0, 10)} />
                </label>


                <br />



                <label>
                    시간:
                    <select value={trainticket.hour} onChange={handleHourChange}>
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
                        {/* <option value="24">24:00</option> */}
                    </select>
                </label>



                <label>
                    요일:
                    <select value={trainticket.dayz} onChange={handleDayzChange} disabled>
                        <option value="">시간을 선택하세요</option>
                        <option value="일">일</option>
                        <option value="월">월</option>
                        <option value="화">화</option>
                        <option value="수">수</option>
                        <option value="목">목</option>
                        <option value="금">금</option>
                        <option value="토">토</option>

                        {/* <option value="24">24:00</option> */}
                    </select>
                </label>


                {/* 인원 선택란
            <label>
                인원:
                <select value={trainticket.passengerCount} onChange={handlePassengerCountChange}>
                    <option value="">인원을 선택하세요</option>
                    <option value="1">1명</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                    <option value="4">4명</option>
                    <option value="5">5명</option>
                </select>
            </label> */}
                <br />
                {/* 예약하기 버튼 */}
                <button type="submit">조회하기</button>

             
                {trainticket.isDepartureModalOpen &&
                    <TrainList

                        startStationID={trainticket.startStationID}                                    // <--이렇게 하면 안됨 (해결이 됐으나 비동기 통신 상 시점 이슈로 콘솔에 늦게 적용됨)
                        endStationID={trainticket.endStationID}                                    //    <--이렇게 하면 안됨 (해결이 됐으나 비동기 통신 상 시점 이슈로 콘솔에 늦게 적용됨)
                        //startStationID={document.getElementById("departure_stationID").value}       //  <--- 이렇게 하면 됨
                        //  endStationID={document.getElementById("destination_stationID").value}       //  <--- 이렇게 하면 됨
                        //  startStationID={trainticket.startStationID=document.getElementById("departure_stationID").value}        (DOM에 직접 넣는 행위는 권장사항이 아님)
                        //  endStationID={trainticket.endStationID=document.getElementById("destination_stationID").value}                (DOM에 직접 넣는 행위는 권장사항이 아님)
                        dayz={trainticket.dayz}
                        hour={trainticket.hour}
                    />
                }



                {/* 요금제 컴포넌트 */}
                <Charge id={2} />
            </form>
          </Layout>
        </div>
    );
};

export default Train;

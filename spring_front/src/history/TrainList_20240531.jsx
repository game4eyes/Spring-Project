import React, { useContext, useEffect, useState } from 'react';
import { getTrainInfo } from '@/api/dataApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../../common/page/Pagination';
import '@/css/List.css'; // CSS 파일 임포트
import { AuthContext } from '../../../global/AuthContext';
import '@/css/Popup.css';
import LoginModal from '@/components/LoginModal';
import BookResultModal from '@/components/BookResultModal';

const TrainList = ({ startStationID, endStationID, hour, dayz, train }) => {
    const [trainInfo, setTrainInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [timeoutReached, setTimeoutReached] = useState(false);
    const { isLoggedIn, setRedirectUrl, setGuestRedirectUrl } = useContext(AuthContext);
    const [showUserGuestPopup, setShowUserGuestPopup] = useState(false);
    const [selectedTransportation, setSelectedTransportation] = useState(null);
    const [selectedtrain, setSelectedtrain] = useState(null);
    const [showBookResultModal, setShowBookResultModal] = useState(false); // State for BookResult modal

    const location = useLocation();
    const navigate = useNavigate();

    //모달
    const [showLoginModal, setShowLoginModal] = useState(false); // Login 모달 상태 추가

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
        // Check if user is logged in and then open BookResult modal
        if (isLoggedIn) {

            setShowBookResultModal(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTrainInfo(startStationID, endStationID, hour, dayz);
                setTrainInfo(res && res.station ? res.station : []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching train info:', error);
                setLoading(false);
            }
        };

        fetchData();

        const timeout = setTimeout(() => {
            setTimeoutReached(true);
            setLoading(false);
        }, 5000); // 5초 후 타임아웃

        return () => clearTimeout(timeout);
    }, [startStationID, endStationID, hour, dayz]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = trainInfo.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const getTodayFare = (fare) => {
        const today = new Date().getDay(); // 오늘 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

        switch (today) {
            case 0: // 일요일
                return fare.generalFare.holiday;
            case 6: // 토요일
                return fare.generalFare.weekend;
            default: // 평일
                return fare.generalFare.weekday;
        }
    };




    const searchURLObject = (pathname) => {                 //URL에 'bus나,train,plane'이 들어있을 경우 해당 문자를 return

        if (pathname.includes('bus')) return 'bus';
        if (pathname.includes('train')) return 'train';
        if (pathname.includes('plane')) return 'plane';
        return null;
    };

    const handleItemClick = (transportation, selectedtrain, train) => {
        setSelectedtrain(selectedtrain);
        localStorage.setItem('selectedtrain', JSON.stringify(selectedtrain)); // selectedtrain을 로컬 스토리지에 저장
        localStorage.setItem('train', JSON.stringify(train));
        if (isLoggedIn) {
            setShowBookResultModal(true); // Show BookResultModal if logged in
        } else {
            setShowUserGuestPopup(true);
        }
    };

    //         // setRedirectUrl(url);
    //         navigate(url);
    //     } else {
    //         setShowUserGuestPopup(true);
    //     }
    //  };


    // const handleItemClick = (transportation, train,trainticket) => {            //'테스트 버튼'을 눌렀을 때 실행되는 함수. trainsportation: 교통수단종류, train: 선택한 기차, trainticket: train.jsx에서 가져온 정보
    //     setSelectedtrain(train);


    //     if (isLoggedIn) {
    //         setShowBookResultModal(true); // Show BookResultModal if logged in
    //     } else {
    //         setShowUserGuestPopup(true);
    //     }
    // };


    


    const handleCloseUserGuestPopup = () => {                               //결제 ['로그인''회원가입'] 팝업창을 닫는 함수
        setShowUserGuestPopup(false);
    };

    // const handleOptionSelect = (option) => {                                   //팝업창에서 '비로그인 상태'에서 결제를 실행할 경우의 url
    //     setShowUserGuestPopup(false);
    //     // const url = `/ticketbook/${selectedTransportation}?type=${option}`;
    //     if (option === 'login') {                                               //'비로그인 상태'에서 로그인을 실행할 시에 대한 url 이동
    //         // setRedirectUrl(url);                                                     
    //         const url = `/api/user/login?paylogin&railName=${encodeURIComponent(selectedtrain.railName)}&trainClass=${encodeURIComponent(selectedtrain.trainClass)}&trainNo=${encodeURIComponent(selectedtrain.trainNo)}&departureTime=${encodeURIComponent(selectedtrain.departureTime)}
    //         &departure=${encodeURIComponent(trainticket.departure)}&destination=${encodeURIComponent(trainticket.destination)}&hour=${encodeURIComponent(trainticket.hour)}&date=${encodeURIComponent(trainticket.date)}&dayz=${encodeURIComponent(trainticket.dayz)}&price=${getTodayFare(selectedtrain.fare)}`;
    //         navigate(url);
    //     } else {                                                              //'비로그인 상태'에서 회원가입을 실행할 시에 대한 url 이동
    //         setGuestRedirectUrl(url);

 

    const UserGuestPopup = ({ onClose, onOptionSelect }) => (
        <div className="UserGuestPopup">
            <div className="UserGuestPopup-inner button-container">
                <h3 style={{ marginBottom: '30px' }}>로그인이 필요한 서비스입니다</h3>
                <button style={{ backgroundColor: 'blue', marginRight: '10px' }} onClick={() => onOptionSelect('login')}>로그인</button>
                <button style={{ backgroundColor: 'green', marginRight: '10px' }} onClick={() => onOptionSelect('join')}>회원가입</button>
                <button style={{ backgroundColor: 'red' }} onClick={onClose}>닫기</button>
            </div>
        </div>
    );

    const handleOptionSelect = (option) => {
        if (option === 'login') {
            setShowUserGuestPopup(false); // 기존 팝업 닫기
            setShowLoginModal(true); // 로그인 모달 열기
        } else {

            const url = `/api/user/join?payjoin&railName=${encodeURIComponent(selectedtrain.railName)}&trainClass=${encodeURIComponent(selectedtrain.trainClass)}&trainNo=${encodeURIComponent(selectedtrain.trainNo)}&departureTime=${encodeURIComponent(selectedtrain.departureTime)}
            &departure=${encodeURIComponent(train.departure)}&destination=${encodeURIComponent(train.destination)}&hour=${encodeURIComponent(train.hour)}&date=${encodeURIComponent(train.date)}&dayz=${encodeURIComponent(train.dayz)}&price=${getTodayFare(selectedtrain.fare)}`;
            setGuestRedirectUrl(url);
            navigate(url);
        }
    };




    // const seatselect = () => {
    //     window.open('http://localhost:5173/search/Trainseat', '_blank', 'width=600,height=400');
    // }



    const payment = () => {
        window.open('http://localhost:5173/pay/pay', '_blank', 'width=600,height=400');
    }

    if (loading) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    if (timeoutReached && trainInfo.length === 0) {
        return <p>조회값이 없습니다</p>;
    }

    return (
        <div className="table-container">

       

            {trainInfo.length > 0 ? (
                <>
                    <div>
                        <div style ={{marginTop:'600px'}}>
                            <h2>출발지 : {train.departure}</h2>
                            <h2>도착지 : {train.destination}</h2>
                        </div>

                        <table>

                            <thead>
                                <tr>
                                    <th>열차 이름</th>
                                    <th>열차 종류</th>
                                    <th>열차 번호</th>
                                    <th>출발 시간</th>
                                    <th>도착 시간</th>
                                    <th>소요 시간</th>
                                    <th>운행 요일</th>
                                    <th style={{ marginRight: '59px' }}> 요금</th>
                                    <th>요금 정보</th>
                                    <th>좌석 선택</th>
                                    <th>예매</th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((selectedtrain, index) => (
                                    <tr key={index}>
                                        <td>{selectedtrain.railName}</td>
                                        <td>{selectedtrain.trainClass}</td>
                                        <td>{selectedtrain.trainNo}</td>
                                        <td>{selectedtrain.departureTime}</td>
                                        <td>{selectedtrain.arrivalTime}</td>
                                        <td>{selectedtrain.wasteTime}</td>
                                        <td>{selectedtrain.runDay}</td>
                                        {/* {getTodayFare(train.fare)} : 오늘 날짜에 대한 요금 측정 */}
                                        <td>{getTodayFare(selectedtrain.fare)}</td>
                                        <td>
                                            {selectedtrain.fare.generalFare.weekday && <p>평일: {selectedtrain.fare.generalFare.weekday}</p>}
                                            {selectedtrain.fare.generalFare.weekend && <p>주말: {selectedtrain.fare.generalFare.weekend}</p>}
                                            {selectedtrain.fare.generalFare.holiday && <p>공휴일: {selectedtrain.fare.generalFare.holiday}</p>}
                                        </td>
                                        <td><button className="button" onClick={payment}>좌석선택</button></td>
                                        <td><button className="button" onClick={() => handleItemClick(searchURLObject(location.pathname), selectedtrain, train)}>결제</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={trainInfo.length} paginate={paginate} />
                    </div>
                </>
            ) : (
                <p>조회값이 없습니다</p>
            )}
            {showUserGuestPopup && <UserGuestPopup onClose={handleCloseUserGuestPopup} onOptionSelect={handleOptionSelect} />}
            {showLoginModal && <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />}
            {showBookResultModal && isLoggedIn && <BookResultModal transportationtype={'train'} trainprice={getTodayFare(selectedtrain.fare)} handleClose={() => setShowBookResultModal(false)} />}
                                                         {/* //transportationtype : 'bus'(버스), 'train' (기차), 'plane'(비행기)*/}
        </div>
    );
};

export default TrainList;
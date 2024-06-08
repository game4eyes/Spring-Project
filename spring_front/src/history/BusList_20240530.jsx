import React, { useEffect, useState, useContext } from 'react';
import Pagination from '../../../common/page/Pagination';
import { getBusSchedule } from '@/api/dataApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../global/AuthContext';
import '@/css/Popup.css';

const BusList = ({ startStationID, endStationID, onUpdateSeat, busticket }) => {
    const [busInfo, setBusInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn, setRedirectUrl, setGuestRedirectUrl } = useContext(AuthContext);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showUserGuestPopup, setShowUserGuestPopup] = useState(false);
    const [selectedTransportation, setSelectedTransportation] = useState(null);
    const [dataLoadError, setDataLoadError] = useState(false);
    const [showBookResultModal, setShowBookResultModal] = useState(false); // State for BookResult modal
    const [selectedBus, setSelectedBus] = useState(null);

    const [showLoginModal, setShowLoginModal] = useState(false); // Login 모달 상태 추가


    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
        // Check if user is logged in and then open BookResult modal
        if (isLoggedIn) {

            setShowBookResultModal(true);
        }
    };


    const initState = {
        ...busticket,
        departure: busticket.departure,
        destination: busticket.destination,
        departureDate: busticket.departureDate,
        returnDate: busticket.returnDate,
        passengerCount: busticket.passengerCount,
        isRoundTrip: false,
        busClass: busticket.busclass,
        isDepartureModalOpen: false,
        startStationID: busticket.startStationID, // 출발지 코드
        endStationID: busticket.endStationID, // 도착지 코드
    };

    const [selectedbusticket, setSelectedbusticket] = useState(initState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getBusSchedule(startStationID, endStationID);
                setBusInfo(res ? res : {});
            } catch (error) {
                console.error('Error fetching bus info:', error);
                setDataLoadError(true);
            }
        };

        const timer = setTimeout(() => {
            if (Object.keys(busInfo).length === 0) {
                setDataLoadError(true);
            }
        }, 3000);

        fetchData();

        return () => clearTimeout(timer);
    }, [startStationID, endStationID]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const seatSelect = () => {
        window.open('http://localhost:5173/search/busseat', '_blank', 'width=600,height=400');
    };

    const payment = () => {
        window.open('http://localhost:5173/pay/pay', '_blank', 'width=600,height=400');
    };

    const searchURLObject = (pathname) => {
        if (pathname.includes('bus')) return 'bus';
        if (pathname.includes('train')) return 'train';
        if (pathname.includes('plane')) return 'plane';
        return null;
    };

    // const handleItemClick = (transportation, detail) => {
    //     setSelectedTransportation(transportation);
    //     console.log("Selected Seats:", selectedSeats);
    //     console.log("Detail:", detail);
    //     console.log("Busticket:", busticket);

    //     setSelectedbusticket(prevState => ({
    //         ...prevState,
    //         selectedBus: detail // Update the selectedBus with detail
    //     }));

    //     if (isLoggedIn) {
    //         const url = `/ticketbook/${transportation}?type=회원`;
    //         setRedirectUrl(url);
    //         navigate(url);
    //     } else {
    //         setShowUserGuestPopup(true);
    //     }
    // };

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



    const handleCloseUserGuestPopup = () => {
        setShowUserGuestPopup(false);
    };

    // const handleOptionSelect = (option) => {
    //     setShowUserGuestPopup(false);
    //     const url = `/ticketbook/${selectedTransportation}?type=${option}`;
    //     if (option === '회원') {
    //         setRedirectUrl(url);
    //         navigate('/api/user/login?paytest');
    //     } else {
    //         setGuestRedirectUrl(url);
    //         navigate('/api/user/guest-booking');
    //     }
    // };


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

    const handleSeatResultChange = (event) => {
        const newValue = event.target.value;
        setSelectedSeats(newValue);
        onUpdateSeat(newValue);
    };


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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Filtering logic based on busticket.busclass
    const filteredItems = busInfo.detail ? busInfo.detail.filter(detail => {
        return busticket.busclass === "" || parseInt(detail.busClass) === parseInt(busticket.busclass);
    }) : [];

    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // if (dataLoadError) {
    //     return <p>데이터를 조회할 수 없습니다.</p>;
    // }

    return (
        <div className="table-container" style={{ overflow: 'hidden' }}>

            {currentItems.length > 0 ? (
                <>
                    <h2>출발지: {busInfo.startStationName}</h2>
                    <h2>도착지: {busInfo.endStationName}</h2>
                    <h3>첫차 시간: {busInfo.firstTime}</h3>
                    <h3>막차 시간: {busInfo.lastTime}</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>버스 등급</th>
                                <th>출발 시간</th>
                                <th>소요 시간</th>
                                <th>요금</th>
                                <th>좌석 선택</th>
                                <th>결제</th>
                                <th>회원/비회원 선택</th>
                            </tr>
                        </thead>
                        <tbody>

                            {currentItems.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail.busClass}</td>
                                    <td>{detail.departureTime}</td>
                                    <td>{Math.floor(detail.wasteTime / 60)}시간 {detail.wasteTime % 60}분</td>
                                    <td>{detail.fare.toLocaleString()}원</td>
                                    <td>
                                        <button className="button" onClick={seatSelect}>좌석 선택</button>
                                        <input
                                            type="text"
                                            id="seatResult"
                                            value={selectedSeats}
                                            onChange={handleSeatResultChange}
                                        />
                                    </td>
                                    <td><button className="button" onClick={payment}>결제</button></td>
                                    <td><button className="button" onClick={() => handleItemClick(searchURLObject(location.pathname), detail)}>테스트 버튼</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination itemsPerPage={itemsPerPage} totalItems={filteredItems.length} paginate={paginate} />
                </>
            ) : (
                <p>해당 버스 등급의 데이터를 불러오는 중입니다...</p>
            )}
            {showUserGuestPopup && <UserGuestPopup onClose={handleCloseUserGuestPopup} onOptionSelect={handleOptionSelect} />}
            {showLoginModal && <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />}
            {showBookResultModal && isLoggedIn && <BookResultModal transportationtype={'bus'} handleClose={() => setShowBookResultModal(false)} />}
            {/* //transportationtype : bus(버스), train (기차), plane(비행기)*/}
        </div>
    );
};

export default BusList;

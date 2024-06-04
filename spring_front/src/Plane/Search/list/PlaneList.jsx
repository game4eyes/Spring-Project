import React, { useContext, useEffect, useState } from 'react';
import { getPlaneSchedule, getPlanePrice } from '../../../api/dataApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../../common/page/Pagination';
import '@/css/List.css';
import { AuthContext } from '../../../global/AuthContext';
import '@/css/Popup.css';
import LoginModal from '@/components/LoginModal';
import BookResultModal from '@/components/BookResultModal';
import PlaneListSeat from './PlaneListSeat';

const PlaneList = ({ startStationId, endStationId, departureTime, weekdayCarrier, plane, date }) => {
    const [planeInfo, setPlaneInfo] = useState([]);
    const [planePrices, setPlanePrices] = useState({
        business: 60000,
        economy: 70000,
        first: 80000
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [timeoutReached, setTimeoutReached] = useState(false);
    const [showUserGuestPopup, setShowUserGuestPopup] = useState(false);
    const [selectedPlane, setSelectedPlane] = useState(null);
    const [showBookResultModal, setShowBookResultModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedPlaneSeats, setSelectedSeats] = useState({});
    const [soldoutStatus, setSoldoutStatus] = useState({});

    let sessionStorage = window.sessionStorage;
    const email = sessionStorage.getItem('email');

    const location = useLocation();
    const navigate = useNavigate();

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
        if (sessionStorage.email) {
            setShowBookResultModal(true);
        }
    };

    const handleSoldOutChange = (planeId, isSoldOut) => {
        setSoldoutStatus(prevState => ({
            ...prevState,
            [planeId]: isSoldOut
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPlaneSchedule(startStationId, endStationId, weekdayCarrier, departureTime);
                setPlaneInfo(res && res.result ? res.result : []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching plane info:', error);
                setLoading(false);
            }
        };

        fetchData();

        const timeout = setTimeout(() => {
            setTimeoutReached(true);
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [startStationId, endStationId, departureTime, weekdayCarrier]);

    const searchURLObject = (pathname) => {
        if (pathname.includes('bus')) return 'bus';
        if (pathname.includes('plane')) return 'plane';
        if (pathname.includes('plane')) return 'plane';
        return null;
    };

    const handleItemClick = (transportation, selectedPlaneItem, plane, seatType, price) => {
        setSelectedPlane(selectedPlaneItem);
        localStorage.setItem('selectedPlane', JSON.stringify(selectedPlaneItem));
        localStorage.setItem('plane', JSON.stringify(plane));
        localStorage.setItem('selectedSeatType_plane', JSON.stringify(seatType));
        localStorage.setItem('seatPrice_plane', JSON.stringify(price));
        if (sessionStorage.email) {
            setShowBookResultModal(true);
            console.log(seatType);
            console.log(selectedPlane);
            console.log(plane);
            console.log(price);
        } else {
            setShowUserGuestPopup(true);
        }
    };

    const handleCloseUserGuestPopup = () => {
        setShowUserGuestPopup(false);
    };

    const handleOptionSelect = (option) => {
        if (option === 'login') {
            setShowUserGuestPopup(false);
            setShowLoginModal(true);
        }
    };

    const handleCheckboxChange = (scheduleId, seatType) => {
        const selectedPrice = planePrices[seatType] || 'N/A';
        const updatedSeats = {
            ...selectedPlaneSeats,
            [scheduleId]: { seatType, price: selectedPrice }
        };
        setSelectedSeats(updatedSeats);
        localStorage.setItem('selectedSeatType_plane', JSON.stringify(seatType));
        localStorage.setItem('seatPrice_plane', JSON.stringify(selectedPrice));
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

    const payment = () => {
        window.open('http://localhost:5173/pay/pay', '_blank', 'width=600,height=400');
    };

    if (loading) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    if (timeoutReached && planeInfo.length === 0) {
        return <p>조회값이 없습니다</p>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = planeInfo.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="table-container">
            {planeInfo.length > 0 ? (
                <>
                    <div>
                        <div style={{ marginTop: '600px' }}>
                            <h2>출발지: {plane.departure}</h2>
                            <h2>도착지: {plane.destination}</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    {/* <th>항공기 ID</th> */}
                                    <th>항공기 번호</th>
                                    <th>항공기 이름</th>
                                    <th>출발 시간</th>
                                    <th>도착 시간</th>
                                    <th>요금</th>
                                    <th>좌석 선택</th>
                                    <th>예매</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((selectedPlane, index) => {
                                    const planeseatData = JSON.parse(localStorage.getItem(`planeseatData_${selectedPlane.id}`));
                                    const isSoldOut = planeseatData && planeseatData.airBusiness === 0 &&
                                        planeseatData.airFirst === 0 &&
                                        planeseatData.airEconomy === 0;

                                    return (
                                        <tr key={index}>
                                            {/* <td>{selectedPlane.id}</td> */}
                                            <td>{selectedPlane.frequency}</td>
                                            <td>{selectedPlane.lineName}</td>
                                            <td>{selectedPlane.departureTime}</td>
                                            <td>{selectedPlane.arrivalTime}</td>
                                            
                                            <PlaneListSeat
                                                Id={selectedPlane.id}
                                                Date={date}
                                                selectedPlaneSeats={selectedPlaneSeats}
                                                selectedPlane={selectedPlane}
                                                handleCheckboxChange={handleCheckboxChange}
                                                planePrices={planePrices}
                                                onSoldOutChange={handleSoldOutChange}
                                            />
                                            <td>
                                                {isSoldOut ? (
                                                    <button
                                                        className="button sold-out-button"
                                                        style={{ marginTop: '25px',color :'white',backgroundColor:'red' }}
                                                        onClick={() => alert('예약을 할 수 없습니다')}
                                                    >
                                                        매진
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="button"
                                                        style={{ marginTop: '25px' }}
                                                        onClick={() => {
                                                            const seatType = selectedPlaneSeats[selectedPlane.id]?.seatType;
                                                            const price = planePrices[seatType];
                                                            handleItemClick(searchURLObject(location.pathname), selectedPlane, plane, seatType, price);
                                                        }}
                                                    >
                                                        결제
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={planeInfo.length} paginate={paginate} />
                    </div>
                </>
            ) : (
                <p>조회값이 없습니다</p>
            )}

            {showUserGuestPopup && <UserGuestPopup onClose={handleCloseUserGuestPopup} onOptionSelect={handleOptionSelect} />}
            {showLoginModal && <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />}
            {showBookResultModal && sessionStorage.email && (
                <BookResultModal
                    transportationtype={'plane'}
                    selectedPlaneSeats={selectedPlaneSeats}
                    selectedPlane={selectedPlane}
                    plane={plane}
                    handleClose={() => setShowBookResultModal(false)}
                />
            )}
        </div>
    );
};

export default PlaneList;

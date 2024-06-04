import React, { useEffect, useState, useContext } from 'react';
import Pagination from '../../../common/page/Pagination';
import { getBusSchedule } from '@/api/dataApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../global/AuthContext';
import '@/css/Popup.css';
import '@/css/List.css'; // CSS 파일 임포트
import LoginModal from '@components/LoginModal';
import BookResultModal from '@components/BookResultModal';
import BusListSeat from "@/Bus/Search/list/BusListSeat.jsx";
import Join from '../../../User/Join';

const BusList = ({ startStationId, endStationId, gradeCarrier, bus, departureTime, returnDate, passengerCount, departure, destination, isRoundTrip, departureDate }) => {
    const [busInfo, setBusInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [dataLoadError, setDataLoadError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    let sessionStorage = window.sessionStorage;
    const email = sessionStorage.getItem('email');

    const [showUserGuestPopup, setShowUserGuestPopup] = useState(false);
    const [selectedTransportation, setSelectedTransportation] = useState(null);
    const [selectedBus, setSelectedBus] = useState(null);
    const [showBookResultModal, setShowBookResultModal] = useState(false); // State for BookResult modal

    const [showLoginModal, setShowLoginModal] = useState(false); // Login 모달 상태 추가
    const [seatData, setSeatData] = useState({}); // State to track seat data

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
        // Check if user is logged in and then open BookResult modal
        if (sessionStorage.email) {
            setShowBookResultModal(true);
        }
    };

    const searchURLObject = (pathname) => {
        if (pathname.includes('bus')) return 'bus';
        if (pathname.includes('train')) return 'train';
        if (pathname.includes('plane')) return 'plane';
        return null;
    };

    const handleCloseUserGuestPopup = () => {
        setShowUserGuestPopup(false);
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

    const handleOptionSelect = (option) => {
        if (option === 'login') {
            setShowUserGuestPopup(false); // 기존 팝업 닫기
            setShowLoginModal(true); // 로그인 모달 열기
        } else {
            navigate('/api/user/join');
        }
    };

    const seatSelect = () => {
        window.open('http://localhost:5173/search/busseat', '_blank', 'width=600,height=400');
    };

    const handleItemClick = (transportation, selectedBus, bus) => {
        setSelectedBus(selectedBus);
    
        // 순환 참조 없는 데이터만 저장
        const busData = {
            id: selectedBus.id,
            departureTime: selectedBus.departureTime,
            arrivalTime: selectedBus.arrivalTime,
            frequency: selectedBus.frequency,
            price: selectedBus.price,
            carrier: selectedBus.carrier
        };
        
        localStorage.setItem('selectedbus', JSON.stringify(busData));
        
        const busInfoData = {
            departure: bus.departure,
            destination: bus.destination,
            departureDate: bus.departureDate,
            isRoundTrip: bus.isRoundTrip ? '왕복' : '편도',
            returnDate: bus.returnDate,
            passengerCount: bus.passengerCount
        };
    
        localStorage.setItem('bus', JSON.stringify(busInfoData));
    
        if (sessionStorage.email) {
            setShowBookResultModal(true); // Show BookResultModal if logged in
        } else {
            setShowUserGuestPopup(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await getBusSchedule(startStationId, endStationId, gradeCarrier, departureTime);
                console.log('Fetched bus schedule:', res);
                setBusInfo(res.result || []);
                setDataLoadError(false);
            } catch (error) {
                console.error('Error fetching bus info:', error);
                setDataLoadError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (startStationId && endStationId && gradeCarrier && departureTime) {
            fetchData();
        }
    }, [startStationId, endStationId, gradeCarrier, departureTime]);

    const handleSeatChange = (busId, seatCount) => {
        setSeatData(prevData => ({ ...prevData, [busId]: seatCount }));
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = busInfo.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="table-container" style={{ overflow: 'hidden' }}>
            {dataLoadError ? (
                <p>데이터를 조회할 수 없습니다.</p>
            ) : isLoading ? (
                <p>로딩 중...</p>
            ) : (
                <>
                    {currentItems.length > 0 ? (
                        <div style={{ marginTop: '20px' }}>
                            <h2>출발지: {departure}</h2>
                            <h2>도착지: {destination}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>버스 번호</th>
                                        <th>출발 시간</th>
                                        <th>도착 시간</th>
                                        <th>운행 빈도</th>
                                        <th>가격</th>
                                        <th>등급</th>
                                        <th>남은 좌석</th>
                                        <th>결제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((selectedBus) => {
                                        const seatCount = seatData[selectedBus.id] !== undefined ? seatData[selectedBus.id] : JSON.parse(localStorage.getItem(`busSeatData_${selectedBus.id}`)) || null;
                                        const isSoldOut = seatCount <= 0;
                                        
                                        return (
                                            <tr key={selectedBus.id}>
                                                <td>{selectedBus.id}</td>
                                                <td>{selectedBus.departureTime}</td>
                                                <td>{selectedBus.arrivalTime}</td>
                                                <td>{selectedBus.frequency}</td>
                                                <td>{selectedBus.price}</td>
                                                <td>{selectedBus.carrier}</td>
                                                <BusListSeat id={selectedBus.id} date={departureDate} onSeatChange={handleSeatChange} />
                                                <td>
                                                    {isSoldOut ?  (
                                                        <button className="button sold-out-button"  onClick={() => alert('예약을 할 수 없습니다')} style={{color:'white', backgroundColor:'red' }}>
                                                            매진
                                                        </button>
                                                    ) :(
                                                        <button className="button" onClick={() => handleItemClick(searchURLObject(location.pathname), selectedBus, bus)}>
                                                            결제
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <Pagination itemsPerPage={itemsPerPage} totalItems={busInfo.length} paginate={paginate} />
                        </div>
                    ) : (
                        <p>해당 버스 등급의 데이터를 불러오는 중입니다...</p>
                    )}
                </>
            )}

            {showUserGuestPopup && <UserGuestPopup onClose={handleCloseUserGuestPopup} onOptionSelect={handleOptionSelect} />}
            {showLoginModal && <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />}
            {showBookResultModal && sessionStorage.email && <BookResultModal transportationtype={'bus'} handleClose={() => setShowBookResultModal(false)} />}
        </div>
    );
};

export default BusList;

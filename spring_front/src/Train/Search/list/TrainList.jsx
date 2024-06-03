import React, { useContext, useEffect, useState } from 'react';
import { getTrainSchedule, getTrainPrice } from '../../../api/dataApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../../common/page/Pagination';
import '@/css/List.css';
import { AuthContext } from '../../../global/AuthContext';
import '@/css/Popup.css';
import LoginModal from '@/components/LoginModal';
import BookResultModal from '@/components/BookResultModal';
import TrainListSeat from "@/Train/Search/list/TrainListSeat.jsx";

const TrainList = ({ startStationId, endStationId, departureTime, weekdayCarrier, train, date }) => {
    const [trainInfo, setTrainInfo] = useState([]);
    const [trainPrices, setTrainPrices] = useState({}); // State to store train prices
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [timeoutReached, setTimeoutReached] = useState(false);
    // const { sessionStorage.email } = useContext(AuthContext);
    const [showUserGuestPopup, setShowUserGuestPopup] = useState(false);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [showBookResultModal, setShowBookResultModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedTrainSeats, setSelectedSeats] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
        if (sessionStorage.email) {
            setShowBookResultModal(true);
        }
    };


    let sessionStorage = window.sessionStorage;
    const email = sessionStorage.getItem('email');

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTrainSchedule(startStationId, endStationId, weekdayCarrier, departureTime);
                setTrainInfo(res && res.result ? res.result : []);
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
        }, 5000);

        return () => clearTimeout(timeout);
    }, [startStationId, endStationId, departureTime, weekdayCarrier]);

    useEffect(() => {
        const fetchTrainPrices = async () => {
            const prices = {};
            for (const selectedTrain of trainInfo) {
                const priceData = await getTrainPrice(selectedTrain.id);
                prices[selectedTrain.id] = priceData;
            }
            setTrainPrices(prices);
        };

        fetchTrainPrices();
    }, [trainInfo]);

    const searchURLObject = (pathname) => {
        if (pathname.includes('bus')) return 'bus';
        if (pathname.includes('train')) return 'train';
        if (pathname.includes('plane')) return 'plane';
        return null;
    };

    const handleItemClick = (transportation, selectedTrainItem, train, seatType, price) => {
        setSelectedTrain(selectedTrainItem);
        localStorage.setItem('selectedTrain', JSON.stringify(selectedTrainItem));
        localStorage.setItem('train', JSON.stringify(train));
        localStorage.setItem('selectedSeatType_train', JSON.stringify(seatType)); // 선택한 좌석 유형 저장
        localStorage.setItem('seatPrice_train', JSON.stringify(price)); // 선택한 좌석 가격 저장
        if (sessionStorage.email) {
            setShowBookResultModal(true);
            console.log(seatType);
            console.log(selectedTrain);
            console.log(train);
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
        } else {
            // Handle other options
        }
    };

    const handleCheckboxChange = (scheduleId, seatType) => {
        const selectedPrice = seatType === 'standingFreeSeating' 
            ? Math.round(trainPrices[scheduleId]?.general * 0.9) || 'N/A'
            : trainPrices[scheduleId]?.[seatType] || 'N/A';
        setSelectedSeats(prevState => ({
            ...prevState,
            [scheduleId]: { seatType, price: selectedPrice }
        }));
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

    if (timeoutReached && trainInfo.length === 0) {
        return <p>조회값이 없습니다</p>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = trainInfo.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="table-container">
            {trainInfo.length > 0 ? (
                <>
                    <div>
                        <div style={{ marginTop: '600px' }}>
                            <h2>출발지: {train.departure}</h2>
                            <h2>도착지: {train.destination}</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>열차 ID</th>
                                    <th>열차 번호</th>
                                    <th>열차 이름</th>
                                    <th>출발 시간</th>
                                    <th>도착 시간</th>
                                    <th>요금</th>
                                    <th>좌석 선택</th>
                                    <th>예매</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((selectedTrain, index) => (
                                    <tr key={index}>
                                        <td>{selectedTrain.id}</td>
                                        <td>{selectedTrain.frequency}</td>
                                        <td>{selectedTrain.lineName}</td>
                                        <td>{selectedTrain.departureTime}</td>
                                        <td>{selectedTrain.arrivalTime}</td>
                                        {/* <td>{selectedTrain.price}</td> */}
                                        <td>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTrainSeats[selectedTrain.id]?.seatType === 'general'}
                                                    onChange={() => handleCheckboxChange(selectedTrain.id, 'general')}
                                                />
                                                일반석 ({trainPrices[selectedTrain.id]?.general || 'N/A'})
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTrainSeats[selectedTrain.id]?.seatType === 'special'}
                                                    onChange={() => handleCheckboxChange(selectedTrain.id, 'special')}
                                                />
                                                특석 ({trainPrices[selectedTrain.id]?.special || 'N/A'})
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTrainSeats[selectedTrain.id]?.seatType === 'standingFreeSeating'}
                                                    onChange={() => handleCheckboxChange(selectedTrain.id, 'standingFreeSeating')}
                                                />
                                                입석 (자유석) ({trainPrices[selectedTrain.id]?.general ? Math.round(trainPrices[selectedTrain.id]?.general * 0.9) : 'N/A'})
                                            </label>
                                        </td>
                                        <td><TrainListSeat Id={selectedTrain.id} Date={date}/></td>
                                        <td>
                                            <button
                                                className="button"
                                                style={{ marginTop: '25px' }}
                                                onClick={() => {
                                                    const seatType = selectedTrainSeats[selectedTrain.id]?.seatType;
                                                    const price = seatType === 'standingFreeSeating'
                                                        ? Math.round(trainPrices[selectedTrain.id]?.general * 0.9)
                                                        : trainPrices[selectedTrain.id]?.[seatType];
                                                    handleItemClick(searchURLObject(location.pathname), selectedTrain, train, seatType, price);
                                                }}
                                            >
                                                결제
                                            </button>
                                        </td>
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
            {showBookResultModal && sessionStorage.email && <BookResultModal transportationtype={'train'} selectedTrainSeats={selectedTrainSeats} selectedTrain={selectedTrain} train={train} handleClose={() => setShowBookResultModal(false)} />}
        </div>
    );
};

export default TrainList;

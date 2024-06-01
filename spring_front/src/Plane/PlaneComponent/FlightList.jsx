import React, { useState, useEffect, useMemo } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import '../../css/FlightList.css';
import { useContext } from 'react';
import { AuthContext } from '../../global/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import '@/css/Popup.css';
import LoginModal from '@/components/LoginModal';
import BookResultModal from '@/components/BookResultModal';
import { useCookies } from 'react-cookie';
import TossPay from '../../pay/TossPay';



const FlightList = ({ flights, onSelectFareAndBook, departureName, destinationName, selectedDepartureTime,updatebookingData }) => {
    const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';
    const flightData = useMemo(() => flights.station || [], [flights.station]);

    const { isLoggedIn, setRedirectUrl, setGuestRedirectUrl } = useContext(AuthContext);
    const [showUserGuestPopup, setShowUserGuestPopup] = useState(false);
    const [fares, setFares] = useState({});
    const [showBookResultModal, setShowBookResultModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [cookies] = useCookies(['username']);
    const userName = cookies.username || '고객명'; // 쿠키에 username이 없다면 '고객명'으로 대체
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const storedFares = JSON.parse(localStorage.getItem('flightFares')) || {};
        const newFares = flightData.reduce((acc, flight) => {
            if (!storedFares[flight.id]) {
                storedFares[flight.id] = calculateFare(flight.runDay);
            }
            acc[flight.id] = storedFares[flight.id];
            return acc;
        }, {});
        setFares(newFares);
        localStorage.setItem('flightFares', JSON.stringify(newFares));
    }, [flightData]);

    const calculateFare = (runDay) => {
        const dayOfWeek = new Date(runDay).getDay();
        let baseFare;
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            baseFare = Math.random() * (150000 - 100000) + 100000;
        } else {
            baseFare = Math.random() * (100000 - 50000) + 50000;
        }
        return Math.round(baseFare / 100) * 100;
    };

    const searchURLObject = (pathname) => {
        if (pathname.includes('bus')) return 'bus';
        if (pathname.includes('train')) return 'train';
        if (pathname.includes('plane')) return 'plane';
        return null;
    };

    const handleItemClick = (transportation, e, flight, fare) => {
        onSelectFareAndBook(flight, fare, flight.departureTime);            //최신화
        if (isLoggedIn) {
            setShowBookResultModal(true);
        } else {
            setShowUserGuestPopup(true);
        }
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

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
        if (isLoggedIn) {
            setShowBookResultModal(true);
        }
    };

    const handleOptionSelect = (option) => {
        if (option === 'login') {
            setShowUserGuestPopup(false);
            setShowLoginModal(true);
        } 
        // else {
        //     const url = `/api/user/join?payjoin&railName=${encodeURIComponent(selectedtrain.railName)}&trainClass=${encodeURIComponent(selectedtrain.trainClass)}&trainNo=${encodeURIComponent(selectedtrain.trainNo)}&departureTime=${encodeURIComponent(selectedtrain.departureTime)}
        //     &departure=${encodeURIComponent(train.departure)}&destination=${encodeURIComponent(train.destination)}&hour=${encodeURIComponent(train.hour)}&date=${encodeURIComponent(train.date)}&dayz=${encodeURIComponent(train.dayz)}&price=${getTodayFare(selectedtrain.fare)}`;
        //     setGuestRedirectUrl(url);
        //     navigate(url);
        // }
    };

    const handleBook = async (e, flight, fare) => {
        e.preventDefault();
        try {
            <TossPay
            amount={fares[flight.id]}
            orderId={`order_${flight.id}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`}
            orderName={`${flight.airline} - ${departureName} to ${destinationName}`}
            userName={userName}
            successUrl="http://ec2-3-37-87-73.ap-northeast-2.compute.amazonaws.com:9090/pay/paysuccess"
            failUrl="http://ec2-3-37-87-73.ap-northeast-2.compute.amazonaws.com/pay/payfail"
            onSelectFareAndBook={() => onSelectFareAndBook(flight, fares[flight.id], flight.departureTime, flight.arrivalTime)}
        />
        } catch (error) {
            console.error('토스 결제 로드 에러:', error);
        }
        onSelectFareAndBook(flight, fare, flight.departureTime);
    };

    const filteredFlights = useMemo(() => {
        const selectedTime = new Date(`1970-01-01T${selectedDepartureTime}:00`).getTime();
        return flightData.filter(flight => {
            const flightTime = new Date(`1970-01-01T${flight.departureTime}:00`).getTime();
            return flightTime >= selectedTime;
        });
    }, [flightData, selectedDepartureTime]);

    return (
        <div>
            <h3>Available Flights</h3>
            {filteredFlights.length > 0 ? (
                <table className="flights-table">
                    <thead>
                        <tr>
                            <th>Flight Name</th>
                            <th>Departure Station</th>
                            <th>Destination Station</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Run Day</th>
                            <th>Fare</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFlights.map((flight, index) => (
                            <tr key={index}>
                                <td>{flight.airline}</td>
                                <td>{departureName}</td>
                                <td>{destinationName}</td>
                                <td>{flight.departureTime}</td>
                                <td>{flight.arrivalTime}</td>
                                <td>{flight.runDay}</td>
                                <td>₩{fares[flight.id]}</td>
                                <td>
                                    <button className="button" onClick={(e) => handleItemClick(searchURLObject(location.pathname), e, flight, fares[flight.id])}>결제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No flights available for the selected criteria.</p>
            )}
            {showUserGuestPopup && <UserGuestPopup onClose={handleCloseUserGuestPopup} onOptionSelect={handleOptionSelect} />}
            {showLoginModal && <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />}
            {showBookResultModal && isLoggedIn && <BookResultModal transportationtype={'plane'} handleClose={() => setShowBookResultModal(false)} />}
        </div>
    );
};

export default FlightList;
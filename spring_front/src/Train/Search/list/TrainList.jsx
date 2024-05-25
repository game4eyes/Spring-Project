import React, { useContext, useEffect, useState } from 'react';
import { getTrainInfo } from '@/api/dataApi';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../common/page/Pagination';
import '@/css/TrainList.css'; // CSS 파일 임포트
import { AuthContext } from '../../../global/AuthContext';

const TrainList = ({ startStationID, endStationID, hour, dayz }) => {
    const [trainInfo, setTrainInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [timeoutReached, setTimeoutReached] = useState(false);
    const { isLoggedIn, setRedirectUrl, setGuestRedirectUrl } = useContext(AuthContext);
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


    // if (isLoggedIn) {
    //     const url = `/ticketbook/${transportation}?type=회원`;
    //     setRedirectUrl(url);
    //     navigate(url);
    // } else {
    //     setShowUserGuestPopup(true);
    // }

    const searchURLObject = (pathname) => {
        if (pathname.includes('bus')) return 'bus';
        if (pathname.includes('train')) return 'train';
        if (pathname.includes('plane')) return 'plane';
        return null;
    };


const handleCloseUserGuestPopup = () => {
    setShowUserGuestPopup(false);
};

const handleOptionSelect = (option) => {
    setShowUserGuestPopup(false);
    const url = `/ticketbook/${selectedTransportation}?type=${option}`;
    if (option === '회원') {
        //setRedirectUrl(url);
        navigate('/api/user/login?paytest');
    } else {
       // setGuestRedirectUrl(url);
        navigate('/api/user/guest-booking');
    }
};


const UserGuestPopup = ({ onClose, onOptionSelect }) => (
    <div className="UserGuestPopup">
        <div className="UserGuestPopup-inner">
            <h3>예매 유형 선택</h3>
            <button onClick={() => onOptionSelect('회원')}>회원 예매</button>
            <button onClick={() => onOptionSelect('비회원')}>비회원 예매</button>
            <button onClick={onClose}>닫기</button>
        </div>
    </div>
);

    const seatselect = () => {
        window.open('http://localhost:5173/search/busseat', '_blank', 'width=600,height=400');
    }

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
                            <th>요금</th>
                            <th>좌석 선택</th>
                            <th>예매</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((train, index) => (
                            <tr key={index}>
                                <td>{train.railName}</td>
                                <td>{train.trainClass}</td>
                                <td>{train.trainNo}</td>
                                <td>{train.departureTime}</td>
                                <td>{train.arrivalTime}</td>
                                <td>{train.wasteTime}</td>
                                <td>{train.runDay}</td>
                                <td>
                                    {train.fare.generalFare.weekday && <p>평일: {train.fare.generalFare.weekday}</p>}
                                    {train.fare.generalFare.weekend && <p>주말: {train.fare.generalFare.weekend}</p>}
                                    {train.fare.generalFare.holiday && <p>공휴일: {train.fare.generalFare.holiday}</p>}
                                </td>
                                <td><button className="button" onClick={seatselect}>좌석 선택</button></td>
                                <td><button className="button" onClick={payment}>결제</button></td>
                                <td><button className="button" onClick={() => handleItemClick(searchURLObject(location.pathname), detail)}>테스트 버튼</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
            <p>조회값이 없습니다</p>
            )}
            <Pagination itemsPerPage={itemsPerPage} totalItems={trainInfo.length} paginate={paginate} />
        </div>
    );
};

export default TrainList;

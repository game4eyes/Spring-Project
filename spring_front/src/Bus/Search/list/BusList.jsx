import React, { useEffect, useState } from 'react';
import Pagination from '../../../common/page/Pagination';
import { getBusSchedule } from '@/api/dataApi';
//import BusSeat from '../../BusSeat';

const BusList = ({ startStationID, endStationID }) => {
    const [busInfo, setBusInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getBusSchedule(startStationID, endStationID);
                setBusInfo(res ? res : {});
            } catch (error) {
                console.error('Error fetching bus info:', error);
            }
        };

        fetchData();
    }, [startStationID, endStationID]);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        // 페이지 번호 클릭 시 페이지 맨 위로 스크롤
        window.scrollTo(0, 0);
    }

    const seatSelect = () => {
        window.open('http://localhost:5173/search/busseat', '_blank', 'width=600,height=400');
    }

    const payment = () => {
        window.open('http://localhost:5173/pay/pay', '_blank', 'width=600,height=400');
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = busInfo.detail ? busInfo.detail.slice(indexOfFirstItem, indexOfLastItem) : [];

    return (
        <div className="table-container" style={{ overflow: 'hidden' }}>
            {currentItems.length > 0 ? (
                <>
                    <h2>출발지: {busInfo.startStationName}</h2>
                    <h2>도착지: {busInfo.endStationName}</h2>
                    <h3>첫차 시간: {busInfo.firstTime}</h3>
                    <h3>막차 시간: {busInfo.lastTime}
                    </h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>출발 시간</th>
                                <th>소요 시간</th>
                                <th>요금</th>
                                <th>좌석 선택</th>
                                <th>결제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail.departureTime}</td>
                                    <td>{Math.floor(detail.wasteTime / 60)}시간 {detail.wasteTime % 60}분</td>
                                    <td>{detail.fare.toLocaleString()}원</td>
                                    <td><button className="button" onClick={seatSelect}>좌석 선택</button></td>
                                    <td><button className="button" onClick={payment}>결제</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination itemsPerPage={itemsPerPage} totalItems={busInfo.detail.length} paginate={paginate} />
                </>
            ) : (
                <p>데이터를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default BusList;

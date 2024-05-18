import React, { useEffect, useState } from 'react';
import Pagination from '../../../common/page/Pagination';
import { getBusSchedule } from '@/api/dataApi';
//import BusSeat from '../../BusSeat';

const BusList = ({startStationID, endStationID}) => {
    const [busInfo, setBusInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // getBusSchedule 함수는 아래와 같이 정의되어야 합니다.
                const res = await getBusSchedule(startStationID, endStationID);
                setBusInfo(res && res.station ? res.station : []);
            } catch (error) {
                console.error('Error fetching bus info:', error);
            }
        };

        fetchData();
    }, [startStationID, endStationID]);

    

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = busInfo.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const seatSelect = () => {
        window.open('http://localhost:5173/search/busseat', '_blank', 'width=600,height=400');
    }

    const payment = () => {
        window.open('http://localhost:5173/pay/pay', '_blank', 'width=600,height=400');
    }

    return (
        <div className="table-container">
            {busInfo.length > 0 ? (
                <>
                    <h2>출발지: {currentItems.startStationName}</h2>
                    <h2>도착지: {currentItems.endStationName}</h2>
                    <h3>첫차 시간: {currentItems.firstTime}</h3>
                    <h3>막차 시간: {currentItems.lastTime}</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>출발 시간</th>
                                <th>소요 시간</th>
                                <th>요금</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.detail.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail.departureTime}</td>
                                    <td>{Math.floor(detail.wasteTime / 60)}시간 {detail.wasteTime % 60}분</td>
                                    <td>{detail.fare.toLocaleString()}원</td>
                                    <td><button className="button" onClick={seatselect}>좌석 선택</button></td>
                                <td><button className="button" onClick={payment}>결제</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>데이터를 불러오는 중입니다...</p>
            )}
            <Pagination itemsPerPage={itemsPerPage} totalItems={busInfo.length} paginate={paginate} />
        </div>
    );
};

export default BusList;

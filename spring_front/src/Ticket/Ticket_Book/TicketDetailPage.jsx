import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Ad from '../components/Ad';
import { useParams } from 'react-router-dom';  // URL에서 파라미터 추출용

const TicketDetailsPage = () => {
    const [ticketDetails, setTicketDetails] = useState(null);
    const { ticketId } = useParams(); // URL로부터 ticketId를 추출합니다.

    // 티켓 상세 정보를 로드하는 함수
    const fetchTicketDetails = async () => {
        try {
            const response = await axios.get(`/api/tickets/${ticketId}`);
            setTicketDetails(response.data);
        } catch (error) {
            console.error('티켓 상세 정보를 불러오는 데 실패했습니다.', error);
        }
    };

    useEffect(() => {
        if (ticketId) {
            fetchTicketDetails();
        }
    }, [ticketId]);

    return (
        <div className="ticket-details-page">
            <Header />
            <h1>상세 페이지</h1>
            <div className="ticket-details">
                {ticketDetails ? (
                    <div>
                        <h2>티켓 정보</h2>
                        <p>출발지: {ticketDetails.departure}</p>
                        <p>도착지: {ticketDetails.destination}</p>
                        <p>출발 시간: {ticketDetails.time}</p>
                        <p>예약 인원: {ticketDetails.passengerCount}</p>
                    </div>
                ) : (
                    <p>티켓 정보를 불러오는 중...</p>
                )}
            </div>
            <Ad />
            <Footer />
        </div>
    );
};

export default TicketDetailsPage;

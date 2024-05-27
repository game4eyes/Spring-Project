import React, { useState, useEffect, useMemo } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import '../../css/FlightList.css';

const FlightList = ({ flights, onSelectFareAndBook, departureName, destinationName, selectedDepartureTime }) => {
    const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';
    const flightData = useMemo(() => flights.station || [], [flights.station]);

    const [fares, setFares] = useState({});

    useEffect(() => {
        const newFares = flightData.reduce((acc, flight) => {
            acc[flight.id] = calculateFare(flight.runDay);
            return acc;
        }, {});
        setFares(newFares);
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

    const handleBook = async (e, flight, fare) => {
        e.preventDefault();
        try {
            const tossPayments = await loadTossPayments(clientKey);
            tossPayments.requestPayment('카드', {
                amount: fare,
                orderId: `order_${flight.id}_${Date.now()}`,
                orderName: `${flight.airline} - ${departureName} to ${destinationName}`,
                customerName: '고객명', // 실제 고객 이름으로 대체하세요
                successUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/paysuccess', // 성공시 URL
                failUrl: 'http://ec2-15-164-224-69.ap-northeast-2.compute.amazonaws.com:9090/pay/payfail', // 실패시 URL
            }).catch(function (error) {
                if (error.code === 'USER_CANCEL') {
                    // 사용자가 결제창을 닫았을 때 처리
                } else if (error.code === 'INVALID_CARD_COMPANY') {
                    // 유효하지 않은 카드 코드 처리
                } else {
                    // 기타 에러 처리
                    console.error(error);
                }
            });
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
                            <th>Action</th>
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
                                    <button type="button" onClick={(e) => handleBook(e, flight, fares[flight.id])}>Book</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No flights available for the selected criteria.</p>
            )}
        </div>
    );
};

export default FlightList;

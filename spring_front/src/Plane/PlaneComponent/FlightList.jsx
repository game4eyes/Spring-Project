import React, { useState, useEffect, useMemo } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import '../../css/FlightList.css';
import TossPay from '../../pay/TossPay'; 
import { useCookies } from 'react-cookie';

const FlightList = ({ flights, onSelectFareAndBook, departureName, destinationName, selectedDepartureTime }) => {
    const clientKey = 'test_ck_ex6BJGQOVDb1xavAXnNR8W4w2zNb';
    const flightData = useMemo(() => flights.station || [], [flights.station]);

    const [fares, setFares] = useState({});
    const [cookies] = useCookies(['username']); 
    const userName = cookies.username || '고객명'; // 쿠키에 username이 없다면 '고객명'으로 대체
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
                            <th>Payment method</th>
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
                                    <TossPay
                                        amount={fares[flight.id]}
                                        orderId={`order_${flight.id}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`}
                                        orderName={`${flight.airline} - ${departureName} to ${destinationName}`}
                                        userName={userName}
                                        successUrl="http://ec2-3-37-87-73.ap-northeast-2.compute.amazonaws.com:9090/pay/paysuccess"
                                        failUrl="http://ec2-3-37-87-73.ap-northeast-2.compute.amazonaws.com/pay/payfail"
                                        onSelectFareAndBook={() => onSelectFareAndBook(flight, fares[flight.id], flight.departureTime)}
                                    />
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

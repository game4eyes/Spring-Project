import React, { useState, useEffect, useMemo } from 'react';
import '../../css/FlightList.css';

const FlightList = ({ flights, onSelectFareAndBook, departureName, destinationName, selectedDepartureTime }) => {
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

    const handleBook = (e, flight, fare) => {
        e.preventDefault();
        onSelectFareAndBook(flight, fare, flight.departureTime); // 선택한 시간 정보를 상위 컴포넌트로 전달
    };

    // 사용자가 선택한 시간 이후의 출발 시간만 필터링
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

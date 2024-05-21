import React from 'react';
import '../../css/FlightList.css';

const FlightList = ({ flights }) => {
    const flightData = flights.station || [];

    // 요금을 결정하는 함수, 100원 단위로 반올림
    const calculateFare = (runDay) => {
        const dayOfWeek = new Date(runDay).getDay(); // 요일을 숫자로 반환 (0: 일요일, 6: 토요일)
        let baseFare;
        if (dayOfWeek === 0 || dayOfWeek === 6) { // 주말 요금
            baseFare = Math.random() * (150000 - 100000) + 100000; // 10만원에서 15만원 사이
        } else { // 평일 요금
            baseFare = Math.random() * (100000 - 50000) + 50000; // 5만원에서 10만원 사이
        }
        return Math.round(baseFare / 100) * 100; // 100원 단위로 반올림
    };

    return (
        <div>
            <h3>Available Flights</h3>
            {flightData.length > 0 ? (
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
                        {flightData.map((flight, index) => (
                            <tr key={index}>
                                <td>{flight.airline}</td>
                                <td>{flight.startStationName}</td>
                                <td>{flight.endStationName}</td>
                                <td>{flight.departureTime}</td>
                                <td>{flight.arrivalTime}</td>
                                <td>{flight.runDay}</td>
                                <td>₩{calculateFare(flight.runDay)}</td>
                                <td><button>Book</button></td>
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

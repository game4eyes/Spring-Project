import React from 'react';
import './FlightList.css';

const FlightList = ({ flights }) => {
    const flightData = flights.station || []; // 데이터 구조에 맞게 접근 경로를 확인해야 합니다.

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
                                <td>₩{flight.fare}</td>
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

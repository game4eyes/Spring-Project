import React, { useState, useEffect } from 'react';
import '../../css/FlightList.css';

const FlightList = ({ flights, onSelectFare }) => {
    const flightData = flights.station || [];
    const [fares, setFares] = useState({});

    useEffect(() => {
        // 각 항공편에 대해 요금을 계산하고 저장
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

    const handleBook = (e, fare) => {
        e.preventDefault();
        onSelectFare(fare);
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
                                <td>₩{fares[flight.id]}</td>
                                <td>
                                    <button type="button" onClick={(e) => handleBook(e, fares[flight.id])}>Book</button>
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

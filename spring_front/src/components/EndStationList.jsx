import React, { useEffect, useState } from 'react';
import { getEndStationList } from '@/api/dataApi'; // Adjust the import path as necessary

const EndStationList = ({ startStationId, onStationSelect }) => {
    const [endStations, setEndStations] = useState([]);
    const [destination, setDestination] = useState('');

    useEffect(() => {
        const fetchEndStations = async () => {
            try {
                if (startStationId) {
                    const data = await getEndStationList(startStationId);
                    setEndStations(data);
                }
            } catch (error) {
                console.error('Error fetching end stations:', error);
            }
        };

        fetchEndStations();
    }, [startStationId]);


    const handleEndStationChange = (event) => {
        const stationId = event.target.value;
        console.log('엔드 아이디 : '+stationId);
        const destination = endStations.find(station => station.stationId === parseInt(stationId)); // Find the station object with matching stationId
        const stationName = destination ? destination.stationName : ''; // Extract the stationName from the selected station object, or set it to an empty string if not found
        setDestination(stationName); // Update the selected station name
        onStationSelect(stationId, stationName); // Call the onStationSelect function with the selected stationId
    };
    


    return (
        <div>
            <label>도착지<br></br>
                <select onChange={handleEndStationChange}>
                    <option value="">도착지를 선택하세요</option>
                    {endStations.map((station) => (
                  
                        <option key={station.stationId} value={station.stationId}>
                            {station.stationName}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>선택된 도착지 이름<br></br>
                <input
                    type="text"
                    value={destination}
                    readOnly
                    placeholder="선택된 도착지 이름이 여기에 표시됩니다"
                />
            </label>
        </div>
    );
};

export default EndStationList;

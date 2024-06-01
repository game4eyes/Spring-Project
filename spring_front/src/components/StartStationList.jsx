import React, { useEffect, useState } from 'react';
import { getStartStationList } from '@/api/dataApi'; // Adjust the import path as necessary

const StartStationList = ({ stationTypeId, onStationSelect,onDepartureSelect }) => {
    const [startStations, setStartStations] = useState([]);
    const [departure, setDeparture] = useState('');

    useEffect(() => {
        const fetchStartStations = async () => {
            try {
                const data = await getStartStationList(stationTypeId);
                setStartStations(data);
            } catch (error) {
                console.error('Error fetching start stations:', error);
            }
        };

        fetchStartStations();
    }, [stationTypeId]);

    const handleStartStationChange = (event) => {
        const stationId = event.target.value;
        const station = startStations.find(station => station.id === parseInt(stationId));
        const stationName = station ? station.stationName : '';
        setDeparture(stationName);
        onStationSelect(stationId, stationName); // Call the onStationSelect function with the selected stationId and stationName
    };
    

    return (
       <div>
            <label>출발지<br></br>
                <select onChange={handleStartStationChange}>
                    <option value="">출발지를 선택하세요</option>
                    {startStations.map((station) => (
                        <option key={station.id} value={station.id}>
                            {station.stationName}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            {/* <label>선택된 출발지 이름<br></br> */}
                <input
                    type="hidden"
                    value={departure}
                    readOnly
                    placeholder="선택된 출발지 이름이 여기에 표시됩니다"
                />
            {/* </label> */}
        </div>
    );
};

export default StartStationList;

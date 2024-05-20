import React, { useEffect, useState } from 'react';
import { getCityInfo } from '../../api/dataApi';

const CitySelector = ({ label, onCityChange }) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getCityInfo().then(data => {
            setCities(data); // 가정: API 응답이 배열 형태로 도시 목록을 직접 반환
        });
    }, []);

    return (
        <label>
            {label}:
            <select onChange={onCityChange}>
                <option value="">도시를 선택하세요</option>
                {cities.map(city => (
                    <option key={city.id} value={city.name}>{city.name}</option>
                ))}
            </select>
        </label>
    );
};

export default CitySelector;

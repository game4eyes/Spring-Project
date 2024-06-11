import React, { useState } from 'react';
import { getAirInfo } from '../../api/dataApi'; // API 호출 함수 가져오기

const SearchAirport = () => {
    const [input, setInput] = useState('');
    const [airports, setAirports] = useState([]); // 검색된 공항 데이터를 저장할 상태

    // 검색 입력 처리 핸들러
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    // // 검색 실행
    // const handleSearch = async () => {
    //     if (input.trim() === '') {
    //         alert('검색어를 입력해주세요.');
    //         return;
    //     }
    //     try {
    //         const results = await getAirInfo(input); // API 호출
    //         setAirports(results); // 결과 상태 업데이트
    //     } catch (error) {
    //         console.error('Error fetching airports:', error);
    //         alert('공항 정보를 가져오는데 실패했습니다.');
    //     }
    // };



        // 검색 실행
        const handleSearch = async () => {
            if (input.trim() === '') {
                alert('검색어를 입력해주세요.');
                return;
            }
            try {
                const results = await getPlaneSchedule (input); // API 호출
                setAirports(results); // 결과 상태 업데이트
            } catch (error) {
                console.error('Error fetching airports:', error);
                alert('공항 정보를 가져오는데 실패했습니다.');
            }
        };

        

    return (
        <div>
            <h1>공항 검색</h1>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="공항 이름 입력"
            />
            <button onClick={handleSearch}>검색</button>
            <div>
                {airports.length > 0 ? (
                    <ul>
                        {airports.map(airport => (
                            <li key={airport.id}>{airport.name} - {airport.location}</li>
                        ))}
                    </ul>
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default SearchAirport;

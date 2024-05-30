// Plane.jsx파일 하드코딩 방식으로 바꿔서 일단 올주석(국내선 이용률 통계 바탕으로 상위 노선만 하드코딩)

// import React, { useEffect, useState } from 'react';
// import { getStationInfo } from '../../api/dataApi';

// const AirportSelector = ({ label, onAirportChange }) => {
//     const [airports, setAirports] = useState([]);

//     // 공항 정보 불러오기
//     useEffect(() => {
//         getStationInfo(5) // 5는 공항을 나타내는 stationClass 코드
//             .then(data => {
//                 setAirports(data); // API 응답 데이터를 상태에 저장
//             })
//             .catch(error => {
//                 console.error('Failed to fetch airports:', error);
//             });
//     }, []);

//     return (
//         <label>
//             {label}:
//             <select onChange={onAirportChange}>
//                 <option value="">공항을 선택하세요</option>
//                 {airports.map(airport => (
//                     <option key={airport.stationID} value={airport.stationID}>
//                         {airport.stationName}
//                     </option>
//                 ))}
//             </select>
//         </label>
//     );
// };

// export default AirportSelector;

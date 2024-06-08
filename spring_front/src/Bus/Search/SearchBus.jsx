// import React, { useEffect, useState } from 'react';
// import { getCityInfo } from "@/api/dataApi.jsx";
// import CityName from "@/Bus/Search/list/CityName.jsx";
// import BusClass from "@/Bus/Search/list/BusClass.jsx";
// import StartStationList from "@/Bus/Search/list/StartStationList.jsx";
// import EndStationList from "@/Bus/Search/list/EndStationList.jsx";
// import '../../css/CommonButton.css'; 

// export const Region = [
//     "서울", "경기도", "인천", "강원도", "대전", "충청남도", "충청북도", "광주",
//     "전라북도", "전라남도", "대구", "울산", "부산", "경상북도", "경상남도", "제주도"
// ];

// const SearchBus = ({ onSearchResult }) => {
//     const [allSelected, setAllSelected] = useState("");
//     const [cityInfo, setCityInfo] = useState(null);
//     const [region, setRegion] = useState(null);
//     const [selectedCity, setSelectedCity] = useState(null);
//     const [selectedBusClass, setSelectedBusClass] = useState(null);
//     const [result, setResult] = useState(null);
//     const [startStationID, setStartStationID] = useState();
//     const [endStationList, setEndStationList] = useState();
//     const [endStationID, setEndStationID] = useState();

//     const [departure, setDeparture] = useState();
//     const [destination, setDestination] = useState();


//     const urlParams = new URLSearchParams(window.location.search);
//     const stationClassParam = urlParams.get('stationClass');

//     useEffect(() => {
//         setAllSelected(region + cityInfo + selectedCity + selectedBusClass + result + startStationID + endStationList + endStationID);
//     }, [cityInfo, region, selectedCity, selectedBusClass, result, startStationID, endStationList, endStationID]);


//         // region에 저장하기 위한 메서드

//     const handleGetCityInfo = (cityRegion) => {
//         setRegion(cityRegion);
//     };

//     // 상세 지역 정보를 가지고 오기 위한 훅
//     useEffect(() => {
//         const fetchCityInfo = async () => {
//             if (region) {
//                 const data = await getCityInfo(region);
//                 setCityInfo(data[0]);
//             }
//         };
//         fetchCityInfo();
//     }, [region]);

// // 도시 코드 저장
//     const handleCityCode = (code) => {
//         setSelectedCity(code);
//     };
//  // 버스 종류 저장
//     const handleBusClass = (code) => {
//         setSelectedBusClass(code);
//     };
//   // 검색 결과를 부모에 저장 하기
//     const handleSearchResult = (result) => {
//         setResult(result);
//         console.log(result);
//     };
//         // url 수정
//     const updateURLParameter = (key, value) => {
//         const url = new URL(window.location);
//         url.searchParams.set(key, value);
//         window.history.pushState({}, '', url);
//     };
//     // 시작
//     const handleStartStationID = (id, list, departure) => {
//         setStartStationID(id);
//         setEndStationList(list);
//         updateURLParameter('departure', id); // Update URL with the start station ID as departure
//         setDeparture(departure);
//     };
//         // 끝
//     const handleEndStationID = (id,destination) => {
//         setEndStationID(id);
//         updateURLParameter('destination', id); // Update URL with the end station ID as destination
//         setDestination(destination);
//     };



//     const confirm = () => {
//         const urlParams = new URLSearchParams(window.location.search); //URL 파라미터 추출 (공항,기차의 출발지,도착지,StationClass 추출하는데 필요합니다)
    
//         // Fetch the departure and destination values from URL parameters
//        // const departure = urlParams.get('departure');
//      //   const destination = urlParams.get('destination');
//         // const startStationID = urlParams.get('startStationID');
//         // const endStationID = urlParams.get('endStationID');

//             const startStationID = urlParams.get('departure');
//         const endStationID = urlParams.get('destination');
//         console.log(startStationID);
//         console.log(endStationID);
//         // Check if the values exist and set them in the parent window's input fields
//      //   if (departure && destination && startStationID && endStationID) {
//         if (startStationID && endStationID) {
//             // Setting values to the parent window's input fields
//              window.opener.document.getElementById("departure").value = departure;
//              window.opener.document.getElementById("destination").value = destination;
//             window.opener.document.getElementById("departure_stationID").value = startStationID;
//             window.opener.document.getElementById("destination_stationID").value = endStationID;
            
//         } else {
//             console.error('Missing parameters in the URL');
//         }
    
//         // Optionally close the popup after setting the values
//         window.close();
//     };
    

//     return (
//         <div>
//             <p>{allSelected}</p>
//             {Region.map((region, index) => (
//                 <button key={index} className="button" onClick={() => handleGetCityInfo(region)}>
//                     {region}
//                 </button>
//             ))}
//             {cityInfo && cityInfo.cityInfoDTO && !selectedCity && (
//                 <>
//                     <h1>{region}의 상세 도시</h1>
//                     <div>
//                         {cityInfo.cityInfoDTO.map((city) => (
//                             <CityName key={city.cityCode} city={city} onChangeCityCode={handleCityCode} />
//                         ))}
//                     </div>
//                 </>
//             )}
//             {selectedCity && !selectedBusClass && (
//                 <>
//                     <h1>버스 종류를 선택하세요</h1>
//                     <BusClass onStationClassChange={handleBusClass} />
//                 </>
//             )}
//             {selectedCity && selectedBusClass && !startStationID && (
//                 <StartStationList
//                     cityCode={selectedCity}
//                     busClass={selectedBusClass}
//                     onChangeResult={handleSearchResult}
//                     onChangeStartId={handleStartStationID}
//                 />
//             )}
//             {startStationID && !endStationID && (
//                 <EndStationList
//                     endStationList={endStationList}
//                     onChangeEndId={handleEndStationID}
//                 />
//             )}
//             {startStationID && endStationID && (
//                 <div>
//                      <button className="button" onClick={() => confirm({ handleStartStationID, handleEndStationID })}>확인</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SearchBus;

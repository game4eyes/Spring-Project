import React, { useEffect, useState } from 'react';
import { getStationInfo } from '../../api/dataApi';

const SearchTrainStation = ({ departure, destination, onSearchResult }) => {
    const [stations, setStations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedData, setSortedData] = useState([]);


    const urlParams = new URLSearchParams(window.location.search);          //URL 파라미터 추출 (공항,기차의 출발지,도착지,StationClass 추출하는데 필요합니다)
    const departureParam = urlParams.get('departure');
    const destinationParam = urlParams.get('destination');
   const stationClassParam = urlParams.get('stationClass');


    const KoreanArrays = ["가","나","다","라","마","바","사","아","자","차","카","타","파","하"];

    useEffect(() => {
        // API에서 기차역 정보를 가져옵니다.
            const stationClass = checkStationClass();
            fetchStationInfo(stationClass);
     
        
        fetchStationInfo(checkStationClass);  //fetchStationInfo(3);
    }, []);

    const checkStationClass = () => {
        // const urlParams = new URLSearchParams(window.location.search);
        // const stationClassParam = urlParams.get('stationClass');
    
        // stationClassParam이 존재하고 정수로 변환 가능한 경우 해당 값을 반환합니다.
        // 그렇지 않으면 빈 문자열을 반환합니다.
        return stationClassParam && !isNaN(parseInt(stationClassParam)) ? parseInt(stationClassParam) : '';
    };
    

   



    const fetchStationInfo = async (stationClass) => {
        try {
            const data = await getStationInfo(stationClass);
            setStations(data);
        } catch (error) {
            console.error('Error fetching station data:', error);
        }
    };

    const handleRegionClick = async (region) => {
        // 정규표현식을 사용하여 해당 자음으로 시작하는 역 이름을 찾습니다.
        const regex = new RegExp(`^(${getFirstConsonant(region)}|${getFirstConsonant(region).toLowerCase()})`);
        const filteredData = stations.filter(station => regex.test(getFirstConsonant(station.stationName)));
        setSortedData(filteredData);
    };

    // 첫 글자의 자음을 가져오는 함수
    const getFirstConsonant = (str) => {
        const unicode = str.charCodeAt(0);
        // 자음이 아닌 경우 공백 문자로 반환
        if (unicode < 44032 || unicode > 55203) return ' ';
        // 초성 인덱스 = ((유니코드 - 44032) / 28) / 21
        const consonantIndex = Math.floor(((unicode - 44032) / 28) / 21);
        // 초성은 초성 인덱스에 0x1100을 더한 값이 됨
        return String.fromCharCode(consonantIndex + 0x1100);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setSortedData([]);
        } else {
            const filteredStations = stations.filter(station => station.stationName.includes(e.target.value));
            setSortedData(filteredStations);
        }
    };

    const handleStationClick = (stationName) => {
        setSearchTerm(stationName);
    };

    const windowclose = () => {
        window.close();
    };


    

        const confirm = (stationName) => {
        // const urlParams = new URLSearchParams(window.location.search);
        // const departureParam = urlParams.get('departure');
        
        // 부모 창의 입력란 ID를 결정합니다.
        const inputId = departureParam === 'departure' ? 'departure' : 'destination';
    
        // 선택한 역 이름을 해당 입력란에 설정합니다.
        window.opener.document.getElementById(inputId).value = stationName;
    
        // 팝업 창을 닫습니다.
        window.close();
    };


    
    return (
        <div>
            <div>
            {stationClassParam === '3'&&  <h2>기차역 정보</h2>}
            {stationClassParam === '5'&&  <h2>비행기 정보</h2>} 
            </div>
            <div>
                <input type="text" value={searchTerm} onChange={handleInputChange} />
                <button type="button" onClick={() => confirm(searchTerm)}>확인</button>
                <button type="button" onClick={windowclose}>나가기</button>
            </div>
            <div>
                {/* URL의 값에 따라 출발지 선택 또는 도착지 선택을 렌더링합니다. */}
                {departureParam === 'departure'&& <h2>출발지 선택</h2>}
                {destinationParam  === 'destination'&& <h2>도착지 선택</h2>}
            </div>
            <div>
                <h2>지역 선택</h2>
                {/* 한글 자음 버튼들을 출력합니다. */}
                {KoreanArrays.map((region, i) => (
                    <button key={i} onClick={() => handleRegionClick(region)}>{region}</button>
                ))}
            </div>
            <div>
                <ul>
                    {/* sortedData에 따라 기차역 정보를 출력합니다. */}
                    {sortedData.map(station => (
                        <li key={station.stationID} onClick={() => handleStationClick(station.stationName)}>
                            <a href ="#">{station.stationName}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchTrainStation;

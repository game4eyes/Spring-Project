import React, { useEffect, useState } from 'react';
import { getStationInfo } from '../../api/dataApi';
import { useNavigate } from 'react-router-dom';
import '../../css/CommonButton.css';
//import {setTrainticketAndUpdate} from '../../Ticket/Ticket_Book/Train';

const SearchTrainStation = ({ departure, destination, onSearchResult }) => {
    const [stations, setStations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedData, setSortedData] = useState([]);


    const urlParams = new URLSearchParams(window.location.search);          //URL 파라미터 추출 (공항,기차의 출발지,도착지,StationClass 추출하는데 필요합니다)
    const departureParam = urlParams.get('departure');
    const destinationParam = urlParams.get('destination');
   const stationClassParam = urlParams.get('stationClass');


   const navigate = useNavigate();

    const KoreanArrays = ["가","나","다","라","마","바","사","아","자","차","카","타","파","하"];

    useEffect(() => {
        // API에서 기차역 정보를 가져옵니다.
            const stationClass = checkStationClass();
            fetchStationInfo(stationClass);     //fetchStationInfo(3);
     
        
     //   fetchStationInfo(checkStationClass);  
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
           // console.log(data);
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

    const handleStationClick = (stationName,stationID) => {
        setSearchTerm(stationName);

        


        // 현재 URL의 쿼리 파라미터를 가져옵니다.
        const urlParams = new URLSearchParams(window.location.search);

        // departure와 destination 파라미터가 이미 있는지 확인합니다.
        const hasDeparture = urlParams.has('departure');
        const hasDestination = urlParams.has('destination');

        // 쿼리 파라미터를 업데이트합니다.
        if (hasDeparture) {
            urlParams.set('departure', stationID);
            //ID값 추가
             opener.window.document.getElementById("departure_stationID").value = stationID;

        } else if (hasDestination) {
            urlParams.set('destination', stationID);
            //ID값 추가
              opener.window.document.getElementById("destination_stationID").value = stationID;
        }

        // 업데이트된 쿼리 파라미터를 포함한 새로운 URL을 생성합니다.
       // const newUrl = `?${urlParams.toString()}&stationClass=3`;
       const newUrl = `?${urlParams.toString()}`;



       //
            


        // 새로운 URL로 이동합니다.
        navigate(newUrl);

        
    };


    const windowclose = () => {
        const inputId = urlParams.has('departure') ? 'departure' : 'destination';
        const inputId_stationID = inputId+"_stationID";
        if( window.opener.document.getElementById(inputId).value ==""){
            opener.window.document.getElementById(inputId_stationID).value = "";
        }
        window.close();
    };


    
    const confirm = (stationName) => {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(fetchStationInfo(3).stationName);
        // 부모 창의 입력란 ID를 결정합니다.
        const inputId = urlParams.has('departure') ? 'departure' : 'destination';
        const inputId_stationID = inputId+"_stationID";
        console.log(inputId_stationID);
        // 선택한 역 이름을 해당 입력란에 설정합니다.
        window.opener.document.getElementById(inputId).value = stationName;
    
        function compareStationNameWithSearchBoxValue(stationClassParam) {
            // sortedData 배열의 각 역에 대해 반복합니다.
            for (let station of sortedData) {
                // 현재 역의 이름과 검색 상자의 값을 비교합니다.
                if (station.stationName === document.getElementById('searchbox').value) {
                    // 일치하는 경우 true를 반환하고 함수를 종료합니다.
                    opener.window.document.getElementById(inputId_stationID).value = station.stationID;         //역 ID 반환
                    
                    return true;
                }
            }
            // 일치하는 역을 찾지 못한 경우 false를 반환합니다.
            return false;
        }
        
    
        if (window.opener.document.getElementById("departure").value === window.opener.document.getElementById("destination").value) {
            alert('출발지와 도착지가 같습니다!');
            window.opener.document.getElementById(inputId).value = "";
            document.getElementById("searchbox").focus();
            return;
        }
    
        if (!compareStationNameWithSearchBoxValue(stationClassParam)) {
            alert('입력값이 일치하지 않습니다');
            window.opener.document.getElementById(inputId).value = "";
            document.getElementById("searchbox").focus();
            return;
        }
    
        // 팝업 창을 닫습니다.
        else{
            //window.opener.setTrainticketAndUpdate(stationName, inputId);
            console.log(`Calling setTrainticketAndUpdate with ${stationName}, ${inputId}`);
        window.close();
        }
    };
    
    


   

    
    


    return (
        <div>
            <div>
            {stationClassParam === '3'&&  <h2>기차역 정보</h2>}
            {stationClassParam === '5'&&  <h2>비행기 정보</h2>} 
            </div>
            <div>
                <input type="text" value={searchTerm} id="searchbox" onChange={handleInputChange} />
                <button className="button" type="button" onClick={() => confirm(searchTerm)}>확인</button>
                <button className="button" type="button" onClick={windowclose}>나가기</button>
            </div>
            <div>
                {/* URL의 값에 따라 출발지 선택 또는 도착지 선택을 렌더링합니다. */}
                {urlParams.has('departure')&& <h2>출발지 지역 선택</h2>}
                {urlParams.has('destination')&& <h2>도착지 지역 선택</h2>}
            </div>
            <div>
              
                {/* 한글 자음 버튼들을 출력합니다. */}
                {KoreanArrays.map((region, i) => (
                     <button key={i} className="button" onClick={() => handleRegionClick(region)}>{region}</button>
                ))}
            </div>
            <div className='train-station-list'>
                <ul>
                    {/* sortedData에 따라 기차역 정보를 출력합니다. */}
                    {sortedData.map(station => (
                        <li key={station.stationID} onClick={() => handleStationClick(station.stationName,station.stationID)}>
                          <button type="button"> <a href ={"#"}>{station.stationName}</a></button> 
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchTrainStation;

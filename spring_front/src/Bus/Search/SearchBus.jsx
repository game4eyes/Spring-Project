import React, { useEffect, useState } from 'react';
import { getCityInfo } from "@/api/dataApi.jsx";
import CityName from "@/Bus/Search/list/CityName.jsx";
import BusClass from "@/Bus/Search/list/BusClass.jsx";
import StartStationList from "@/Bus/Search/list/StartStationList.jsx";
import EndStationList from "@/Bus/Search/list/EndStationList.jsx";

export const Region = [
    "서울", "경기도", "인천", "강원도", "대전", "충청남도", "충청북도", "광주",
    "전라북도", "전라남도", "대구", "울산", "부산", "경상북도", "경상남도", "제주도"
];


const SearchBus = () => {
    const [allSelected, setAllSelected] = useState("");
    const [cityInfo, setCityInfo] = useState(null);
    const [region, setRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedBusClass, setSelectedBusClass] = useState(null);
    const [result, setResult] = useState(null);
    const [startStationID, setStartStationID] = useState()
    const [endStationList, setEndStationList] = useState()
    const [endStationID, setEndStationID] = useState()

    useEffect(() => {
        setAllSelected(region+cityInfo+selectedCity+selectedBusClass+result+startStationID+endStationList+endStationID)
    }, [cityInfo, region, selectedCity, selectedBusClass, result,startStationID,endStationList,endStationID]);


    // region에 저장하기 위한 메서드
    const handleGetCityInfo = (cityRegion) => {
        setRegion(cityRegion);
    };
    // 상세 지역 정보를 가지고 오기 위한 훅
    useEffect(() => {
        const fetchCityInfo = async () => {
            if (region) {
                const data = await getCityInfo(region);
                setCityInfo(data[0]);
            }
        };
        fetchCityInfo();
    }, [region]);
    // 도시 코드 저장
    const handleCityCode = (code) => {
        setSelectedCity(code);
    }
    // 버스 종류 저장
    const handleBusClass = (code) => {
        setSelectedBusClass(code);
    }
    // 검색 결과를 부모에 저장 하기
    const handleSearchResult = (result) => {
        setResult(result)
        console.log(result)
    }
    // 시작
    const handleStartStationID = (id, list) => {
        setStartStationID(id)
        setEndStationList(list)
    }
    // 끝
    const handleEndStationID = (id) => {
        setEndStationID(id)
    }

    return (
        <div>
            <p>{allSelected}</p>
            {Region.map((region, index) => (
                <button key={index} onClick={() => handleGetCityInfo(region)}>
                    {region}
                </button>
            ))}
            {/* 도시정보가 있고 그 안의 내용이 있고 선택된 도시가 없으면 */}
            {cityInfo && cityInfo.cityInfoDTO && !selectedCity && (
                <>
                    <h1>{region}의 상세 도시</h1>
                    <div>
                        {cityInfo.cityInfoDTO.map((city) => (
                            <CityName key={city.cityCode} city={city} onChangeCityCode={handleCityCode} />
                        ))}
                    </div>
                </>
            )}
            {/* 선택된 도시가 있고 션택된 버스 종류가 없을때 다음 컴포넌트를 실행 */}
            {selectedCity && !selectedBusClass &&
                <>
                    <h1>버스 종류를 선택하세요</h1>
                    <BusClass onStationClassChange={handleBusClass}/>
                </>
            }
            {selectedCity && selectedBusClass && !startStationID &&
                <StartStationList cityCode={selectedCity} busClass={selectedBusClass}
                                  onChangeResult={handleSearchResult}
                                  onChangeStartId={handleStartStationID}
                />
            }
            {startStationID && !endStationID &&
                <EndStationList endStationList={endStationList}
                                onChangeEndId={handleEndStationID}
                />
            }
            {startStationID && endStationID &&
                (
                    <div>
                    <button>확인</button>
                    </div>
                )
            }


        </div>
    );
};

export default SearchBus;

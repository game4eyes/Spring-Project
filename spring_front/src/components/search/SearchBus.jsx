import React, { useState } from 'react';

const SearchBus = ({ departure, destination, onSearchResult }) => {
    const [result, setResult] = useState('');
    const [selectedTerminal, setSelectedTerminal] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchResult = `출발지: ${departure}, 도착지: ${destination}`;
        setResult(searchResult);
        onSearchResult(searchResult);
    };

    const handleClose = () => {
        setResult('');
        window.close();
    };

    const handleDepartureChange = (e) => {
        setDeparture(e.target.value);
        setResult('');
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        setResult('');
    };

    const changeDepartureDestination = (e) => {
        e.preventDefault();
        const temp = departure;
        departure(destination);
        destination(temp);
    };

    const handleToggleName = (name) => {
        if (selectedTerminal === name) {
            setSelectedTerminal('');
        } else {
            setSelectedTerminal(name);
            setSelectedCity('');
        }
    };

    const handleToggleCity = (citycode) => {
        if (selectedCity === citycode) {
            setSelectedCity('');
        } else {
            setSelectedCity(citycode);
        }
    };

    const handleSubterminalClick = (subterminal, citycode) => {
        setSearchTerm(subterminal);
        setSelectedCity(citycode);
        setDeparture('subterminal');
      //  setDestination('');
    };

    const handleSubterminalClick2 = (subterminal, citycode) => {
        setSearchTerm2(subterminal);
        setSelectedCity(citycode);
      //  setDeparture('');
        setDestination('subterminal');
    };


    const terminals = [
        {
            name: '서울',
            cities: [
                {
                    citycode: 'SEO1',
                    subterminals: [
                        '서울 익스프레스 터미널',
                        '서울 버스 터미널'
                    ]
                },
                {
                    citycode: 'SEO2',
                    subterminals: [
                        '서울 기차역',
                        '김포 국제공항'
                    ]
                },
                {
                    citycode: 'SEO3',
                    subterminals: [
                        '서울 항구 터미널',
                        '서울 항만'
                    ]
                }
            ]
        },
        {
            name: '인천',
            cities: [
                {
                    citycode: 'INC1',
                    subterminals: [
                        '인천 국제공항 터미널',
                        '항구 터미널'
                    ]
                },
                {
                    citycode: 'INC2',
                    subterminals: [
                        '시외버스 터미널',
                        '인천 지하철역'
                    ]
                }
            ]
        },
        {
            name: '대구',
            cities: [
                {
                    citycode: 'DGU1',
                    subterminals: [
                        '대구 공항 터미널',
                        '대구 시외버스 터미널'
                    ]
                },
                {
                    citycode: 'DGU2',
                    subterminals: [
                        '대구 중앙역',
                        '대구 항구 터미널'
                    ]
                }
            ]
        },
        {
            name: '부산',
            cities: [
                {
                    citycode: 'BSN1',
                    subterminals: [
                        '부산 국제여객터미널',
                        '부산 시외버스 터미널'
                    ]
                },
                {
                    citycode: 'BSN2',
                    subterminals: [
                        '부산 역',
                        '김해 국제공항'
                    ]
                }
            ]
        },
        {
            name: '광주',
            cities: [
                {
                    citycode: 'KWJ1',
                    subterminals: [
                        '광주 항구 터미널',
                        '광주 중앙 터미널'
                    ]
                },
                {
                    citycode: 'KWJ2',
                    subterminals: [
                        '광주 공항'
                    ]
                }
            ]
        }
        // Add more objects for other cities as needed
    ];

       const saveSearchBusForm =() =>{
        opener.document.getElementById("start").value = document.getElementById("departure").value ;
        opener.document.getElementById("finish").value = document.getElementById("destination").value;
      
        if(opener.document.getElementById("start").value ==="" || opener.document.getElementById("finish").value===""){
            alert('출발지와 도착지를 입력해주세요!');
            if(document.getElementById("departure").value===""){
            document.getElementById("departure").focus();
            }
            if(document.getElementById("destination").value===""){
                document.getElementById("destination").focus();
                }
            return;
        }
      }
    const filteredTerminals = terminals.filter((terminal) => {
        return terminal.cities.some((city) => {
            return city.subterminals.some((subterminal) => {
                return subterminal.toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
    });

    const filteredTerminalsDestination = terminals.filter((terminal) => {
        return terminal.cities.some((city) => {
            return city.subterminals.some((subterminal) => {
                return subterminal.toLowerCase().includes(searchTerm2.toLowerCase());
            });
        });
    });

    return (
        <div className="searchdeparture">
            <h2>출발지 도착지 검색</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        출발 터미널:
                        <input
                            type="text"
                            // value={departure}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="출발지를 검색하세요"
                            id="departure"
                        />
                    </label>
                </div>
                <div>
                    <div>
                        <label>
                            도착 터미널:
                            <input
                                type="text"
                                value={searchTerm2}
                                onChange={(e) => setSearchTerm2(e.target.value)}
                                placeholder="도착지를 검색하세요"
                                id="destination"
                            />
                        </label>
                    </div>
                    <button onClick={changeDepartureDestination}>출발지 ↔ 도착지</button>
                    <button type="submit" onClick={saveSearchBusForm}>폼 제출</button>
                    <button onClick={handleClose}>나가기</button>
                </div>
            </form>

            {result && <div><p>{result}</p></div>}

            <div>
                <div className='startTerminal'>
                    <h2>출발지 터미널 리스트</h2>
                    {filteredTerminals.map((terminal, index) => (
                        <div key={index}>
                            <h3 onClick={() => handleToggleName(terminal.name)}>
                                <a href="#">{terminal.name}</a>
                            </h3>
                            {selectedTerminal === terminal.name && (
                                <ul>
                                    {terminal.cities.map((city, cityIndex) => (
                                        <li key={cityIndex}>
                                            <h4 onClick={() => handleToggleCity(city.citycode)}>
                                                <a href="#">{city.citycode}</a>
                                            </h4>
                                            {selectedCity === city.citycode && (
                                                <ul>
                                                    {city.subterminals.map((subterminal, subIndex) => (
                                                        <li key={subIndex}>
                                                            <span onClick={() => handleSubterminalClick(subterminal, city.citycode)}>
                                                                <a href="#" >{subterminal}</a>
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className='destinationTerminal'>
                    <h2>도착지 터미널 리스트</h2>
                    {filteredTerminalsDestination.map((terminal, index) => (
                        <div key={index}>
                            <h3 onClick={() => handleToggleName(terminal.name)}>
                                <a href="#">{terminal.name}</a>
                            </h3>
                            {selectedTerminal === terminal.name && (
                                <ul>
                                    {terminal.cities.map((city, cityIndex) => (
                                        <li key={cityIndex}>
                                            <h4 onClick={() => handleToggleCity(city.citycode)}>
                                                <a href="#">{city.citycode}</a>
                                            </h4>
                                            {selectedCity === city.citycode && (
                                                <ul>
                                                    {city.subterminals.map((subterminal, subIndex) => (
                                                        <li key={subIndex}>
                                                            <span onClick={() => handleSubterminalClick2(subterminal, city.citycode)}>
                                                                <a href="#" >{subterminal}</a>
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchBus;

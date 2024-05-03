import React, { useState } from 'react';

const SearchBus = () => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [result, setResult] = useState('');
    const [selectedTerminal, setSelectedTerminal] = useState('');
    const [busType, setBusType] = useState('');

    const handleDepartureChange = (e) => {
        setDeparture(e.target.value);
        setResult('');
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        setResult('');
    };

    const handleBusTypeChange = (e) => {
        setBusType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setResult(`출발지: ${departure}, 도착지: ${destination}, 버스 유형: ${busType}`);
    };

    const handleClose = () => {
        setDeparture('');
        setDestination('');
        setResult('');
        setBusType('');
    };

    const handleToggleTerminal = (terminalName) => {
        if (selectedTerminal === terminalName) {
            setSelectedTerminal('');
        } else {
            setSelectedTerminal(terminalName);
        }
    };

    const terminals = [
        {
            name: '서울',
            subterminals: [
                '서울 익스프레스 터미널',
                '서울 버스 터미널',
                '서울 기차역',
                '김포 국제공항',
                '서울 항구 터미널',
                '서울 항만'
            ]
        },
        {
            name: '인천',
            subterminals: [
                '인천 국제공항 터미널',
                '항구 터미널',
                '시외버스 터미널',
                '인천 지하철역',
                '기차역'
            ]
        },
        // 다른 지역의 터미널 정보 추가
    ];

    const filteredTerminals_departure = terminals.filter((terminal) => {
        return terminal.subterminals.some((subterminal) => subterminal.includes(departure));
    });

    const filteredTerminals_destination = terminals.filter((terminal) => {
        return terminal.subterminals.some((subterminal) => subterminal.includes(destination));
    });

    return (
        <div>
            <h2>출발지 도착지 검색</h2>
            <div>
                <label>
                    버스 유형:
                    <select value={busType} onChange={handleBusTypeChange}>
                        <option value="">유형 선택</option>
                        <option value="고속">고속</option>
                        <option value="시외">시외</option>
                    </select>
                </label>
            </div>
            {(busType !== '' && busType !== '유형 선택') && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            출발 터미널:
                            <input
                                type="text"
                                value={departure}
                                onChange={handleDepartureChange}
                                placeholder="출발지를 검색하세요"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            도착 터미널:
                            <input
                                type="text"
                                value={destination}
                                onChange={handleDestinationChange}
                                placeholder="도착지를 검색하세요"
                            />
                        </label>
                    </div>
                    <button type="submit">폼 제출</button>
                    <button onClick={handleClose}>나가기</button>
                </form>
            )}
            {result && (
                <div>
                    <p>{result}</p>
                </div>
            )}
            {(busType !== '' && busType !== '유형 선택') && (
                <div>
                    <h2>한국 터미널 리스트</h2>
                    {filteredTerminals_departure.map((terminal, index) => (
                        <div key={index}>
                            <h3 onClick={() => handleToggleTerminal(terminal.name)}>{terminal.name}</h3>
                            {selectedTerminal === terminal.name && (
                                <ul>
                                    {terminal.subterminals
                                        .filter((subterminal) => subterminal.includes(departure))
                                        .map((filteredSubterminal_departure, subIndex) => (
                                            <li key={subIndex}>{filteredSubterminal_departure}</li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    ))}
                    <div>
                        <h2>도착지 터미널 리스트</h2>
                        {filteredTerminals_destination.map((terminal, index) => (
                            <div key={index}>
                                <h3 onClick={() => handleToggleTerminal(terminal.name)}>{terminal.name}</h3>
                                {selectedTerminal === terminal.name && (
                                    <ul>
                                        {terminal.subterminals
                                            .filter((subterminal) => subterminal.includes(destination))
                                            .map((filteredSubterminal_destination, subIndex) => (
                                                <li key={subIndex}>{filteredSubterminal_destination}</li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBus;

import React, { useState } from 'react';

const SearchBus = ({ onSearchResult }) => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [busType, setBusType] = useState('');
    const [result, setResult] = useState('');
    const [selectedTerminal, setSelectedTerminal] = useState('');

    const handleDepartureChange = (e) => {
        setDeparture(e.target.value);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchResult = `출발지: ${departure}, 도착지: ${destination}`;
        setResult(searchResult);
        onSearchResult(searchResult);
    };

    const handleToggleTerminal = (name) => {
        setSelectedTerminal(name);
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
        // Add more objects for other cities as needed
    ];

    const filteredTerminals_departure = terminals.filter(terminal =>
        terminal.subterminals.some(subterminal => subterminal.includes(departure))
    );

    const filteredTerminals_destination = terminals.filter(terminal =>
        terminal.subterminals.some(subterminal => subterminal.includes(destination))
    );

    return (
        <div>
            <h2>출발지 도착지 검색</h2>
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
                    <h2>한국 터미널 리스트</h2>
                    {filteredTerminals_departure.map((terminal, index) => (
                        <div key={index}>
                            <h3 onClick={() => handleToggleTerminal(terminal.name)}>{terminal.name}</h3>
                            <ul>
                                {terminal.subterminals.map((subterminal, subIndex) => (
                                    <li key={subIndex}>
                                        <a href="#" onClick={() => setDeparture(subterminal)}>
                                            {subterminal}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>도착지 터미널 리스트</h2>
                    {filteredTerminals_destination.map((terminal, index) => (
                        <div key={index}>
                            <h3 onClick={() => handleToggleTerminal(terminal.name)}>{terminal.name}</h3>
                            <ul>
                                {terminal.subterminals.map((subterminal, subIndex) => (
                                    <li key={subIndex}>
                                        <a href="#" onClick={() => setDestination(subterminal)}>
                                            {subterminal}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default SearchBus;

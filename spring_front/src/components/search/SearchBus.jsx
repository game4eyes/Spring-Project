import React, { useState } from 'react';

const SearchBus = ({ onSearchResult }) => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');

    const [busType, setBusType] = useState('');
    const [busType, setBusType] = useState('');

    const [result, setResult] = useState('');
    const [selectedTerminal, setSelectedTerminal] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleDepartureChange = (e) => {
        setDeparture(e.target.value);
        setResult('');
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        setResult('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchResult = `출발지: ${departure}, 도착지: ${destination}`;
        setResult(searchResult);

        onSearchResult(searchResult); // 검색 결과를 부모 컴포넌트에 전달
        onSearchResult(searchResult); // 검색 결과를 부모 컴포넌트에 전달

    };

    const handleClose = () => {
        setDeparture('');
        setDestination('');
        setResult('');

        setBusType('');
        setBusType('');
ges
        window.close();
    };

    const changeDepartureDestination = (e) => {
        e.preventDefault();
        const temp = departure;
        setDeparture(destination);
        setDestination(temp);
    };

    const handleToggleName = (name) => {
        setSelectedTerminal(name);
        setSelectedCity('');
    };

    const handleToggleCity = (citycode) => {
        setSelectedCity(citycode);
    };

    const handleSubterminalClick = (subterminal) => {
        setDeparture(subterminal);
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
            subterminals: [
                '인천 국제공항 터미널',
                '항구 터미널',
                '시외버스 터미널',
                '인천 지하철역',
                '기차역'

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
    


    const filteredTerminals_departure = terminals.filter((terminal) => {
        return terminal.subterminals.some((subterminal) => subterminal.includes(departure));
    });
        // 다른 지역의 터미널 정보 추가
    ];

    const filteredTerminals_departure = terminals.filter((terminal) => {
        return terminal.subterminals.some((subterminal) => subterminal.includes(departure));
    });

    const filteredTerminals_destination = terminals.filter((terminal) => {
        return terminal.subterminals.some((subterminal) => subterminal.includes(destination));
    });
    const filteredTerminals_destination = terminals.filter((terminal) => {
        return terminal.subterminals.some((subterminal) => subterminal.includes(destination));
    });

    return (
        <div>
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

                    <div className='startTerminal'>
                    <h2>한국 터미널 리스트</h2>
                    {filteredTerminals_departure.map((terminal, index) => (
                    {filteredTerminals_departure.map((terminal, index) => (
                        <div key={index}>
                            <h3 onClick={() => handleToggleTerminal(terminal.name)}>{terminal.name}</h3>
                            <ul className={selectedTerminal === terminal.name ? "hidden" : "show"}>
                                {terminal.subterminals
                                    .filter((subterminal) => subterminal.includes(departure))
                                    .map((filteredSubterminal_departure, subIndex) => (
                                        <li key={subIndex}>
                                           <a href="#" onClick={() => { 
    setDeparture(filteredSubterminal_departure);
    // Assuming "opener" is accessible here, set the value in the parent window
   // opener.document.getElementById("start").value = filteredSubterminal_departure;
}}>
    {filteredSubterminal_departure}
</a>

                                           
                            <h3 onClick={() => handleToggleTerminal(terminal.name)}>{terminal.name}</h3>
                            <ul className={selectedTerminal === terminal.name ? "hidden" : "show"}>
                                {terminal.subterminals
                                    .filter((subterminal) => subterminal.includes(departure))
                                    .map((filteredSubterminal_departure, subIndex) => (
                                        <li key={subIndex}>
                                           <a href="#" onClick={() => { 
    setDeparture(filteredSubterminal_departure);
    // Assuming "opener" is accessible here, set the value in the parent window
   // opener.document.getElementById("start").value = filteredSubterminal_departure;
}}>
    {filteredSubterminal_departure}
</a>

                                           
                                        </li>
                                      
                                      
                                    ))}
                            </ul>
                            </ul>
                        </div>
                    ))}
                    </div>
                    <br/> <br/>
                    <div>
                    <div className='EndTerminal'>
                        <h2>도착지 터미널 리스트</h2>
                        {filteredTerminals_destination.map((terminal, index) => (
                            <div key={index}>
                                <h3 onClick={() => handleToggleTerminal(terminal.name)}>{terminal.name}</h3>
                                {selectedTerminal === terminal.name && (
                                    <ul>
                                        {terminal.subterminals
                                            .filter((subterminal) => subterminal.includes(destination))
                                            .map((filteredSubterminal_destination, subIndex) => (
                                                <li key={subIndex}>
                                                <a href="#" onClick={() => { 
            setDestination(filteredSubterminal_destination);
          // Assuming "opener" is accessible here, set the value in the parent window
      //   opener.document.getElementById("finish").value = filteredSubterminal_destination;
     }}>
         {filteredSubterminal_destination}
     </a>
     
                                                
                                             </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                    </div>
                    </div>
                    <br/> <br/>
                    <div>
                    <div className='EndTerminal'>
                        <h2>도착지 터미널 리스트</h2>
                        {filteredTerminals_destination.map((terminal, index) => (
                            <div key={index}>
                                <h3 onClick={() => handleToggleTerminal(terminal.name)}>{terminal.name}</h3>
                                {selectedTerminal === terminal.name && (
                                    <ul>
                                        {terminal.subterminals
                                            .filter((subterminal) => subterminal.includes(destination))
                                            .map((filteredSubterminal_destination, subIndex) => (
                                                <li key={subIndex}>
                                                <a href="#" onClick={() => { 
            setDestination(filteredSubterminal_destination);
          // Assuming "opener" is accessible here, set the value in the parent window
      //   opener.document.getElementById("finish").value = filteredSubterminal_destination;
     }}>
         {filteredSubterminal_destination}
     </a>
     
                                                
                                             </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            )}
            )}

        </div>
    );
};

export default SearchBus;

import React, { useState } from 'react';

const SearchBus = ({ onSearchResult }) => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [busType, setBusType] = useState('');
    const [busType, setBusType] = useState('');
    const [result, setResult] = useState('');
    const [selectedTerminal, setSelectedTerminal] = useState('');

    const handleDepartureChange = (e) => {
        setDeparture(e.target.value);
        setResult('');
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        setResult('');
    };

    const handleBusTypeChange = (e) => {
<<<<<<< HEAD
<<<<<<< HEAD
        setBusType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchResult = `출발지: ${departure}, 도착지: ${destination}, 버스 유형: ${busType}`;
=======
        const selectedValue = e.target.value;
        setBusType(selectedValue);
        
        // Redirect based on bus type
        // if (selectedValue === '고속') { 
        //     setBusType('고속');
        //     window.location.href = 'http://localhost:5173/search/searchbus/express';
           
        // } else if (selectedValue === '시외') {
        //     setBusType('시외');
        //     window.location.href = 'http://localhost:5173/search/searchbus/intercity';
            
        // } else if (selectedValue === '유형 선택') {
        //     window.location.href = 'http://localhost:5173/search/searchbus';
        //     setBusType('유형 선택');
        // }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // const searchResult = `출발지: ${departure}, 도착지: ${destination}, 버스 유형: ${busType}`;
>>>>>>> parent of 87bf299 (05.06 ver)
=======
        const selectedValue = e.target.value;
        setBusType(selectedValue);
        
        // Redirect based on bus type
        // if (selectedValue === '고속') { 
        //     setBusType('고속');
        //     window.location.href = 'http://localhost:5173/search/searchbus/express';
           
        // } else if (selectedValue === '시외') {
        //     setBusType('시외');
        //     window.location.href = 'http://localhost:5173/search/searchbus/intercity';
            
        // } else if (selectedValue === '유형 선택') {
        //     window.location.href = 'http://localhost:5173/search/searchbus';
        //     setBusType('유형 선택');
        // }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // const searchResult = `출발지: ${departure}, 도착지: ${destination}, 버스 유형: ${busType}`;
>>>>>>> parent of 87bf299 (05.06 ver)
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
        window.close();
    };

    const saveSearchBusForm =() =>{
        opener.document.getElementById("start").value = document.getElementById("departure").value ;
        opener.document.getElementById("finish").value = document.getElementById("destination").value;
<<<<<<< HEAD
<<<<<<< HEAD

        if(opener.document.getElementById("start").value ===opener.document.getElementById("finish").value){
            alert('출발지와 도착지가 같습니다!')
            document.getElementById("destination").focus();
            return;
        }
       
        window.close();

     
    }
=======
=======
>>>>>>> parent of 87bf299 (05.06 ver)
      
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

        else if(opener.document.getElementById("start").value ===opener.document.getElementById("finish").value){
            alert('출발지와 도착지가 같습니다!')
            document.getElementById("destination").focus();
            return;
        }
       
        window.close();

     
    }


    const change_Departure_Destination = (e) => {
      let tmp ="";
        tmp = document.getElementById("departure").value;
        document.getElementById("departure").value = document.getElementById("destination").value;
        document.getElementById("destination").value= tmp ;
        handleSubmit(e);
        if(document.getElementById("destination").value  ==="" ||document.getElementById("departure").value  ==="" ){
            alert('출발지와 도착지를 입력해주세요!')
            document.getElementById("destination").focus();
            return;
        }

    };


<<<<<<< HEAD
>>>>>>> parent of 87bf299 (05.06 ver)
=======
>>>>>>> parent of 87bf299 (05.06 ver)

    const handleToggleTerminal = (terminalName) => {
        if (selectedTerminal === terminalName) {
            setSelectedTerminal('');
        } else {
            setSelectedTerminal(terminalName);
            // 하위 터미널 클릭시 해당 터미널 이름으로 출발지나 도착지 설정
            if (departure === '') {
                setDeparture(terminalName);
            } else if (destination === '') {
                setDestination(terminalName);
            }
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
        // 다른 지역의 터미널 정보 추가
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
                                id = "departure"
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
                                id = "destination"
                            />
                        </label>
                    </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
                    <button onClick={change_Departure_Destination}>출발지 ↔ 도착지</button>
>>>>>>> parent of 87bf299 (05.06 ver)
=======
                    <button onClick={change_Departure_Destination}>출발지 ↔ 도착지</button>
>>>>>>> parent of 87bf299 (05.06 ver)
                    <button type="submit" onClick={saveSearchBusForm}>폼 제출</button>
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







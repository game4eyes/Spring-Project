import React, {useEffect, useState} from 'react';
import {getBusTerminalList} from "@/api/dataApi.jsx";

const StartStationList = ({busClass,cityCode, onChangeResult, onChangeStartId}) => {
    const [result, setResult] = useState("");
    useEffect(() => {
        getBusTerminalList(busClass, cityCode).then(data =>{
            onChangeResult(data);
            console.log(data)
            setResult(data)
        })

    }, [busClass, cityCode]);
    if(!result) {
        return <h1>검색중입니다.</h1>
    } else {
        return (
            <>
                {result.map((data)=> (
                    <p onClick={() => (onChangeStartId(data.stationID,data.destinationTerminals,data.stationName))}>
                        {data.stationName}</p>
                ))}
            </>
        )
    }

};

export default StartStationList;

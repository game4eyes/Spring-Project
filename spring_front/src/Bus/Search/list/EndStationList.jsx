import React, {useEffect} from 'react';

const EndStationList = ({endStationList,onChangeEndId}) => {
    useEffect(() => {
        console.log("마운트 됨")
        console.log(endStationList)
    }, []);

    return (
        <>
        {
            endStationList.map((info)=> (
                <p onClick={()=>onChangeEndId(info.stationID)}>{info.stationName}</p>
            ))
        }
        </>
    );
};

export default EndStationList;

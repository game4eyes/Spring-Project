import React from 'react';

const BusClass = ({onStationClassChange}) => {
    return (
        <>
            <p onClick={() => { onStationClassChange(4) }}>고속버스</p>
            <p onClick={() => { onStationClassChange(6) }}>시외버스</p>
        </>
    );
};

export default BusClass;

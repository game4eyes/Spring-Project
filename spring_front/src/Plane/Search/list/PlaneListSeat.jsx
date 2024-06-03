import React, {useEffect, useState} from 'react';
import {getSeatAvailability} from "@/api/dataApi.jsx";

const PlaneListSeat = ({Id,Date}) => {
    const [seat, setSeat] = useState({})
    useEffect(() => {
        const seatDate = getSeatAvailability(Id,Date)
            .then((data) => {
                console.log(data)
                setSeat(data)
            });
    }, []);
    return (
        <label>
            비즈니스 : {seat.airBusiness} <br></br>
            이코노미 : {seat.airEconomy}    <br></br>
            퍼스트 : {seat.airFirst}    <br></br>
        </label>
    );
};

export default PlaneListSeat;

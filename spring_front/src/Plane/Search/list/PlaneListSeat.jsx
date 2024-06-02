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
            비즈니스 : {seat.airBusiness}
            이코노미 : {seat.airEconomy}
            퍼스트 : {seat.airFirst}
        </label>
    );
};

export default PlaneListSeat;

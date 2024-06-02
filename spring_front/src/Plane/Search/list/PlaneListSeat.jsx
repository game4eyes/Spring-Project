import React, {useEffect, useState} from 'react';
import {getSeatAvailability} from "@/api/dataApi.jsx";

const TrainListSeat = ({Id,Date}) => {
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
            비즈니스 : {seat.trainStandingFreeSeating}
            이코노미 : {seat.trainGeneral}
            퍼스트 : {seat.trainSpecial}
        </label>
    );
};

export default TrainListSeat;

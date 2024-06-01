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
            입석(자유석) : {seat.trainStandingFreeSeating}
            일반 : {seat.trainGeneral}
            특석 : {seat.trainSpecial}
        </label>
    );
};

export default TrainListSeat;

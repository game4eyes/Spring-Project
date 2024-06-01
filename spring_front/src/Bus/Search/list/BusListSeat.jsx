import React, {useEffect, useState} from 'react';
import {getSeatAvailability} from "@/api/dataApi.jsx";

const BusListSeat = ({id,date}) => {
    const [seat, setSeat] = useState();
    useEffect(() => {
        const seatData = getSeatAvailability(id,date)
            .then((data) => {
                setSeat(data.busSeat)
            } );

    }, []);
    return (
        <td>
            40/{seat}
        </td>
    );
};

export default BusListSeat;

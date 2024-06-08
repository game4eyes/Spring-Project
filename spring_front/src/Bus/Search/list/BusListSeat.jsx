import React, {useEffect, useState} from 'react';
import {getSeatAvailability} from "@/api/dataApi.jsx";

const BusListSeat = ({ id, date, onSeatChange }) => {
    const [seat, setSeat] = useState(null);

    useEffect(() => {
        const fetchSeatData = async () => {
            try {
                const data = await getSeatAvailability(id, date);
                setSeat(data.busSeat);
                localStorage.setItem(`busSeatData_${id}`, JSON.stringify(data.busSeat)); // Save to local storage
                if (onSeatChange) {
                    onSeatChange(id, data.busSeat);
                }
            } catch (error) {
                console.error('Error fetching seat availability:', error);
            }
        };

        fetchSeatData();
    }, [id, date, onSeatChange]);

    return (
        <td>
            {seat !== null ? `${seat}/40` : 'Loading...'}
        </td>
    );
};

export default BusListSeat;



// import React, {useEffect, useState} from 'react';
// import {getSeatAvailability} from "@/api/dataApi.jsx";

// const BusListSeat = ({id,date}) => {
//     const [seat, setSeat] = useState();
//     useEffect(() => {
//         const seatData = getSeatAvailability(id,date)
//             .then((data) => {
//                 setSeat(data.busSeat)
//             } );

//     }, []);

//     return (
//         <td>
//             {seat}/40
//         </td>
//     );
// };

// export default BusListSeat;

import React, {useEffect, useState} from 'react';
import {getSeatAvailability} from "@/api/dataApi.jsx";

const PlaneListSeat = ({Id, Date, selectedPlaneSeats, selectedPlane, handleCheckboxChange, planePrices}) => {
    const [seat, setSeat] = useState({});

    useEffect(() => {
        getSeatAvailability(Id, Date)
            .then((data) => {
                setSeat(data);
                // 로컬 스토리지 보관
                localStorage.setItem(`planeseatData_${Id}`, JSON.stringify(data));
            });
    }, [Id, Date]);


    // const [planePrices, setPlanePrices] = useState({
    //     business: 60000,
    //     economy: 70000,
    //     first: 80000
    // });


    return (
        <>
            <td>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedPlaneSeats[selectedPlane.id]?.seatType === 'business'}
                        onChange={() => handleCheckboxChange(selectedPlane.id, 'business')}
                        disabled={seat.airBusiness === 0}
                    />
                        비지니스 ({planePrices['business'] ? planePrices['business'] : 'N/A'})
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedPlaneSeats[selectedPlane.id]?.seatType === 'economy'}
                        onChange={() => handleCheckboxChange(selectedPlane.id, 'economy')}
                        disabled={seat.airEconomy === 0}
                    />
                  
                이코노미 ({planePrices['economy'] ? planePrices['economy'] : 'N/A'})
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedPlaneSeats[selectedPlane.id]?.seatType === 'first'}
                        onChange={() => handleCheckboxChange(selectedPlane.id, 'first')}
                        disabled={seat.airFirst === 0}
                    />
                    퍼스트 ({planePrices['first'] ? planePrices['first'] : 'N/A'})
                </label>
            </td>
            <td>
                <label>
                    비지니스 : {seat.airBusiness}
                </label>
                <label>
                    이코노미 : {seat.airEconomy}
                </label>
                <label>
                    퍼스트 : {seat.airFirst}
                </label>
            </td>
        </>
    );
};

export default PlaneListSeat;













// import React, {useEffect, useState} from 'react';
// import {getSeatAvailability} from "@/api/dataApi.jsx";

// const PlaneListSeat = ({Id,Date}) => {
//     const [seat, setSeat] = useState({})
//     useEffect(() => {
//         const seatDate = getSeatAvailability(Id,Date)
//             .then((data) => {
//                 console.log(data)
//                 setSeat(data)
//             });
//     }, []);
//     return (
//         <label>
//             비즈니스 : {seat.airBusiness} <br></br>
//             이코노미 : {seat.airEconomy}    <br></br>
//             퍼스트 : {seat.airFirst}    <br></br>
//         </label>
//     );
// };

// export default PlaneListSeat;

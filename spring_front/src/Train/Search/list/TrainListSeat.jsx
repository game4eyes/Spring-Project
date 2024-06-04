import React, {useEffect, useState} from 'react';
import {getSeatAvailability} from "@/api/dataApi.jsx";

const TrainListSeat = ({Id, Date, selectedTrainSeats, selectedTrain, handleCheckboxChange, trainPrices}) => {
    const [seat, setSeat] = useState({});

    useEffect(() => {
        getSeatAvailability(Id, Date)
            .then((data) => {
                setSeat(data);
                // Store seat data in local storage
                localStorage.setItem(`trainseatData_${Id}`, JSON.stringify(data));
            });
    }, [Id, Date]);

    return (
        <>
            <td>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedTrainSeats[selectedTrain.id]?.seatType === 'standingFreeSeating'}
                        onChange={() => handleCheckboxChange(selectedTrain.id, 'standingFreeSeating')}
                        disabled={seat.trainStandingFreeSeating === 0}
                    />
                    입석 (자유석)
                    ({trainPrices[selectedTrain.id]?.general ? Math.round(trainPrices[selectedTrain.id]?.general * 0.9) : 'N/A'})
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedTrainSeats[selectedTrain.id]?.seatType === 'general'}
                        onChange={() => handleCheckboxChange(selectedTrain.id, 'general')}
                        disabled={seat.trainGeneral === 0}
                    />
                    일반석 ({trainPrices[selectedTrain.id]?.general || 'N/A'})
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedTrainSeats[selectedTrain.id]?.seatType === 'special'}
                        onChange={() => handleCheckboxChange(selectedTrain.id, 'special')}
                        disabled={seat.trainSpecial === 0}
                    />
                    특석 ({trainPrices[selectedTrain.id]?.special || 'N/A'})
                </label>
            </td>
            <td>
                <label>
                    입석(자유석) : {seat.trainStandingFreeSeating}
                </label>
                <label>
                    일반 : {seat.trainGeneral}
                </label>
                <label>
                    특석 : {seat.trainSpecial}
                </label>
            </td>
        </>
    );
};

export default TrainListSeat;

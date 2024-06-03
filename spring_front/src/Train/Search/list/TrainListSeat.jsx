import React, { useEffect, useState } from 'react';
import { getSeatAvailability } from "@/api/dataApi.jsx";

const TrainListSeat = ({ Id, Date, onSoldOutChange }) => {
    const [seat, setSeat] = useState({});
    const [soldout, setSoldout] = useState(false); // 매진 상태

    useEffect(() => {
        const fetchSeatData = async () => {
            try {
                const data = await getSeatAvailability(Id, Date);
                setSeat(data);

                // Determine if all seats are sold out
                const isSoldOut = data.trainStandingFreeSeating === 0 && data.trainGeneral === 0 && data.trainSpecial === 0;
                setSoldout(isSoldOut);

                // Send the soldout status to the parent component
                onSoldOutChange(isSoldOut);
            } catch (error) {
                console.error('Error fetching seat availability:', error);
            }
        };

        fetchSeatData();
    }, [Id, Date, onSoldOutChange]);

    return (
        <div>
            <label>
                입석(자유석): {seat.trainStandingFreeSeating || 0}
                <br />
                일반: {seat.trainGeneral || 0}
                <br />
                특석: {seat.trainSpecial || 0}
                <br />
                {soldout && <span style={{ color: 'red' }}>매진</span>}
            </label>
        </div>
    );
};

export default TrainListSeat;

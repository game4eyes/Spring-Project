import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
    // 상태 관리
    const [bookingData, setBookingData] = useState({
        email: '',
        startStationId: null,
        endStationId: null,
        startStationName: '',
        endStationName: '',
        stationClass: null,
        operator: '',
        grade: '',
        seatNum: null,
        busSeatNum: [],
        date: '',
        time: '',
        amount: null
    });

    // 입력 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData({ ...bookingData, [name]: value });
    };

    // 배열 데이터 입력 핸들러 (버스 좌석 번호)
    const handleArrayChange = (index, value) => {
        const updatedBusSeats = [...bookingData.busSeatNum];
        updatedBusSeats[index] = parseInt(value);
        setBookingData({ ...bookingData, busSeatNum: updatedBusSeats });
    };

    // 예약 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/bookings', bookingData);
            alert('예약이 완료되었습니다.');
            console.log(response.data);
        } catch (error) {
            alert('예약 처리 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:
                <input type="email" name="email" value={bookingData.email} onChange={handleChange} />
            </label>
            <label>Start Station ID:
                <input type="number" name="startStationId" value={bookingData.startStationId || ''} onChange={handleChange} />
            </label>
            <label>End Station ID:
                <input type="number" name="endStationId" value={bookingData.endStationId || ''} onChange={handleChange} />
            </label>
            <label>Start Station Name:
                <input type="text" name="startStationName" value={bookingData.startStationName} onChange={handleChange} />
            </label>
            <label>End Station Name:
                <input type="text" name="endStationName" value={bookingData.endStationName} onChange={handleChange} />
            </label>
            <label>Station Class:
                <input type="number" name="stationClass" value={bookingData.stationClass || ''} onChange={handleChange} />
            </label>
            <label>Operator:
                <input type="text" name="operator" value={bookingData.operator} onChange={handleChange} />
            </label>
            <label>Grade:
                <input type="text" name="grade" value={bookingData.grade} onChange={handleChange} />
            </label>
            <label>Seat Number:
                <input type="number" name="seatNum" value={bookingData.seatNum || ''} onChange={handleChange} />
            </label>
            {/* 버스 좌석 번호 입력 */}
            {bookingData.busSeatNum.map((seat, index) => (
                <div key={index}>
                    <label>Bus Seat Number {index + 1}:
                        <input type="number" value={seat || ''} onChange={(e) => handleArrayChange(index, e.target.value)} />
                    </label>
                </div>
            ))}
            <label>Date:
                <input type="date" name="date" value={bookingData.date} onChange={handleChange} />
            </label>
            <label>Time:
                <input type="time" name="time" value={bookingData.time} onChange={handleChange} />
            </label>
            <label>Amount:
                <input type="number" name="amount" value={bookingData.amount || ''} onChange={handleChange} />
            </label>
            <button type="submit">Submit Booking</button>
        </form>
    );
};

export default BookingForm;

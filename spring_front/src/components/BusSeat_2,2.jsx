import React, { useState } from 'react';
import '@/css/BusSeat.css'; // Import CSS file

import selectedseatImage from '@components/img/BusSeat_icon/selectedseat.png';
import seatImage from '@components/img/BusSeat_icon/seat.png';

function SeatButton({ seatNumber, isSelected, onSelect }) {
  const handleClick = (e) => {
    onSelect(seatNumber);
    e.preventDefault();
  };

return (
  <button
    className='seat-button'
    onClick={handleClick}
    style={{
      margin: '5px',
      backgroundImage: isSelected ? `url(${selectedseatImage})` : `url(${seatImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
  >
    Seat {seatNumber}
  </button>
);

  
}


function BusSeat() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleToggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length >= 10) {
        alert('10개 이상 좌석을 예약할 수 없습니다');
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };
  const renderSeatButtons = () => {
    const seatButtons = [];
    for (let i = 1; i <= 48; i++) {
      seatButtons.push(
        <SeatButton
          key={i}
          seatNumber={i}
          isSelected={selectedSeats.includes(i)}
          onSelect={handleToggleSeat}
        />
      );
      // Check if i is a multiple of 4


      if (i % 4 === 0) {
        seatButtons.push(<br key={`br${i}`} />); // Add a line break after every fourth seat
      } 
      else if (i % 2 === 0) {
        seatButtons.push(<span key={`span${i}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>); // Add space between seats
      }
    }
    return seatButtons;
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
     alert(`예약 완료: ${selectedSeats.join(', ') || '선택된 좌석이 없습니다'}`);
  
  };

  return (
    <div>
        <br/>
      {/* 좌석 선택 */}
      <form onSubmit={handleSubmit}>
        <p>선택 좌석: {selectedSeats.join(', ') || 'None'}</p>
        <div>
          {renderSeatButtons()}
        </div>
        <button type="submit">선택완료</button>
      </form>
      {/* Submit button outside of the form */}
      {/* <button form="seatForm" type="submit">예약</button> */}
    </div>
  );
}

export default BusSeat;

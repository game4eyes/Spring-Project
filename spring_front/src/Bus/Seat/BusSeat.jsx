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
      AB {seatNumber}
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

  // 버스 (2,2) 완성
  const renderSeatButtons = () => {
    const seatButtons = [];
    let count = 0; // 의자를 역순으로 카운트할 때 세는 변수

    for (let i = 45; i <= 49; i++) { // 의자에 대한 변수
      seatButtons.push(
        <SeatButton
          key={i}
          seatNumber={i}
          isSelected={selectedSeats.includes(i)}
          onSelect={handleToggleSeat}
        />
      );
      if (i === 49) {
        seatButtons.push(<br key={`br${i}`} />); // Add a line break after every fourth seat
      }
    }
    for (let i = 44; i >= 1; i--) {
      count++;
      seatButtons.push(
        <SeatButton
          key={i}
          seatNumber={i}
          isSelected={selectedSeats.includes(i)}
          onSelect={handleToggleSeat}
        />
      );

      if (count % 4 === 0) {
        seatButtons.push(<br key={`br${i}`} />); // Add a line break after every fourth seat
      } else if (count % 2 === 0) {
        seatButtons.push(<span key={`span${i}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>); // Add space between seats
      }
    }

    return seatButtons;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`예약 완료: ${selectedSeats.join(', ') || '선택된 좌석이 없습니다'}`);

    // 부모 창의 seatResult 필드에 선택된 좌석 정보 설정
    if (window.opener && window.opener.document) {
      const seatResultField = window.opener.document.getElementById("seatResult");
      if (seatResultField) {
        seatResultField.value = selectedSeats.join(', ');
      }
    }

    window.close();
  };

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit}>
        <p>선택 좌석: {selectedSeats.join(', ') || 'None'}</p>
        <div>
          <h5 style={{ textAlign: "left" }}>뒤</h5>
          {renderSeatButtons()}
          <h5 style={{ textAlign: "left" }}>앞</h5>
          <h5 style={{ textAlign: "left" }}>운전자</h5>
        </div>
        <button type="submit">선택완료</button>
      </form>
    </div>
  );
}

export default BusSeat;

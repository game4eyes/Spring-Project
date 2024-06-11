// import React, { useState } from 'react';

// function SeatButton({ seatNumber, isSelected, onSelect }) {
//   const handleClick = () => {
//     onSelect(seatNumber);
//   };

//   return (
//     <button
//       onClick={handleClick}
//       style={{ backgroundColor: isSelected ? 'green' : 'gray', margin: '5px' }}
//     >
//       Seat {seatNumber}
//     </button>
//   );
// }

// function BusSeat() {
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const handleToggleSeat = (seatNumber) => {
//     if (selectedSeats.includes(seatNumber)) {
//       setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
//     } else {
//       if (selectedSeats.length >= 10) {
//         alert('10개 이상 좌석을 예약할 수 없습니다');
//       } else {
//         setSelectedSeats([...selectedSeats, seatNumber]);
//       }
//     }
//   };

//   const renderSeatButtons = () => {
//     const seatButtons = [];
//     for (let i = 1; i <= 50; i++) {
//       seatButtons.push(
//         <SeatButton
//           key={i}
//           seatNumber={i}
//           isSelected={selectedSeats.includes(i)}
//           onSelect={handleToggleSeat}
//         />
//       );
//     }
//     return seatButtons;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//      alert(`예약 완료: ${selectedSeats.join(', ') || '선택된 좌석이 없습니다'}`);
  
//   };

//   return (
//     <div>
//         <br/>
//       {/* 좌석 선택 */}
//       <form onSubmit={handleSubmit}>
//         <p>선택 좌석: {selectedSeats.join(', ') || 'None'}</p>
//         <div>
//           {renderSeatButtons()}
//         </div>
//         <button type="submit">예약</button>
//       </form>
//       {/* Submit button outside of the form */}
//       {/* <button form="seatForm" type="submit">예약</button> */}
//     </div>
//   );
// }

// export default BusSeat;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../User/AuthContext'; // AuthContext import

const GuestBooking = () => {
  const { guestRedirectUrl } = useContext(AuthContext); // AuthContext에서 guestRedirectUrl 가져오기
  const navigate = useNavigate();
  const [number, setNumber] = useState('');

  const handleSubmit = () => {
    const urlWithNumber = `${guestRedirectUrl}&number=${number}`;
    navigate(urlWithNumber); // 입력한 숫자를 URL에 추가하여 이동
  };

  return (
    <div>
      <h2>비회원 예매</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="숫자를 입력하세요"
      />
      <button onClick={handleSubmit}>확인</button>
    </div>
  );
};

export default GuestBooking;

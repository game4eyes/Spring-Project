import React, { useState } from 'react';

const FindUsername = () => {
  const [email, setEmail] = useState('');

  const handleFindUsername = (e) => {
    e.preventDefault();
    // 아이디 찾기 로직을 구현
    console.log('아이디 찾기 처리', email);
  };

  return (
    <div className="find-username-container">
      <h2>아이디 찾기</h2>
      <form onSubmit={handleFindUsername}>
        <div className="form-group">
          <label htmlFor="email">등록된 이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">아이디 찾기</button>
      </form>
    </div>
  );
};

export default FindUsername;

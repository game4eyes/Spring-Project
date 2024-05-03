import React, { useState } from 'react';

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    // 비밀번호 재설정 로직을 구현
    console.log('비밀번호 재설정 처리', username, email);
  };

  return (
    <div className="reset-password-container">
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">등록된 이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">비밀번호 재설정</button>
      </form>
    </div>
  );
};

export default ResetPassword;
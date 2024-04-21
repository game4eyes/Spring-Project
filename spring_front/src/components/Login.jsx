// src/Login.jsx

import React, { useState } from 'react';
// import './Login.css';

const Login = () => {
  // 상태 변수 정의
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // 로그인 버튼 클릭 시 동작
  const handleLogin = () => {
    // 로그인 처리 로직 작성
  };

  // JSX 반환
  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
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
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">아이디 저장</label>
        </div>
        <button type="submit">로그인</button>
      </form>
      <div className="additional-links">
        <a href="#">회원가입</a>
        <span> | </span>
        <a href="#">아이디/비밀번호 찾기</a>
      </div>
    </div>
  );
};

export default Login;

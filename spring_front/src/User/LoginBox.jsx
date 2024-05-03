import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginBox = ({ onLogin }) => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(userid, password);
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            placeholder="아이디 입력"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
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
        <div className="login-actions">
          <button type="submit">로그인</button>
          <div className="links">
            <Link to="/FindUserId">아이디 찾기</Link>
            <Link to="/ResetPassword">비밀번호 찾기</Link>
            <Link to="/Signup">회원가입</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;

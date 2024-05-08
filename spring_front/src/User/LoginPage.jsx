import React, { useState } from 'react';
import axios from 'axios';  // axios 라이브러리 임포트
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';  // useNavigate 추가
import Header from '../components/Header';
import Ad from '../components/Ad';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();  // 네비게이션 함수 사용

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempted with:", userid, password);
    try {
      // 로그인 처리 API 호출
      const response = await axios.post('/api/login', { userid, password });
      console.log('Login successful:', response.data);
      // 로그인 성공 후 리디렉션
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인 실패: ' + error.message);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              placeholder="아이디 입력"
              required
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
              required
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
              <Link to="/api/finduserid">아이디 찾기</Link>
              <span> | </span>
              <Link to="/api/resetpassword">비밀번호 찾기</Link>
              <span> | </span>
              <Link to="/api/join">회원가입</Link>
            </div>
          </div>
        </form>
      </div>
      <Ad />
      <Footer />
    </div>
  );
};

export default LoginPage;

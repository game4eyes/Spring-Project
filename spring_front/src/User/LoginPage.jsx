import React, { useState } from 'react';
import axios from 'axios'; 
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Ad from '../components/Ad';
import Footer from '../components/Footer';
import { userLogin } from '../api/todoApi';

// useNavigate를 사용하기 위해 `navigate` 변수 선언
const LoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // 올바르게 초기화된 navigate 객체

  const loginData = {
    loginId,
    password,
  };

  const handleLogin = async (e) => { // e 파라미터를 추가
    e.preventDefault(); // 이벤트 기본 동작 방지

    console.log(loginData);

    try {
      await userLogin(loginData); // 가정된 로그인 엔드포인트
      alert('로그인 되었습니다!');
      navigate('/home'); // 페이지 이동
    } catch (error) {
      let errorMessage = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      if (error.response && error.response.status === 400) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setErrors({ form: errorMessage }); // 오류 메시지 설정
      console.error(errorMessage); // 오류 로그
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}> {/* 수정 */}
          <div className="form-group">
            <label htmlFor="loginId">아이디</label>
            <input
              type="text"
              id="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
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

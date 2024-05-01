// src/Login.jsx

import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Ad from '../components/Ad';
import Footer from '../components/Footer';
import Article from '../components/Article';
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
       <Header></Header>
       <Article title ="로그인" body ="로그인 창"/>
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
       <Link to={"/Signup"}>회원가입</Link>
        <span> | </span>
        <Link to={"/FindUserId"}>아이디 찾기</Link> 
        <span> | </span>
        <Link to={"/ResetPassword"}>비밀번호 찾기</Link>
      </div>
      <Ad/>
    <Footer/>
    </div>
  );
};

export default Login;
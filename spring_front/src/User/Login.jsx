import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Ad from '../components/Ad';
import Footer from '../components/Footer';
import Article from '../components/Article';
import LoginBox from './LoginBox';
import { userLogin } from '../api/todoApi';

const LoginPage = () => {

  // 비회원 예매 정보 확인 상태
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quickPassword, setQuickPassword] = useState('');

  const loginData = {
    loginId,
    password
  }

  // 로그인 처리
  const handleLogin = async () => {

     try {
      await userLogin(loginData);
      alert('로그인 되었습니다!')
     }catch (error) {
      let errorMessage = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      if (error.response && error.response.status === 400) {
        errorMessage = error.response.data.message || errorMessage; // 명확한 오류 메시지
      }
      setErrors({ form: errorMessage }); // 오류 메시지 설정
      console.error(errorMessage); // 오류 로그
    }

  };

  // 비회원 예매 확인 처리
  const handleTicketLookup = (e) => {
    e.preventDefault();
    // 예매 정보 확인 로직
    console.log('예매 정보 확인:', email, fullName, phoneNumber, quickPassword);
  };

  return (
    <div className="login-page">
      <Header />
      <Article title="로그인" body="로그인 및 예매 정보 확인"/>
      <div className="login-container">
        <LoginBox onLogin={handleLogin}/>
        <div className="non-member-lookup">
          <h2>비회원 예매 확인</h2>
          <form onSubmit={handleTicketLookup}>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">이름</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">전화번호</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quickPassword">간편 비밀번호</label>
              <input
                type="password"
                id="quickPassword"
                value={quickPassword}
                onChange={(e) => setQuickPassword(e.target.value)}
              />
            </div>
            <button type="submit">조회하기</button>
          </form>
        </div>
      </div>
      <Ad />
      <Footer />
    </div>
  );
};

export default LoginPage;
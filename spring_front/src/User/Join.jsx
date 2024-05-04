import React, { useState } from 'react';
import { userJoin } from '../api/todoApi';
import axios from 'axios';
import Header from '../components/Header';
import Ad from '../components/Ad';
import Footer from '../components/Footer';
import Article from '../components/Article';

const Join = () => {
  const [loginId, setLoginId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  // const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [gender, setGender] = useState('male');
  const [errors, setErrors] = useState({});

  const userData = {
    loginId,
    username,
    password,
    passwordCheck,
    email,
    birth,
    phonenum,
    gender
  };

  const handleJoin = async () => {
    
    try {
      console.log(userData);
      await userJoin(userData); // 서버로 요청 보내기
      alert('회원가입이 완료되었습니다.');
      navigate('/login'); // 리디렉션
    } catch (error) {
      let errorMessage = '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.';
      if (error.response && error.response.status === 400) {
        errorMessage = error.response.data.message || errorMessage; // 명확한 오류 메시지
      }
      setErrors({ form: errorMessage }); // 오류 메시지 설정
      console.error(errorMessage); // 오류 로그
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      handleJoin();     // 가입처리 로직 기억하기   // 오류터져있음 수정필요
      alert('회원가입이 완료되었습니다.');
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) {
      errors.loginId = '아이디를 입력하세요.';
    } else if (loginId.trim().length < 7) {
      errors.loginId = '아이디는 7자리 이상이어야 합니다.';
    } else if (/\s/.test(loginId.trim())) { // 공백 포함 여부 검사
      errors.loginId = '아이디에 공백을 포함할 수 없습니다.';
    }
    if (!password) {
      errors.password = '비밀번호를 입력하세요.';
    }
    if (password !== passwordCheck) {
      errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = '올바른 이메일 주소를 입력하세요.';
    }
    return errors;
  };

  return (
    <div className="Join-container">
      <Header></Header>
      <Article title ="회원가입" body ="회원가입 창"/>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginId">아이디</label>
          <input
            type="text"
            id="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="아이디를 입력하세요"
            required
          />
          {errors.loginId && <div className="error">{errors.loginId}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="username">이름</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input
            type="password"
            id="passwordCheck"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
          {errors.passwordCheck && <div className="error">{errors.passwordCheck}</div>}
        </div>
        {/* <div className="form-group">
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="주소를 입력하세요"
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="birth">생년월일</label>
          <input
            type="date"
            id="birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phonenum">연락처</label>
          <input
            type="tel"
            id="phonenum"
            value={phonenum}
            onChange={(e) => setPhonenum(e.target.value)}
            placeholder="연락처를 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">성별</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">남자</option>
            <option value="female">여자</option>
          </select>
        </div>
        <div className="form-group" onSubmit={handleSubmit}>
          <input type="submit" value="가입"/>
        </div>
      </form>
      <Ad/>
    <Footer/>
    </div>
  );
};

export default Join;
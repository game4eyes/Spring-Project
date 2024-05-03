import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Ad from '../components/Ad';
import Footer from '../components/Footer';
import Article from '../components/Article';

const Signup = () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [gender, setGender] = useState('male');
  const [errors, setErrors] = useState({});

  const handleSignup = async () => {
    const userData = {
      id,
      username,
      password,
      email,
      phonenum,
      // address,
      gender
    };
  
    try {
      const response = await axios.post('/api/signup', userData);
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.');
        // 로그인 페이지로 리디렉션
        window.location.href = '/login';
      }
    } catch (error) {
      if (error.response) {
        setErrors({ form: error.response.data.message });
      } else {
        setErrors({ form: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      handleSignup();     // 가입처리 로직 기억하기
      alert('회원가입이 완료되었습니다.');
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = '아이디를 입력하세요.';
    } else if (username.trim().length < 7) {
      errors.username = '아이디는 7자리 이상이어야 합니다.';
    } else if (/\s/.test(username.trim())) { // 공백 포함 여부 검사
      errors.username = '아이디에 공백을 포함할 수 없습니다.';
    }
    if (!password) {
      errors.password = '비밀번호를 입력하세요.';
    }
    if (password !== password2) {
      errors.password2 = '비밀번호가 일치하지 않습니다.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = '올바른 이메일 주소를 입력하세요.';
    }
    return errors;
  };

  return (
    <div className="signup-container">
      <Header></Header>
      <Article title ="회원가입" body ="회원가입 창"/>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
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
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
          {errors.password2 && <div className="error">{errors.password2}</div>}
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
        <div className="form-group">
          <input type="submit" value="가입" />
        </div>
      </form>
      <Ad/>
    <Footer/>
    </div>
  );
};

export default Signup;
import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [gender, setGender] = useState('male');
  const [money, setMoney] = useState('테스트');
  const [paymentMethod, setPaymentMethod] = useState('card_1');
  const [errors, setErrors] = useState({});


  // 유효성 검사
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 수행
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // 유효성 검사 통과 시 회원가입 처리
      // handleSignup();
      alert('회원가입이 완료되었습니다.');
    } else {
      // 유효성 검사 에러 메시지를 상태 변수에 저장
      setErrors(validationErrors);
    }
  };

  // 유효성 검사 함수
  const validateForm = () => {
    const errors = {};

    // 각 입력 필드에 대한 유효성 검사
    if (!username.trim()) {
      errors.username = '아이디를 입력하세요.';
    }
    if (!password) {
      errors.password = '비밀번호를 입력하세요.';
    }
    if (password !== password2) {
        errors.password2 = '비밀번호가 일치하지 않습니다.';
      } else {
        delete errors.password2; //  일치하면 이전에 설정된 에러 메시지 삭제
      }
    // 이메일 형식 검사 예시
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = '올바른 이메일 주소를 입력하세요.';
    }

    return errors;
  };




  // JSX 반환
  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form>
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
        </div>
        <div className="form-group">
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="주소를 입력하세요"
          />
        </div>
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
          <label htmlFor="paymentMethod">결제 수단</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card_1">결제수단 1</option>
            <option value="card_2">결제수단 2</option>
            <option value="card_3">결제수단 3</option>
            <option value="card_4">결제수단 4</option>
          </select>
        </div>
        <div className="form-group">
          <input type="submit" value="가입" />
        </div>
      </form>
    </div>
  );
};

export default Signup;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Ad from '../components/Ad';
import Footer from '../components/Footer';
import { userLogin } from '../api/todoApi';
import { socialLogin } from '../api/todoApi'; 



const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const loginData = {
    loginId,
    password,
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await socialLogin(); // 소셜 로그인 함수 호출
      // 여기서 data에는 로그인 결과가 들어있습니다.
      // 필요에 따라 결과를 처리하거나 다른 동작을 수행할 수 있습니다.
    } catch (error) {
      console.error('소셜 로그인 중 오류가 발생했습니다.', error);
      // 오류 발생 시 적절한 처리를 수행합니다.
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      loginId,
      password,
    };

    try {

      const response = await userLogin({ loginId, password });
      const sessionId = response.data.sessionId; // 서버에서 세션 ID를 반환하는 key에 따라 수정
      sessionStorage.setItem('sessionId', sessionId); // 세션 ID를 sessionStorage에 저장

      alert('환영합니다!');
      //navigate('/'); // 로그인 성공 시 홈페이지로 이동
      navigate(redirectUrl);
      setRedirectUrl("/");
    } catch (error) {
      let errorMessage = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      if (error.response && error.response.status === 400) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setErrors({ form: errorMessage });
      console.error(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn-primary">로그인</button>
            <div className="links">
              <Link to="/api/finduserid">아이디 찾기</Link>
              <span> | </span>
              <Link to="/api/resetpassword">비밀번호 찾기</Link>
              <span> | </span>
              <Link to="/api/join">회원가입</Link>
            </div>
          </div>
        </form>

        {/* 소셜 로그인 버튼 추가 */}
        <div className="social-login-buttons">
          <h3>또는 소셜 로그인 사용하기</h3>
          <button className="social-button google-login" onClick={handleGoogleLogin}>
  구글 로그인
</button>
          <button className="social-button naver-login" onClick={() => window.location.href = 'NAVER_AUTH_URI'}>
            네이버 로그인
          </button>
        </div>
      </div>
      <Ad />
      <Footer />
    </div>
  );
};

export default Login;

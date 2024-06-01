import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userLogin } from '../api/todoApi';
import { AuthContext } from '../global/AuthContext';
import Layout from '../components/Layout';
import { socialLogin } from '../api/todoApi';
import '@/css/form/loginform.css';
import { ReactComponent as GoogleLogoIcon } from '@/icon/google_logo2.svg'
import { useCookies } from 'react-cookie';
import Logo_black from '@/components/Logo_black';


const Login = ({ handleClose }) => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AuthContext);  // isLoggedIn 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']);


  const currenturl = window.location.href;



  useEffect(() => {
    if (isLoggedIn) {
      if (currenturl.includes('/ticketbook/train')) {      //기차 예약 페이지에서 로그인할 경우
        handleClose(); // Close the modal after successful login
      } 
     else if (currenturl.includes('/ticketbook/plane')) {      //공항 예약 페이지에서 로그인할 경우
        handleClose(); // Close the modal after successful login
      } 
      
      else if (currenturl.includes('/ticketbook/bus')) {      //버스 예약 페이지에서 로그인할 경우
        handleClose(); // Close the modal after successful login
      } 
      
      
      else {        //그 이외의 경우에 대한 로그인
        navigate('/');
      }
    }
  }, [isLoggedIn, navigate, currenturl, handleClose]);


  const loginData = {
    email,
    password,
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     const data = await socialLogin();
  //     // 추가적인 로그인 결과 처리
  //   } catch (error) {
  //     console.error('소셜 로그인 중 오류가 발생했습니다.', error);
  //   }
  // };

  // const handleGoogleLogin = () => {
  //   window.location.href = 'http://localhost:9090/api/user/social-google';
  // };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:9090/oauth2/authorization/google';
  };
  
  let sessionStorage = window.sessionStorage;
  


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(loginData);
      alert('환영합니다!');
   

      sessionStorage.setItem("userEmail", email);
      setIsLoggedIn(true);
      //sessionStorage.getItem("userEmail");

      // setCookie("userEmail", loginData.email);
      // setUser(response.data.user);
      // setCookie("userEmail", response.data.user.email, {path: '/'});
      // setCookie("username", response.data.user.username, {path: '/'});

      document.cookie = `sessionId=${response.data.sessionId}; path=/; SameSite=Lax`;
      navigate('/');
      handleClose(); // Close the modal after successful login

    } catch (error) {
      let errorMessage = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      if (error.response && error.response.status === 400) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setErrors({ form: errorMessage });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2><Logo_black /></h2><br></br>
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginTop: '-30px' }}>
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="links" style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '-30px' }}>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginRight: '20px', marginTop: '26px' }}>
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ marginRight: '5px', marginTop: '-5px' }}
              />
              <label htmlFor="remember-me">아이디 저장</label>
            </div>
            <div style={{ alignItems: 'right' }} >
              <Link to="/api/user/finduserid" style={{ color: 'black' }}>아이디 찾기</Link>
              <span style={{ margin: '0 5px', color: 'black' }}> | </span>
              <Link to="/api/user/resetpassword" style={{ color: 'black' }}>비밀번호 찾기</Link>
            </div>
          </div>

          <div className="login-actions" style={{ alignItems: 'center' }}>
            <button type="submit" className="btn-primary">로그인</button>
          </div>
        </form>
        <br></br>

        <div className="col2" style={{ display: 'flex', alignItems: 'center', marginLeft: '-20px', marginTop: '-30px', marginBottom: '15px' }}>
          <div className="join-button" style={{ marginRight: '10px' }}>
            <Link to="/api/user/join"><button type="button" className="btn-primary" style={{ backgroundColor: 'green' }}>회원가입</button></Link>
          </div>
          <h4 style={{ marginTop: '30px', marginRight: '30px', fontWeight: 'normal', color: '#888888' }}>|</h4>
          <div className="social-login-buttons">
            <button className="social-button google-login" onClick={handleGoogleLogin}>
              <GoogleLogoIcon style={{ fill: 'white', width: '22px', height: '22px' }} />구글 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

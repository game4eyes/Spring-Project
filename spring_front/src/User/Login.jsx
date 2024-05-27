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

const Login = () => {
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
      if (currenturl.includes('paylogin')) {      //기차 로그인
        const searchParams = new URLSearchParams(window.location.search);
        const railName = searchParams.get('railName');
        const trainNo = searchParams.get('trainNo');
        const trainClass = searchParams.get('trainClass');
        const departureTime = searchParams.get('departureTime');


        const departure = searchParams.get('departure');
        const destination = searchParams.get('destination');
        const date = searchParams.get('date');
        const hour = searchParams.get('hour');
        const dayz = searchParams.get('dayz');
        const price = searchParams.get('price');


        const url = `/ticketbook/bookresult?railName=${encodeURIComponent(railName)}&trainClass=${encodeURIComponent(trainClass)}&trainNo=${encodeURIComponent(trainNo)}&departureTime=${encodeURIComponent(departureTime)}
        &departure=${encodeURIComponent(departure)}&destination=${encodeURIComponent(destination)}&hour=${encodeURIComponent(hour)}&date=${encodeURIComponent(date)}&dayz=${encodeURIComponent(dayz)}&price=${encodeURIComponent(price)}`;

        navigate(url);
      }
      else {        //그 이외의 경우에 대한 로그인
        navigate('/');
      }
    }
  }, [isLoggedIn, navigate, currenturl]);


  const loginData = {
    email,
    password,
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await socialLogin();
      // 추가적인 로그인 결과 처리
    } catch (error) {
      console.error('소셜 로그인 중 오류가 발생했습니다.', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(loginData);

      alert('환영합니다!');
      console.log(loginData);
      setIsLoggedIn(true);
      console.log(loginData.email);



      setCookie("userEmail", loginData.email);





      setUser(response.data.user);

      document.cookie = `sessionId=${response.data.sessionId}; path=/; SameSite=Lax`;
      navigate('/');



    } catch (error) {
      let errorMessage = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      if (error.response && error.response.status === 400) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setErrors({ form: errorMessage });
    }
  };

  useEffect(() => {
    console.log('로그인 상태가 변경되었습니다:', isLoggedIn);
  }, [isLoggedIn]);                 // 로그인 잘 되는지 확인 완



  //   const Testresult = () => {     데이터 테스트
  //     const location = useLocation();
  //     const searchParams = new URLSearchParams(location.search);

  //     // URL에서 쿼리 매개변수 값들을 읽어옴
  //     const railName = searchParams.get('railName');
  //     const trainClass = searchParams.get('trainClass');
  //     const trainNo = searchParams.get('trainNo');
  //     const departureTime = searchParams.get('departureTime');


  //     const departure = searchParams.get('departure');
  //     const destination = searchParams.get('destination');
  //     const hour = searchParams.get('hour');
  //     const dayz = searchParams.get('dayz');


  //     return (

  //         <div>
  //           <h2>열차 정보</h2>
  //             <p>출발지: {departure}</p>
  //             <p>도착지: {destination}</p>
  //             <p>시간: {hour}</p>
  //             <p>요일: {dayz}</p>

  //             <p>열차 이름: {railName}</p>
  //             <p>열차 종류: {trainClass}</p>
  //             <p>열차 번호: {trainNo}</p>
  //             <p>출발 시간: {departureTime}</p>
  //             {/* 필요한 열차 정보를 여기에 추가 */}
  //         </div>
  //     );
  // };


  return (

    // <Layout title="로그인" body="로그인 창" >
      <div className="login-page">
        {/* <Testresult/> 데이터 테스트*/}
        {/* <div className="logoposition" style ={{ top: -100, marginBottom:'30px'}}>
      
        </div> */}
        <div className="login-container">
          <h2 style={{marginTop:'30px'}}>  <Logo_black/></h2><br></br>
          <form onSubmit={handleLogin}>
            <div className="form-group">
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

            {/* <div className="form-group" style={{display:'flex',marginLeft:'160px',marginTop:'-30px'}}>
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">아이디 저장</label>
          </div> */}
            {/* <div className="login-actions"> */}
            {/* <button type="submit" className="btn-primary">로그인</button> */}
            {/* <div className="links" style={{display:'flex'}}>
              <Link to="/api/finduserid">아이디 찾기</Link> */}



            <div className="links" style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '-30px' }}>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginRight: '20px', marginTop: '21px' }}>
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ marginRight: '5px' }}
                />
                <label htmlFor="remember-me" style={{ marginTop: '5px' }}>아이디 저장</label>
              </div>
              <div style={{alignItems:'right'}} >
              <span style={{ marginRight: '10px'}}>  </span>
              <Link to="/api/user/finduserid" style ={{color:'black'}}>아이디 찾기</Link>
              <span style={{ margin: '0 10px',color:'black' }}> | </span>
              <Link to="/api/user/resetpassword" style ={{color:'black'}}>비밀번호 찾기</Link>
              </div>
            </div>



            <div className="login-actions" style={{ alignItems: 'center' }}>
              <button type="submit" className="btn-primary">로그인</button>
            </div>
          </form>
          <br></br>

          <div className="col2" style={{ display: 'flex', alignItems: 'center',marginLeft:'-20px' }}>
            {/* 회원가입 버튼 추가 */}
            <div className="join-button" style={{ marginRight: '10px' }}>

              <Link to="/api/user/join"><button type="button" className="btn-primary" style={{ backgroundColor: 'green' }}>회원가입</button></Link>
            </div>
            <h4 style={{ marginTop:'30px',marginRight: '30px', fontWeight: 'normal', color: '#888888' }}>|</h4>

            {/* 소셜 로그인 버튼 추가 */}
            <div className="social-login-buttons">
              <button className="social-button google-login" onClick={handleGoogleLogin}>
                <GoogleLogoIcon style={{ fill: 'white', width: '22px', height: '22px' }} />구글 로그인

                {/* 구글 로그인 */}
              </button>
              {/* <button className="social-button naver-login" onClick={() => window.location.href = 'NAVER_AUTH_URI'}>
      네이버 로그인
    </button> */}
            </div>
          </div>


        </div>
      </div>
    // </Layout>

  );
};

export default Login;

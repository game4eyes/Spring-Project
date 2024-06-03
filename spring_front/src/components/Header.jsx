import React, { useEffect, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../global/AuthContext';
import SessionTimer from './SessionTimer';
import NavBar from './NavBar';

// import { useCookies } from 'react-cookie';

import { ReactComponent as MemberIcon } from '@/icon/member.svg';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, setLastActiveTime } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // const [cookies, setCookie, removeCookie] = useCookies(['userEmail']);

  // 사용자의 이메일 쿠키값 가져오기
  // const userEmail = cookies.userEmail || '';

  let sessionStorage = window.sessionStorage;
  const email = sessionStorage.getItem('email');


  // useEffect(() => {
  //   const handleHistoryChange = () => {
  //     if (isLoggedIn && (location.pathname === '/' || location.pathname === '/api/user/login')) {
  //       alert('로그인한 상태입니다.');
  //       navigate('/');
  //       window.history.pushState(null, null, window.location.href);
  //     } else if (!isLoggedIn && location.pathname !== '/api/user/login' && location.pathname === '/') {
  //       alert('로그인이 필요합니다.');
  //       navigate('/api/user/login');
  //     }
  //   };

  //   window.addEventListener('popstate', handleHistoryChange);

  //   return () => {
  //     window.removeEventListener('popstate', handleHistoryChange);
  //   };
  // }, [isLoggedIn, location, navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('lastActiveTime');
    // removeCookie('userEmail'); // 로그아웃 시 이메일 쿠키 제거
    sessionStorage.removeItem('email');
    navigate('/');
  };





  useEffect(() => {
    if (isLoggedIn) {
      const currentTime = Date.now();
      if (!localStorage.getItem('lastActiveTime')) {
        localStorage.setItem('lastActiveTime', currentTime.toString());
      }
      setLastActiveTime(parseInt(localStorage.getItem('lastActiveTime'), 10));
    } else {
      localStorage.removeItem('lastActiveTime');
      setLastActiveTime(Date.now());
    }
  }, [isLoggedIn, setLastActiveTime]);

  useEffect(() => {
    // 부모 창으로부터 로그인 성공 메시지를 수신
    const receiveMessage = (event) => {
      if (event.data.type === 'LOGIN_SUCCESS') {
        // 사용자의 이메일 쿠키 값을 설정
        // setCookie('userEmail', event.data.userEmail, { path: '/', sameSite: 'lax' });
        sessionStorage.setItem("email", email);
        // 로그인 상태를 설정
        setIsLoggedIn(true);
      }
    };

    window.addEventListener('message', receiveMessage);

    return () => {
      // 이벤트 리스너 제거
      window.removeEventListener('message', receiveMessage);
    };
  // }, [setIsLoggedIn, setCookie]);
}, [setIsLoggedIn, sessionStorage]);

  return (
    <div className='fixedheader'>
      {sessionStorage.email && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Link to='/api/user/mypage'><MemberIcon style={{ width: '24px', height: '24px' }} /></Link>
          <p style={{ margin: 0, marginTop: '8px', marginBottom: '8px', marginRight: '15px' }}><Link to='/api/user/mypage'>{sessionStorage.email}</Link>님 안녕하세요!</p>
          <SessionTimer sessionTimeout={30 * 60 * 1000} handleLogout={handleLogout} />
        </div>
      )}
      <NavBar />
    </div>
  );
};

export default Header;

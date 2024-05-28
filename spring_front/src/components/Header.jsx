import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../global/AuthContext';
import SessionTimer from './SessionTimer';
import NavBar from './NavBar';

import { useCookies } from 'react-cookie';

import { ReactComponent as MemberIcon } from '@/icon/member.svg';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, lastActiveTime, setLastActiveTime, loginId, userEmail, setUserEmail } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']); 

  useEffect(() => {
    const handleHistoryChange = () => {
      if (isLoggedIn && (location.pathname === '/' || location.pathname === '/api/user/login')) {
        alert('로그인한 상태입니다.');
        navigate('/');
        window.history.pushState(null, null, window.location.href);
      } else if (!isLoggedIn && location.pathname !== '/api/user/login' && location.pathname === '/') {
        alert('로그인이 필요합니다.');
        navigate('/api/user/login');
      }
    };

    window.addEventListener('popstate', handleHistoryChange);

    return () => {
      window.removeEventListener('popstate', handleHistoryChange);
    };
  }, [isLoggedIn, location, navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('lastActiveTime');
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



  return (
    <div className='fixedheader'>
      {isLoggedIn && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <MemberIcon style={{ width: '24px', height: '24px' }} />
          <p style={{ margin: 0, marginTop:'8px', marginBottom:'8px',marginRight:'15px'}}>{cookies.userEmail}님 안녕하세요!</p>
          <SessionTimer sessionTimeout={30 * 60 * 1000} handleLogout={handleLogout} />
        </div>
      )}
      <NavBar />
    </div>
  );
};

export default Header;

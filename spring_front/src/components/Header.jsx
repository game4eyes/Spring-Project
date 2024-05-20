import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import NavBar from '@components/NavBar';
import '../css/Header.css';
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js'; // 드랍다운 기능을 위해 추가
import CurrentTime from '@components/CurrentTime';
import Logo from '@components/Logo';
import { AuthContext } from '../global/AuthContext';
import SessionTimer from './SessionTimer'; // SessionTimer 추가

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, lastActiveTime, setLastActiveTime,loginId } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

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
    <div>
      <CurrentTime />
      {isLoggedIn && <SessionTimer sessionTimeout={30 * 60 * 1000} handleLogout={handleLogout} />}
      <Logo />
      <div align="right">
    
        {isLoggedIn ? (
          <> <p>환영합니다, {loginId}님!</p>
            <button type="button" className="btn btn-danger" style={{ marginRight: '10px', marginBottom: '15px' }} onClick={handleLogout}>
              로그아웃
            </button>
            <button type="button" className="btn btn-success" style={{ marginRight: '10px', marginBottom: '15px' }}>
              마이페이지
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-danger" style={{ marginRight: '10px', marginBottom: '15px' }}>
              <Link to="/api/user/login" style={{ color: 'white', textDecoration: 'none' }}>로그인</Link>
            </button>
            <button type="button" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '15px' }}>
              <Link to="/api/user/join" style={{ color: 'white', textDecoration: 'none' }}>회원가입</Link>
            </button>
          </>
        )}
        <button type="button" className="btn btn-success" style={{ marginRight: '10px', marginBottom: '15px' }}>
          <Link to="/ticket/Ticket_Detail" style={{ color: 'white', textDecoration: 'none' }}>예약정보</Link>
        </button>
      </div>
      <NavBar />
      <br />
    </div>
  );
};

export default Header;

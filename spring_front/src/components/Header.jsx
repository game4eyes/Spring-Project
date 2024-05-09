import { Link } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '@components/NavBar';
import '../css/Header.css';
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js'; // 드랍다운 기능을 위해 추가
import CurrentTime from '@components/CurrentTime';
import Logo from '@components/Logo';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // 추가 로그아웃 로직 필요 시 여기에 작성
  };

  const buttonStyle = { marginRight: '10px', marginBottom: '15px' };

  return (
    <header>
      <div>
        {/* 우측 타이머 */}
        <CurrentTime />

        {/* 홈 로고 */}
        <Logo />

        {/* 로그인 상태에 따른 분류 */}
        <div align="right">
          {isLoggedIn ? (
            <>
              <button type="button" className="btn btn-success" style={buttonStyle}>
                <Link to="/api/user/mypage" style={{ color: 'white', textDecoration: 'none' }}>마이페이지</Link>
              </button>
              <button type="button" className="btn btn-danger" style={buttonStyle} onClick={handleLogout}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>로그아웃</Link>
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-danger" style={buttonStyle}>
                <Link to="/api/user/login" style={{ color: 'white', textDecoration: 'none' }}>로그인</Link>
              </button>
              <button type="button" className="btn btn-primary" style={buttonStyle}>
                <Link to="/api/user/join" style={{ color: 'white', textDecoration: 'none' }}>회원가입</Link>
              </button>
            </>
          )}
          <button type="button" className="btn btn-success" style={buttonStyle}>
            <Link to="/ticket/Ticket_Detail" style={{ color: 'white', textDecoration: 'none' }}>예약정보</Link>
          </button>
        </div>

        {/* 네비게이션 바 사용 */}
        <NavBar />
      </div>
      <hr />
    </header>
  );
};

export default Header;

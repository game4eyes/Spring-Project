import { Link, useLocation, useNavigate } from 'react-router-dom';

import '../css/Header.css';
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js'; // 드랍다운 기능을 위해 추가

import Logo from '@components/Logo';
import { Container, Nav } from 'react-bootstrap';

import { ReactComponent as AirplaneTicketIcon } from '@/icon/airplane_ticket.svg';
import { ReactComponent as BusIcon } from '@/icon/bus.svg';
import { ReactComponent as CashIcon } from '@/icon/cash.svg';
import { ReactComponent as FlightIcon } from '@/icon/flight.svg';
//import { ReactComponent as HomeIcon } from '@/icon/home.svg';
import { ReactComponent as ShoppingCartIcon } from '@/icon/shopping_cart.svg';
import { ReactComponent as TrainIcon } from '@/icon/train.svg';
import { ReactComponent as DepartureIcon } from '@/icon/departure.svg';

import { useContext } from 'react';
import { AuthContext } from '../global/AuthContext';

const NavBar = () => {


  const { isLoggedIn, setIsLoggedIn, lastActiveTime, setLastActiveTime, loginId } = useContext(AuthContext);
  //const location = useLocation();
  const navigate = useNavigate();


  // nav바 메뉴
  const topics = [     

    // { id: 1, title: "예매", body: '예매' },
    // { id: 2, title: "조회/변경/취소", body: '예매 취소' },
      { id: 1, title: "운행정보", body: '운행 정보임' },
      { id: 2, title: "터미널정보 (버스)", body: '터미널 정보임' },
      { id: 3, title: "기차역정보/노선도 (기차)", body: '기차 정보임' },
      { id: 4, title: "안내·서비스 (공항)", body: '안내 정보임' },
      { id: 5, title: "수수료 정보", body: '수수료 정보임' },
 
 
 
     //  { id:8, title: "국내여행", body: '국내여행임' },
     //  { id: 9, title: "고객지원", body: '고객지원임' },



     
   ];

   const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('lastActiveTime');
    navigate('/');
  };


  const headerStyle = {
    marginTop: isLoggedIn ? '0px' : '40px', // Adjust the default marginTop value as needed
};


return (
  <header style={headerStyle}>
  <div className="px-3 py-2 text-bg-dark border-bottom">
    <Container>
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
          <Logo />
        </a>
        <Nav className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
          {/* <Nav.Item>
          <Nav.Link href="#" className="nav-link text-secondary d-flex flex-column align-items-center">
            <HomeIcon style={{ width: '24px', height: '24px' }} />
            <span>홈</span>
          </Nav.Link>
        </Nav.Item> */}
          <Nav.Item>
            <Nav.Link href="#" className="nav-link text-white d-flex flex-column align-items-center">
              <DepartureIcon style={{ width: '24px', height: '24px' }} />
              <span className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">승차권 예매</span>

              <ul className="dropdown-menu">
                {/* <a className="dropdown-item" href="#">예매권</a> */}
                <li><Link to={"/ticketbook/bus"} className="dropdown-item">버스</Link></li>
                <li><Link to={"/ticketbook/train"} className="dropdown-item">기차</Link></li>
                <li><Link to={"/ticketbook/plane"} className="dropdown-item">공항</Link></li>
              </ul>
            </Nav.Link>
          </Nav.Item>


          <Nav.Item>
            <Nav.Link href="#" className="nav-link text-white d-flex flex-column align-items-center">
              <FlightIcon style={{ width: '24px', height: '24px' }} />
              <span className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">조회/수정/취소</span>

              <ul className="dropdown-menu">
                {/* <a className="dropdown-item" href="#">예매권</a> */}
                <li><Link to={"/ticketbook/bus"} className="dropdown-item">예약 조회</Link></li>
                <li><Link to={"/ticketbook/train"} className="dropdown-item">예약 수정</Link></li>
                <li><Link to={"/ticketbook/plane"} className="dropdown-item">예약 취소               
                </Link></li>
              </ul>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="#" className="nav-link text-white d-flex flex-column align-items-center">
              <ShoppingCartIcon style={{ width: '24px', height: '24px' }} Link to={'/nav/navlink' + '1'} />
              <span><Link to={'/nav/navlink' + '1'} style={{ color: 'white', textDecoration: 'none' }}>운행정보</Link></span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="nav-link text-white d-flex flex-column align-items-center">
              <BusIcon style={{ width: '24px', height: '24px' }} />
              <span><Link to={'/nav/navlink' + '2'} style={{ color: 'white', textDecoration: 'none' }}>버스 터미널 정보</Link></span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="nav-link text-white d-flex flex-column align-items-center">
              <TrainIcon style={{ width: '24px', height: '24px' }} />
              <span><Link to={'/nav/navlink' + '3'} style={{ color: 'white', textDecoration: 'none' }}>기차역정보/노선도</Link></span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="nav-link text-white d-flex flex-column align-items-center">
              <AirplaneTicketIcon style={{ width: '24px', height: '24px' }} />
              <span><Link to={'/nav/navlink' + '4'} style={{ color: 'white', textDecoration: 'none' }}>안내/공항 서비스</Link></span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="nav-link text-white d-flex flex-column align-items-center">
              <CashIcon style={{ width: '24px', height: '24px' }} />
              <span><Link to={'/nav/navlink' + '5'} style={{ color: 'white', textDecoration: 'none' }}>수수료 정보</Link></span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div style={{ marginRight: '-55px', marginTop: '20px' }}>
          {isLoggedIn ? (
            <>
              {/* <p>환영합니다, {loginId}님!</p> */}
              <button type="button" className="btn btn-danger" style={{ marginRight: '10px', marginBottom: '15px' }} onClick={handleLogout}>
                로그아웃
              </button>
              <button type="button" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '15px' }}>
                <Link to="/api/user/mypage" style={{ color: 'white', textDecoration: 'none' }}>마이페이지</Link>
              </button>
              <button type="button" className="btn btn-success" style={{ marginRight: '10px', marginBottom: '15px' }}>
                <Link to="/ticket/Ticket_Detail" style={{ color: 'white', textDecoration: 'none' }}>예약정보</Link>
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
              <button type="button" className="btn btn-success" style={{ marginRight: '10px', marginBottom: '15px' }}>
                <Link to="/ticket/Ticket_Detail" style={{ color: 'white', textDecoration: 'none' }}>예약정보</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </Container>
  </div>
</header>
);
}

export default NavBar;
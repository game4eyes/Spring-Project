import { Link, useLocation, useNavigate } from 'react-router-dom';

import '../css/NavBar.css';
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js'; // 드랍다운 기능을 위해 추가

import Logo from '@components/Logo';
import { Container, Dropdown, Nav } from 'react-bootstrap';

import { ReactComponent as AirplaneTicketIcon } from '@/icon/airplane_ticket.svg';
import { ReactComponent as BusIcon } from '@/icon/bus.svg';
import { ReactComponent as CashIcon } from '@/icon/cash.svg';
import { ReactComponent as FlightIcon } from '@/icon/flight.svg';
//import { ReactComponent as HomeIcon } from '@/icon/home.svg';
import { ReactComponent as ShoppingCartIcon } from '@/icon/shopping_cart.svg';
import { ReactComponent as TrainIcon } from '@/icon/train.svg';
import { ReactComponent as DepartureIcon } from '@/icon/departure.svg';


import { ReactComponent as UserIcon } from '@/icon/user/user.svg';
import { ReactComponent as LoginIcon } from '@/icon/user/login.svg';
import { ReactComponent as LogoutIcon } from '@/icon/user/logout.svg';
import { ReactComponent as JoinIcon } from '@/icon/user/join.svg';
import { ReactComponent as InfoIcon } from '@/icon/user/info.svg';


import { useContext, useState } from 'react';
import { AuthContext } from '../global/AuthContext';
import OffCanvasButton from '@/components/OffCanvasButton';
import LoginModal from './LoginModal';
import { useEffect } from 'react';

import { userLogout } from '@/api/todoApi';


const HiddenNavBar = () => {


  const { isLoggedIn, setIsLoggedIn, lastActiveTime, setLastActiveTime, loginId } = useContext(AuthContext);
  //const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown 상태 추가


  const [showLoginModal, setShowLoginModal] = useState(false);


  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

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



  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem('lastActiveTime');
  //   navigate('/');
  // };


    
  const handleLogout = async () => {        //수정한 로그아웃 (세션 삭제 기능 확인됨)
    try {

       const response = await userLogout();

    //  const response = await fetch(`{userPrefix}/logout`, {
    //     // const response = await fetch(`http://ec2-3-34-129-44.ap-northeast-2.compute.amazonaws.com:9090/api/user/logout`, {
    //      method: 'GET',
    //      credentials: 'include', // Include credentials (cookies, sessions) in the request
    //    });
  
      if (response) {
        setIsLoggedIn(false);
        localStorage.removeItem('lastActiveTime'); 
        sessionStorage.removeItem('email');
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  const hiddennavbarStyle = {
    marginTop:'-190px',
  };


  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if(sessionStorage.email ){
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
      setHidden(scrollPercentage <= 15); // 스크롤이 15% 이하인 경우 hidden 상태를 true로 설정
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
  else{   //비로그인 상태
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
      setHidden(scrollPercentage <= 5); // 스크롤이 15% 이하인 경우 hidden 상태를 true로 설정
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };


  }

  }, []);


  return (
    <hiddennavbar style={{ display: hidden ? 'none' : 'block', marginTop: sessionStorage.email ? '-190px' : '-140px' }}>

<div className="px-3 py-2 text-bg-dark">
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
              {/* Dropdown 수정 */}
              <Dropdown
                show={showDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Dropdown.Toggle as={Nav.Link} className="nav-link text-white d-flex flex-column align-items-center">
                  <DepartureIcon style={{ width: '24px', height: '24px' }} />
                  <span className="custom-link">승차권 예매</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item><Link to={"/ticketbook/bus"} className="dropdown-item">버스</Link></Dropdown.Item>
                  <Dropdown.Item><Link to={"/ticketbook/train"} className="dropdown-item">기차</Link></Dropdown.Item>
                  <Dropdown.Item><Link to={"/ticketbook/plane"} className="dropdown-item">공항</Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>


              {/* <Dropdown
                show={showDropdown2}
                onMouseEnter={() => setShowDropdown2(true)}
                onMouseLeave={() => setShowDropdown2(false)}
              >
                <Dropdown.Toggle as={Nav.Link} className="nav-link text-white d-flex flex-column align-items-center">
                  <DepartureIcon style={{ width: '24px', height: '24px' }} />
                  <span className="custom-link">조회/취소</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item><Link to={"/ticket/Ticket_Detail"} className="dropdown-item">예약 조회</Link></Dropdown.Item>
                  {/* <Dropdown.Item><Link to={"/ticket/Ticket_Modify"} className="dropdown-item">예약 수정</Link></Dropdown.Item> */}
              {/* <Dropdown.Item><Link to={"/ticket/Ticket_Cancel"} className="dropdown-item">예약 취소</Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}




              {/* <Nav.Item>
                <Link to={'/nav/navlink' + '1'} className="nav-link d-flex flex-column align-items-center">
                  <TrainIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                  <span className="custom-link">운행정보</span>
                </Link>
              </Nav.Item> */}
              <Nav.Item>
                <Link to={'/nav/navlink' + '2'} className="nav-link d-flex flex-column align-items-center">
                  <TrainIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                  <span className="custom-link">버스 터미널 정보</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={'/nav/navlink' + '3'} className="nav-link d-flex flex-column align-items-center">
                  <TrainIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                  <span className="custom-link">기차역정보/노선도</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={'/nav/navlink' + '4'} className="nav-link d-flex flex-column align-items-center ">
                  <AirplaneTicketIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                  <span className="custom-link">안내/공항 서비스</span>
                </Link>
              </Nav.Item>
              <h1 style={{ color: 'gray', marginLeft: '25px', marginRight: '25px' }}>|</h1>


              {sessionStorage.email  ? (
                <>

                  <Nav.Item>
                    <Link to={''} className="nav-link d-flex flex-column align-items-center" onClick={handleLogout}>
                      <LogoutIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                      <span className="custom-link">로그아웃</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to={'/api/user/mypage'} className="nav-link d-flex flex-column align-items-center">
                      <UserIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                      <span className="custom-link">마이페이지</span>
                    </Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Link to={'/ticket/Ticket_Detail'} className="nav-link d-flex flex-column align-items-center ">
                      <InfoIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                      <span className="custom-link">예약정보</span>
                    </Link>
                  </Nav.Item> */}

                  <OffCanvasButton />






                </>
              ) : (
                <>

                  <Nav.Item>
                    <button type="button" className="nav-link d-flex flex-column align-items-center" onClick={() => setShowLoginModal(true)}>
                      <LoginIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                      <span className="custom-link">로그인</span>
                    </button>
                  </Nav.Item>
                  <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />

                  <Nav.Item>
                    <Link to={'/api/user/join'} className="nav-link d-flex flex-column align-items-center">
                      <JoinIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                      <span className="custom-link">회원가입</span>
                    </Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Link to={'/ticket/Ticket_Detail'} className="nav-link d-flex flex-column align-items-center ">
                      <InfoIcon className="custom-link" style={{ width: '24px', height: '24px' }} />
                      <span className="custom-link">예약정보</span>
                    </Link>
                  </Nav.Item> */}
                  <OffCanvasButton />

                </>
              )}


            </Nav>



            {/* <div style={{ marginRight: '-55px', marginTop: '20px' }}>
              {isLoggedIn ? (
                <>
                   <p>환영합니다, {loginId}님!</p> 
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
            </div> */}

          </div>
        </Container>
      </div>
    </hiddennavbar>
  );
}

export default HiddenNavBar;

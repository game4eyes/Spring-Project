import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Navbar, Container, Nav, Offcanvas, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js';
import '@/css/navbars-offcanvas.css';
import { ReactComponent as LoginIcon } from '@/icon/user/login.svg';
import { AuthContext } from '../global/AuthContext';
import LoginModal from '@/components/LoginModal';

const OffCanvasButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부
  const [userEmail, setUserEmail] = useState(""); // 사용자 이메일
  const [showLoginModal, setShowLoginModal] = useState(false);


  let sessionStorage = window.sessionStorage;
  const email = sessionStorage.getItem('email');
  
  const { isLoggedIn, setIsLoggedIn, lastActiveTime, setLastActiveTime, loginId } = useContext(AuthContext);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("email");
  };



  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <main>
      <nav className="navbar navbar-dark bg-dark" aria-label="Dark offcanvas navbar">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarDarkLabel">
            <div className="offcanvas-header">
              {/* <LoginIcon className="custom-link" style={{ width: '24px', height: '24px', marginTop: '5px' }} /> */}
              <h5 className="offcanvas-title" style={{ marginTop: '10px', marginLeft: '15px' }} onClick={() =>setShowLoginModal(true)} id="offcanvasNavbarDarkLabel">
                {sessionStorage.email ?  `${sessionStorage.email}` : ('로그인이 필요합니다')}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <li className="border-top my-3"></li>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                <li className="mb-1">
                  <button className="btn" style={{ backgroundColor: 'white!important', marginLeft: '0px' }} data-bs-toggle="collapse" data-bs-target="#account-collapseF" aria-expanded="true">
                    계정
                  </button>
                  <div className="collapse show" id="account-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column' }}>
                      {sessionStorage.email  ? (
                        <>
                          <li><Link to="/api/user/mypage" id="train" className="link-body-emphasis d-inline-flex text-decoration-none rounded">마이페이지</Link></li>
                          <li><Link to="#" id="plane" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLogout}>로그아웃</Link></li>
                        </>
                      ) : (
                        <>
                          <li><Link to="#" onClick={() =>setShowLoginModal(true)} id="bus" className="link-body-emphasis d-inline-flex text-decoration-none rounded">로그인</Link></li>
                          <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
                          <li><Link to={"/api/user/join"} id="train" className="link-body-emphasis d-inline-flex text-decoration-none rounded">회원가입</Link></li>
                        </>
                      )}
                    </ul>
                  </div>
                </li>


                <li className="border-top my-3"></li>


                <li className="nav-item">
                  <Link to={"/"} className="nav-link active" style={{ backgroundColor: 'white!important', marginLeft: '15px' }}>홈</Link>
                </li>

                <ul className="list-unstyled ps-0 flex-column" style={{ display: 'flex', flexDirection: 'column' }}>
                  <li className="mb-1" style={{ marginBottom: '0' }}>
                    <button className="btn" style={{ backgroundColor: 'white!important', marginLeft: '5px', padding: '10px 10px' }} data-bs-toggle="collapse" data-bs-target="#booking" aria-expanded="true">
                      승차권 예매 <span style={{ marginLeft: '10px', fontSize: '12px' }}>▼</span>
                    </button>
                    <div className="collapse show" id="booking">
                      <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column' }}>
                        <li><Link to={"/ticketbook/bus"} id="bus" className="link-body-emphasis d-inline-flex text-decoration-none rounded">버스</Link></li>
                        <li><Link to={"/ticketbook/train"} id="train" className="link-body-emphasis d-inline-flex text-decoration-none rounded">기차</Link></li>
                        <li><Link to={"/ticketbook/plane"} id="plane" className="link-body-emphasis d-inline-flex text-decoration-none rounded">항공</Link></li>
                      </ul>
                    </div>
                  </li>
                </ul>


                <li className="nav-item">
                  <Link to={"/nav/navlink2"} className="nav-link active" style={{ backgroundColor: 'white!important', marginLeft: '15px' }}>버스 터미널 정보</Link>
                </li>


                <li className="nav-item">
                  <Link to={"/nav/navlink3"} className="nav-link active" style={{ backgroundColor: 'white!important', marginLeft: '15px' }}>기차역정보/노선도</Link>
                </li>


                <li className="nav-item">
                  <Link to={"/nav/navlink4"}  className="nav-link active" style={{ backgroundColor: 'white!important', marginLeft: '15px' }}>안내 공항 서비스</Link>
                </li>

              </ul>

            </div>
          </div>
        </div>
      </nav>
    </main>
  );
};

export default OffCanvasButton;

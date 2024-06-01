import React, { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js';
import '@/css/navbars-offcanvas.css';

import { ReactComponent as LoginIcon } from '@/icon/user/login.svg';

const OffCanvasButton = () => {


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
            <LoginIcon className="custom-link" style={{ width: '24px', height: '24px' , marginTop:'5px' }} />
              <h5 className="offcanvas-title" style={{ marginTop: '10px', marginLeft: '15px' }} id="offcanvasNavbarDarkLabel">로그인</h5>
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
                      <li><a href="#" id="bus" className="link-body-emphasis d-inline-flex text-decoration-none rounded">로그인</a></li>
                      <li><a href="#" id="train" className="link-body-emphasis d-inline-flex text-decoration-none rounded">마이페이지</a></li>
                      <li><a href="#" id="plane" className="link-body-emphasis d-inline-flex text-decoration-none rounded">로그아웃</a></li>
                    </ul>
                  </div>
                </li>


                <li className="border-top my-3"></li>


                <li className="nav-item">
                  <a className="nav-link active" style={{ backgroundColor: 'white!important', marginLeft: '15px' }} aria-current="page" href="#">홈</a>
                </li>

                <ul className="list-unstyled ps-0 flex-column" style={{ display: 'flex', flexDirection: 'column' }}>
                  <li className="mb-1" style={{ marginBottom: '0' }}>
                    <button className="btn" style={{ backgroundColor: 'white!important', marginLeft: '5px', padding: '10px 10px' }} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                      승차권 예매 <span style={{ marginLeft: '10px',fontSize: '12px' }}>▼</span>
                    </button>
                    <div className="collapse show" id="home-collapse">
                      <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column' }}>
                        <li><a href="#" id="bus" className="link-body-emphasis d-inline-flex text-decoration-none rounded">버스</a></li>
                        <li><a href="#" id="train" className="link-body-emphasis d-inline-flex text-decoration-none rounded">기차</a></li>
                        <li><a href="#" id="plane" className="link-body-emphasis d-inline-flex text-decoration-none rounded">항공</a></li>
                      </ul>
                    </div>
                  </li>



                  {/* <li className="mb-1">
        <button className="btn" style={{marginLeft:'5px'}}  data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          조회 / 취소 <span style={{marginLeft:'10px', fontSize: '12px' }}>▼</span>
          </button>
          <div className="collapse show" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column' }}>
              <li><a href="#" id = "check"className="link-body-emphasis d-inline-flex text-decoration-none rounded">예약 조회</a></li>
              <li><a href="#" id = "cancel" className="link-body-emphasis d-inline-flex text-decoration-none rounded">예약 취소</a></li>
          
            </ul>
          </div>
        </li> */}
                </ul>


                <li className="nav-item">
                  <a className="nav-link active" style={{ backgroundColor: 'white!important', marginLeft: '15px' }} aria-current="page" href="#">버스 터미널 정보</a>
                </li>


                <li className="nav-item">
                  <a className="nav-link active" style={{ backgroundColor: 'white!important', marginLeft: '15px' }} aria-current="page" href="#">기차역정보/노선도</a>
                </li>


                <li className="nav-item">
                  <a className="nav-link active" style={{ backgroundColor: 'white!important', marginLeft: '15px' }} aria-current="page" href="#">안내 공항 서비스</a>
                </li>



                {/* <li className="nav-item">
                  <a className="nav-link" style={{ backgroundColor: 'white!important', marginLeft: '15px' }} href="#">버스 터미널정보</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ backgroundColor: 'white!important', marginLeft: '15px' }} href="#">기차역정보/노선도</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ backgroundColor: 'white!important', marginLeft: '15px' }} href="#">안내 공항 서비스</a>
                </li> */}
                

                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>*/}
              </ul> 

              {/* <form className="d-flex mt-3" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form> */}
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
};

export default OffCanvasButton;

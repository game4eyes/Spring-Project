import React from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as AirplaneTicketIcon } from './icon/airplane_ticket.svg';
import { ReactComponent as BusIcon } from './icon/bus.svg';
import { ReactComponent as CashIcon } from './icon/cash.svg';
import { ReactComponent as FlightIcon } from './icon/flight.svg';
import { ReactComponent as HomeIcon } from './icon/home.svg';
import { ReactComponent as ShoppingCartIcon } from './icon/shopping_cart.svg';
import { ReactComponent as TrainIcon } from './icon/train.svg';

const HeaderTest = () => {
  return (
    <header>
      <div className="px-3 py-2 text-bg-dark border-bottom">
        <Container>
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              <HomeIcon className="bi me-2" width="40" height="32" />
            </a>
            <Nav className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <Nav.Item>
                <Nav.Link href="#" className="nav-link text-secondary">
                  <HomeIcon className="bi d-block mx-auto mb-1" width="24" height="24" />
                  홈
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" className="nav-link text-white">
                  <FlightIcon className="bi d-block mx-auto mb-1" width="24" height="24" />
                  승차권 예매
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" className="nav-link text-white">
                  <ShoppingCartIcon className="bi d-block mx-auto mb-1" width="24" height="24" />
                  운행정보
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" className="nav-link text-white">
                  <BusIcon className="bi d-block mx-auto mb-1" width="24" height="24" />
                  터미널정보(버스)
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" className="nav-link text-white">
                  <TrainIcon className="bi d-block mx-auto mb-1" width="24" height="24" />
                  기차역정보/노선도
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" className="nav-link text-white">
                  <AirplaneTicketIcon className="bi d-block mx-auto mb-1" width="24" height="24" />
                  안내/공항 서비스
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" className="nav-link text-white">
                  <CashIcon className="bi d-block mx-auto mb-1" width="24" height="24" />
                  수수료 정보
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <button type="button" className="btn btn-danger" style={{ marginRight: '10px', marginBottom: '15px' }}>
              <Link to="/api/user/login" style={{ color: 'white', textDecoration: 'none' }}>로그인</Link>
            </button>
            <button type="button" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '15px' }}>
              <Link to="/api/user/join" style={{ color: 'white', textDecoration: 'none' }}>회원가입</Link>
            </button>
            <button type="button" className="btn btn-success" style={{ marginRight: '10px', marginBottom: '15px' }}>
              <Link to="/ticket/Ticket_Detail" style={{ color: 'white', textDecoration: 'none' }}>예약정보</Link>
            </button>
          </div>   
        </Container>
      </div>
    </header>
  );
};

export default HeaderTest;

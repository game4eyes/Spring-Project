import React from 'react';
import { Link } from 'react-router-dom';
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js';
import '@/css/sidebars.css';
import '@/js/sidebars.js';

const Sidebars = ({title}) => {
  return (
    <div className="flex-shrink-0 p-3" style={{ width: '250px', marginLeft:'-20px', marginRight :'50px',border: '0.1px solid grey', marginBottom: '30px' }}>
      <Link to="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom" style={{ backgroundColor: 'white' }}>
        <svg className="bi pe-none me-2" width="30" height="24"><use xlinkHref="#bootstrap"/></svg>
        <span className="fs-5 fw-semibold" style={{ color: 'black' }}>{title}</span>
      </Link>
      <ul className="list-unstyled ps-0 flex-column" style={{ display: 'flex', flexDirection: 'column' }}>
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
            버스 터미널 정보
          </button>
          <div className="collapse show" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column' }}>
              <li><Link to={'/nav/navlink1'} className="link-body-emphasis d-inline-flex text-decoration-none rounded">서울고속버스터미널</Link></li>
              <li><Link to={'/nav/navlink2'} className="link-body-emphasis d-inline-flex text-decoration-none rounded">센트럴시티터미널</Link></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
            기차역정보/노선도
          </button>
          <div className="collapse show" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column' }}>
              <li><Link to={'/nav/navlink3'} className="link-body-emphasis d-inline-flex text-decoration-none rounded">KTX 경부선 노선도</Link></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
            안내/공항 서비스
          </button>
          <div className="collapse show" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column' }}>
              <li><Link to={'/nav/navlink4'} className="link-body-emphasis d-inline-flex text-decoration-none rounded">김해국제공항</Link></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebars;

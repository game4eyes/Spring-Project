import React from 'react';
import '@/css/breadcrumbs.css';
import {ReactComponent as HomeBlackIcon} from '@/icon/home_black.svg';

function Breadcrumb() {
  return (
    <div className="b-example-divider">
      <div className="container my-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <nav aria-label="breadcrumb" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', textAlign: 'left', width: '100%', marginTop: '-70px', marginLeft: '-60px' }}>
          <ol className="breadcrumb breadcrumb-chevron p-3 rounded-3">
            <li className="breadcrumb-item">
              <a className="link-body-emphasis" href="#">
                <HomeBlackIcon className="bi" width="16" height="16"/>
                <span className="visually-hidden">Home</span>
              </a>
            </li>
            <li className="breadcrumb-item">
              <a className="link-body-emphasis fw-semibold text-decoration-none" href="#">Library</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default Breadcrumb;

import React from 'react';
import { Navbar, Container, Nav, Offcanvas, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js';
import '@/css/navbars-offcanvas.css';

const OffCanvasButton = () => {
  return (
    <main>
      <nav className="navbar navbar-dark bg-dark" aria-label="Dark offcanvas navbar" style={{ backgroundColor: 'transparent !important' }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarDarkLabel">
            <div className="offcanvas-header" style={{ backgroundColor: 'transparent !important' }}>
              <h5 className="offcanvas-title" id="offcanvasNavbarDarkLabel" style={{ color: '#ffffff !important' }}>Offcanvas</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body" style={{ backgroundColor: 'transparent !important' }}>
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#" style={{ color: '#ffffff !important' }}>Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" style={{ color: '#ffffff !important' }}>Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#ffffff !important' }}>
                    Dropdown
                  </a>
                  <ul className="dropdown-menu" style={{ backgroundColor: 'transparent !important' }}>
                    <li><a className="dropdown-item" href="#" style={{ color: '#ffffff !important' }}>Action</a></li>
                    <li><a className="dropdown-item" href="#" style={{ color: '#ffffff !important' }}>Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" style={{ color: '#ffffff !important' }}>Something else here</a></li>
                  </ul>
                </li>
              </ul>

              <ul className="list-unstyled ps-0 flex-column" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'transparent !important' }}>
                <li className="mb-1">
                  <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true" style={{ backgroundColor: 'transparent !important', color: '#ffffff !important' }}>
                    Home
                  </button>
                  <div className="collapse show" id="home-collapse" style={{ backgroundColor: 'transparent !important', color: '#ffffff !important' }}>
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'transparent !important', color: '#ffffff !important' }}>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Overview</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Updates</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Reports</a></li>
                    </ul>
                  </div>
                </li>
                <li className="mb-1">
                  <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false" style={{ backgroundColor: 'transparent !important', color: '#ffffff !important' }}>
                    Dashboard
                  </button>
                  <div className="collapse show" id="dashboard-collapse" style={{ backgroundColor: 'transparent !important', color: '#ffffff !important' }}>
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'transparent !important', color: '#ffffff !important' }}>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Overview</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Weekly</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Monthly</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Annually</a></li>
                    </ul>
                  </div>
                </li>
                <li className="mb-1">
                  <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false" style={{ color: '#ffffff !important' }}>
                    Orders
                  </button>
                  <div className="collapse show" id="orders-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'transparent !important', color: '#ffffff !important' }}>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>New</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Processed</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Shipped</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Returned</a></li>
                    </ul>
                  </div>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                  <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false" style={{ color: '#ffffff !important' }}>
                    Account
                  </button>
                  <div className="collapse show" id="account-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'transparent !important', color: '#ffffff !important' }}>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>New...</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Profile</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Settings</a></li>
                      <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{ color: '#ffffff !important' }}>Sign out</a></li>
                    </ul>
                  </div>
                </li>
              </ul>

              <form className="d-flex mt-3" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ backgroundColor: 'transparent !important', color: '#ffffff !important' }} />
                <button className="btn btn-outline-success" type="submit" style={{ backgroundColor: 'transparent !important', color: '#ffffff !important' }}>Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
};

export default OffCanvasButton;

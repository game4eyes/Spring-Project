import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Ad from './Ad';
import '@/css/Layout.css';
import Article from './Article';
import Hero from './Hero';

const Layout = ({ loginstate, title, body, children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="Home">
            <div className="layout">
                <Header loginstate={loginstate} /><br/>
                {isHomePage ? <Hero title={title} body={body} /> : <Article title={title} body={body} />}
                <br/>
            </div>
            <div className="content">
                <div className="main-content">
                    {children}
                </div>
                <div className="ad-container">
                    <Ad />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;

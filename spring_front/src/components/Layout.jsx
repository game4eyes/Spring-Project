import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Ad from './Ad';
import '@/css/Layout.css';
import Article from './Article';
import Hero from './Hero';
import Header_test from './Header';
import CurrentTime from './CurrentTime';
import Header from './Header';


const travelListData = [ // Define your travelList data here or fetch it from a server
{ id: 'seoul', imgSrc: 'seoul.jpg', title: '서울', explain: 'Some description about Seoul' },
{ id: 'daegu', imgSrc: 'daegu.jpg', title: '대구', explain: 'Some description about Daegu' },
{ id: 'busan', imgSrc: 'busan.jpg', title: '부산', explain: 'Some description about Busan' }
];




const Layout = ({ loginstate, title, body, children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="Home">
            <div className="layout">
                <Header loginstate={loginstate} /><br/>
                {/* <Header loginstate={loginstate} /><br/> */}
                {isHomePage ? <Hero /> : <Article title={title} body={body} />}
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
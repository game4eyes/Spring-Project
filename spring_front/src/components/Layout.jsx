import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Ad from './Ad';
import '@/css/Layout.css';
import Article from './Article';
import Hero from './Hero';
import CurrentTime from './CurrentTime';
import Header from './Header';
import Breadcrumbs from '@components/Breadcrumbs';
import '@/css/Header.css';
import HiddenNavBar from './HiddenNavBar';
import SearchNavigateButton from './SearchNavigateButton';

const travelListData = [ // Define your travelList data here or fetch it from a server
    { id: 'seoul', imgSrc: 'seoul.jpg', title: '서울', explain: 'Some description about Seoul' },
    { id: 'daegu', imgSrc: 'daegu.jpg', title: '대구', explain: 'Some description about Daegu' },
    { id: 'busan', imgSrc: 'busan.jpg', title: '부산', explain: 'Some description about Busan' }
];

const Layout = ({ loginstate, title, body, children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    //  // State to manage the visibility of the search bar
    //  const [searchVisible, setSearchVisible] = useState(false);

    //  // Function to toggle the visibility of the search bar
    //  const toggleSearch = () => {
    //      setSearchVisible(!searchVisible);
    //  };

    return (
        <div className="Home">
            <div className="layout">
                <Header loginstate={loginstate} /><br />
                <HiddenNavBar loginstate={loginstate} />
                {isHomePage ? <></> : <Breadcrumbs style={{}} />}
                {isHomePage ? <Hero /> : <Article title={title} body={body} />}
                <br />
            </div>
            <div className="content" style={{display:'flex'}}>
                
                {/* <SearchNavigateButton /> */}

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

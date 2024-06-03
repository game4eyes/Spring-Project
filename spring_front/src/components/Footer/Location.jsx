import React from 'react';
import './Location.css';
import Layout from '../Layout';


const Location = () => {
  return (
    <div className="location-container">
        <Layout>
            <h1 className='hell-title'>Welcome to Hell</h1>
            <div className="button-container">
                <button onClick={() => alert('어디가...?')}>홈화면</button>
            </div>
        </Layout>
    </div>
  );
}

export default Location;

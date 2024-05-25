import React, { useState } from "react";
import { Link } from "react-router-dom";
import AD1_image from './img/Ad_img/ad1.jpeg';
import AD2_image from './img/Ad_img/ad2.jpeg';
import AD3_image from './img/Ad_img/ad3.jpeg';

const Ad = () => {
  const [adVisible, setAdVisible] = useState(true); // 광고 리스트의 가시성을 관리하는 상태

  const AdList = [
    { id: "ad1", title: "광고1", explain: '광고1', src: AD1_image },
    { id: "ad2", title: "광고2", explain: '광고2', src: AD2_image },
    { id: "ad3", title: "광고3", explain: '광고3', src: AD3_image },
  ];

  // x 버튼 클릭 시 광고 리스트의 가시성을 토글하는 함수
  const toggleAdList = () => {
    setAdVisible(!adVisible);
  };

  return (
    <div className="ad-container">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <button type="button" onClick={toggleAdList} style={{backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}>광고   x</button>
      </div>
      <ul className="ad-list" style={{ display: adVisible ? "block" : "none" }}>
        {AdList.map(ad => (
          typeof ad !== 'number' && (
            <li key={ad.id} className="ad-item">
              <Link to={'/ad/' + ad.id}>
                <img
                  src={ad.src}
                  alt={ad.title}
                  className="ad-image"
                />
              </Link>
              <div className="ad-description">
                {/* <Link to={'/' + ad.id}>{ad.title}</Link> */}
                {/* <p>{ad.explain}</p> */}
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default Ad;

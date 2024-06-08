import React, { useState } from "react";
import AD1_image from './img/Ad_img/ad1.jpg';
import AD2_image from './img/Ad_img/ad2.png';
import AD3_image from './img/Ad_img/ad3.jpg';
import AD4_image from './img/Ad_img/ad4.png';

const Ad = () => {
  const [adVisible, setAdVisible] = useState(true); // 광고 리스트의 가시성을 관리하는 상태

  const AdList = [
    { id: "ad1", title: "김윤기 github", explain: '김윤기 github', src: AD1_image, url: 'https://github.com/developer4eyes'},
    { id: "ad2", title: "이상준 github", explain: '이상준 github', src: AD2_image, url: 'https://github.com/namung08'},
    { id: "ad3", title: "장연태 github", explain: '장연태 github', src: AD3_image, url: 'https://github.com/Jelliiiii' },
    { id: "ad4", title: "이진욱 github", explain: '이진욱 github', src: AD4_image, url: 'https://github.com/Jinwook93' },
  ];

  // x 버튼 클릭 시 광고 리스트의 가시성을 토글하는 함수
  const toggleAdList = () => {
    setAdVisible(!adVisible);
  };

  // 팝업창으로 URL 열기
  const openUrlInNewWindow = (url) => {
    window.open(url, '_blank', 'width=800,height=800');
  };

  return (
    <div className="ad-container">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <button type="button" onClick={toggleAdList} style={{backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}>광고   x</button>
      </div>
      <ul className="ad-list" style={{ display: adVisible ? "block" : "none" }}>
        {AdList.map(ad => (
          typeof ad !== 'number' && (
            <li key={ad.id} className="ad-item" onClick={() => openUrlInNewWindow(ad.url)}>
              <a href ="#"><img
                src={ad.src}
                alt={ad.title}
                className="ad-image"
              /></a>
               {/* <div className="ad-description">
                 <Link to={'/' + ad.id}>{ad.title}</Link>
                 <p>{ad.explain}</p> 
              </div>  */}
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default Ad;

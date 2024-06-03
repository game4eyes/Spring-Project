import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.info}>
          <p style={styles.companyInfo}>대표이름: 김윤기 | 대표번호: 010-4593-2863</p>
          <p style={styles.address}>주소: 서울특별시 강남구 테헤란로 123-45</p>
          <p>&copy; 2024 MyWebsite. All rights reserved.</p>
        </div>
        <ul style={styles.nav}>
          <li style={styles.navItem}><a href="/" style={styles.link}>홈</a></li>
          <li style={styles.navItem}><Link to="/footer/Location" style={styles.link}>찾아오시는길</Link></li>
          <li style={styles.navItem}><Link to="/footer/TermsofUse" style={styles.link}>이용약관</Link></li>
          <li style={styles.navItem}><Link to="/footer/TravelTermsandConditions" style={styles.link}>여행약관</Link></li>
        </ul>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'black',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  info: {
    textAlign: 'left', // 좌측 정렬
    color :'white'
  },
  companyInfo: {
    margin: 0,
    fontSize: '16px', // 폰트 사이즈 조정
    color :'white'
  },
  address: {
    margin: '5px 0', // 주소와 다른 텍스트 사이의 간격 조정
    fontSize: '14px', // 폰트 사이즈 조정
    color :'white'
  },
  nav: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    margin: 0,
 
  },
  navItem: {
    marginRight: '20px',
    
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  }
}

export default Footer;

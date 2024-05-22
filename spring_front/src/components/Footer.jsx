import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>&copy; 2024 MyWebsite. All rights reserved.</p>
        <ul style={styles.nav}>
          <li style={styles.navItem}><a href="/" style={styles.link}>Home</a></li>
          <li style={styles.navItem}><a href="/about" style={styles.link}>About</a></li>
          <li style={styles.navItem}><a href="/contact" style={styles.link}>Contact</a></li>
          <li style={styles.navItem}><Link to="/footer/TermsOfService" style={styles.link}>이용약관</Link></li>
        </ul>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#f4f4f4', // 연한 회색으로 변경
    color: '#333', // 글자 색상을 어두운 회색으로 변경
    padding: '20px 0',
    textAlign: 'center',
    borderTop: '1px solid #ddd', // 상단에 경계선 추가
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    listStyle: 'none',
    padding: 0,
    display: 'flex', // 가로 정렬
    margin: 0,
  },
  navItem: {
    marginRight: '20px', // 항목 간의 간격 늘림
  },
  link: {
    color: '#007BFF', // 링크 색상을 Article의 h1 태그와 동일하게 설정
    textDecoration: 'none', // 밑줄 제거
  }
}

export default Footer;

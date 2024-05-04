import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useState } from 'react';

//import Header from '@/components/Header';
import NavBar from '@components/NavBar';
import '../css/Header.css';
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js';    //드랍다운 기능이 안되어서 파일로 따로 받았습니다
import CurrentTime from '@components/CurrentTime';
import Logo from '@components/Logo';




function Header() {




  //r기본 로그인 상태 설정
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그아웃 될 경우
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  


  return (
    <header>

        
     <div>


      {/* 우측 타이머 */}
      <CurrentTime/>      

     {/*홈 로고 */}
     {/* <h1><Link to={'/'}> KIC 관광공사 (홈) </Link></h1>  */}
      <Logo/>


      <div>
        {/*로그인 상태에 따른 분류 */}
        {isLoggedIn ? (
          <div className="Mypage_Logout" align="right">  
            <Link to={"/Mypage"}>마이페이지</Link> |
            <Link to="/" onClick={handleLogout}>로그아웃</Link>
            <button type="button" className="btn btn-success" style={{ marginRight: '10px', marginBottom: '15px'}}>
              <Link to="/api/mypage" style={{ color: 'white', textDecoration: 'none' }}>예약정보</Link>
            </button>
          </div>
        ) : (
            <div className="Login_Signup" align="right"> 
            <button type="button" className="btn btn-danger" style={{ marginRight: '10px', marginBottom: '15px'}}>
              <Link to="/api/login" style={{ color: 'white', textDecoration: 'none' }}>로그인</Link>
            </button>      
            <button type="button" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '15px'}}>
              <Link to="/api/join" style={{ color: 'white', textDecoration: 'none' }}>회원가입</Link>
            </button> 


            <button type="button" className="btn btn-success" style={{ marginRight: '10px', marginBottom: '15px'}}>
              <Link to="/ticket/Ticket_Detail" style={{ color: 'white', textDecoration: 'none' }}>예약정보</Link>
            </button>

            <button type="button" className="btn btn-success" style={{ marginRight: '10px', marginBottom: '15px'}}>
              <Link to="/api/mypage" style={{ color: 'white', textDecoration: 'none' }}>마이페이지(테스트)</Link>
            </button> 
          </div>
          
          
          
        )}
      </div>

      {/* <nav>
        <ol>
          {topics.map(topic => (
            <li className="nav-link active" aria-current="page" key={topic.id}><Link to={'/' + topic.id}>{topic.title}</Link></li>
          ))}
        </ol> 
        </nav> */}



        {/*네비게이션 바 사용 */}
       <NavBar />





      
 
      {/* <div>
        <ul>
          <li><a>예매</a></li>
          <li><Link to={"Book"}>회원예매</Link></li>
          <li><Link to={"Book"}>비회원예매</Link></li>
   
        </ul>
      </div>  */}
      </div>
      <hr />
    </header> 
  );
}

export default Header;

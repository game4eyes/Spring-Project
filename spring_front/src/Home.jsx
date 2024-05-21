/* eslint-disable */
import { useContext, useState } from 'react'
import { useEffect } from 'react'
//import { Link } from 'react-router-dom'; 
import { BrowserRouter, Link, useLocation, useNavigate } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js';  
import Ad from './components/Ad'
import SeoulImage from './components/img/region_img/seoul.jpg';
import DaeguImage from './components/img/region_img/daegu.jpg';
import BusanImage from './components/img/region_img/busan.jpeg';
import Footer from './components/Footer'

import BusImage from './components/img/Transportation_img/bus_image.png';
import TrainImage from './components/img/Transportation_img/train_image.png';
import AirportImage from './components/img/Transportation_img/airport_image.png';
import Article from '@components/Article';
import KakaoMapComponent from './components/KakaoMapComponent';
import './css/Popup.css'
import { AuthContext } from './global/AuthContext';
import Layout from './components/Layout';

//  function Article(props){
//   const articleStyle = {
//     textAlign: 'center'
//   };
//     return <article style={articleStyle}>
//          <h1> {props.title}</h1>
//          <h2> {props.body}</h2>
//    </article> 

//   }


  // function TransportationList(props){

  //   const TrList =[];

  //   for(let i =0; i<props.transportation.length;i++){
  //     let t = props.transportation[i];
  //    TrList.push(<li key={t.id}><Link to={'/'+t.id}>{t.title}</Link>{t.explain}</li>)
      
  //   }
  //   return <transportationList>
  //          <ol>{TrList}</ol>
  //   </transportationList>

  // }


//컴포넌트로 정리하기

  function TransportationList(props) {
    const listStyle = {
      display: 'flex',
      flexDirection: 'row',  // x축 방향으로 나열
      justifyContent: 'flex-start', // 이미지들을 왼쪽으로 정렬
      alignItems: 'center', // 세로 중앙 정렬
      listStyleType: 'none', // 순서 없는 목록 스타일 제거
      padding: 0, // 목록의 패딩 제거
    };
  
    const listItemStyle = {
      textAlign: 'center', // 가운데 정렬
      marginLeft: '10px', // 왼쪽 여백 추가
    };
  
    const imgStyle = {
      maxWidth: '100%',
      width: '300px', // 이미지의 너비 설정
      height: '200px', // 이미지의 높이 설정
    };
  
    return (
      <div>
        <div style={listStyle}>
          {props.transportation.map((t, index) => (
            typeof t !== 'number' && (
              <div key={t.id} style={{ ...listItemStyle, order: index % 2 === 0 ? 1 : -1 }}>
                <Link to={"/ticketbook/" + t.id}>
                  <img src={t.imgSrc} alt={t.title} style={imgStyle} />
                </Link>
                <Link to={"/ticketbook/" + t.id}><p>{t.title}</p></Link>
                {/* <p>{t.explain}</p> */}
              </div>
            )
          ))}
        </div>
      </div>
    );
  }



//컴포넌트로 정리하기

  function TravelList(props) {
    const listStyle = {
      display: 'flex',
      flexDirection: 'row',  // x축 방향으로 나열
      justifyContent: 'flex-start', // 이미지들을 왼쪽으로 정렬
      alignItems: 'center', // 세로 중앙 정렬
      listStyleType: 'none', // 순서 없는 목록 스타일 제거
      padding: 0, // 목록의 패딩 제거
    };
  
    const listItemStyle = {
      textAlign: 'center', // 가운데 정렬
      marginLeft: '10px', // 왼쪽 여백 추가
    };
  
    const imgStyle = {
      maxWidth: '100%',
      width: '300px', // 이미지의 너비 설정
      height: '200px', // 이미지의 높이 설정
    };
  
    return (
      <div>
        <div style={listStyle}>
          {props.travelList.map((t, index) => (
            typeof t !== 'number' && (
              <div key={t.id} style={{ ...listItemStyle, order: index % 2 === 0 ? 1 : -1 }}>
                <Link to={t.id}>
                  <img src={t.imgSrc} alt={t.title} style={imgStyle} />
                </Link>
                <Link to={t.id}><p>{t.title}</p></Link>
                {/* <p>{t.explain}</p> */}
              </div>
            )
          ))}
        </div>
      </div>
    );
  }

  //컴포넌트로 정리하기 
  const Popup = ({ onClose, onOptionSelect }) => {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>예매 유형 선택</h3>
          <button onClick={() => onOptionSelect('회원')}>회원 예매</button>
          <button onClick={() => onOptionSelect('비회원')}>비회원 예매</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  };
  
 // export default Popup;






 //테스트
 function TransportationList_test(props) {
  const { isLoggedIn, setRedirectUrl, setGuestRedirectUrl } = useContext(AuthContext);// AuthContext에서 setRedirectUrl, setGuestRedirectUrl 가져오기
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTransportation, setSelectedTransportation] = useState(null);

  const listStyle = {
    display: 'flex',
    flexDirection: 'row',  // x축 방향으로 나열
    justifyContent: 'flex-start', // 이미지들을 왼쪽으로 정렬
    alignItems: 'center', // 세로 중앙 정렬
    listStyleType: 'none', // 순서 없는 목록 스타일 제거
    padding: 0, // 목록의 패딩 제거
  };

  const listItemStyle = {
    textAlign: 'center', // 가운데 정렬
    marginLeft: '10px', // 왼쪽 여백 추가
  };

  const imgStyle = {
    maxWidth: '100%',
    width: '300px', // 이미지의 너비 설정
    height: '200px', // 이미지의 높이 설정
  };

  const handleItemClick = (transportation) => {
    setSelectedTransportation(transportation);
    if (isLoggedIn) {
      // 로그인된 상태일 때는 바로 redirectUrl로 이동
      const url = `/ticketbook/${transportation.id}?type=회원`;
      setRedirectUrl(url);
      navigate(url); // 'url' 변수를 사용하여 이동
    } else {
      // 로그인되지 않은 상태일 때는 팝업 표시
      setShowPopup(true);
    }
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleOptionSelect = (option) => {
    setShowPopup(false);
    //const url = `/ticketbook/${selectedTransportation.id}?type=${option}`;
    const url = `/bookresult/${selectedTransportation.id}?type=${option}`;
    if (option === '회원') {
      setRedirectUrl(url);
      navigate('/api/user/login');
    } else {
      setGuestRedirectUrl(url);
      navigate('/api/user/guest-booking');
    }
  };

  return (
    <div>
      <div style={listStyle}>
        {props.transportation.map((t, index) => (
          typeof t !== 'number' && (
            <div key={t.id} style={{ ...listItemStyle, order: index % 2 === 0 ? 1 : -1 }}>
              <div
                onClick={() => handleItemClick(t)}
                style={{ cursor: 'pointer' }} // Add this style for the pointer cursor
                role="button" // Add this attribute to ensure it's interactive
              >
                <img src={t.imgSrc} alt={t.title} style={imgStyle} />
                <p>{t.title}</p>
              </div>
            </div>
          )
        ))}
      </div>
      {showPopup && <Popup onClose={handleClosePopup} onOptionSelect={handleOptionSelect} />}
    </div>
  );
}

//export default TransportationList_test;





const Home = () =>{

  const [loginstate, setLoginstate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loginId = queryParams.get('loginId');
    const password = queryParams.get('password');
    const loginstate = queryParams.get('loginstate') === 'true';

    if (loginId && password && loginstate) {
      setLoginstate(true);
      console.log(`User ${loginId} is logged in`);
    }
  }, [location.search]);


  const transportation = [
    {id : "bus", title: "버스" , explain : '버스 예약' , imgSrc: BusImage},
    {id : "train", title: "기차" , explain : '기차 예약', imgSrc: TrainImage},
    {id : "plane", title: "항공" , explain : '항공 예약', imgSrc: AirportImage}
  ];
  
  const travelList = [
    { id: "seoul", title: "서울", explain: '서울 여행', imgSrc: SeoulImage },
    { id: "busan", title: "부산", explain: '부산 여행', imgSrc: BusanImage },
    { id: "daegu", title: "대구", explain: '대구 여행', imgSrc: DaeguImage }
  ];


   //로그인 될 경우 useState 설정
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   // 로그아웃 될 경우
   const handleLogout = () => {
     setIsLoggedIn(false);
   };
  
   



return(
  
     <Layout loginstate={loginstate} title ="홈" body ="버스,기차,항공 예약 홈페이지입니다">
      
    
    <div>
          <h3>추천여행</h3>
      
          <TravelList travelList= {travelList}></TravelList>   
        </div>
        <br /> 
    <br /> 
     
    <div>
 
    </div>
    


        <div>
          <h3>예매</h3>
          <TransportationList transportation= {transportation}></TransportationList>   
        </div>
        <br /> 
    <br /> 

      {/* <div>
          <h3>회원예매</h3>
          <TransportationList transportation= {transportation}></TransportationList>   
        </div>
        <br /> 
    <br />  */}



    {/* <div>
          <h3>비회원예매</h3>
          <TransportationList transportation= {transportation}></TransportationList>   
        </div>
        <br /> 
    <br />  */}

     <div>  
     <h3>기능 (테스트)</h3> <br /><br />
     <KakaoMapComponent />

      <Link to = {"/BusSeat"}>버스 좌석</Link>
     </div>
     <br /> 
     <br /> 


    {/* 테스트용 마이페이지 */}

    <div>
    <Link to = {"/api/user/mypage"}>마이페이지</Link>   
    </div>
  
       {/* 테스트용 */}
    <div>
          <h3>비회원,회원예매 선택 테스트창</h3>
          <TransportationList_test transportation= {transportation}></TransportationList_test>   
        </div>
        <br /> 
    <br /> 
      </Layout>
   
    );
}

export default Home;
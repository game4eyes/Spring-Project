/* eslint-disable */
import { useState } from 'react'
import { useEffect } from 'react'
//import { Link } from 'react-router-dom'; 
import { BrowserRouter, Link } from "react-router-dom";
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
  
  
  
  
 
  
    

function Home() {



  const transportation = [
    {id : "bus", title: "버스" , explain : '버스 예약' , imgSrc: BusImage},
    {id : "train", title: "기차" , explain : '기차 예약', imgSrc: TrainImage},
    {id : "airport", title: "항공" , explain : '항공 예약', imgSrc: AirportImage}
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
  



  return (
    <>
    
  <div className= "Home">
  <Header/>
  
   <Article title ="홈" body ="버스,기차,항공 예약 홈페이지입니다"></Article>

 

  </div>



        <div style={{ textAlign: 'center' }}>
        <form action="/search" method="GET">
          <label htmlFor="search">검색</label>
          <input type="text" id="search" name="q" placeholder="검색창" />
          <button type="submit">Search</button>
        </form>
      </div>


     

        <br /> 
    <br />


   

    
    <div>
          <h3>추천여행</h3>
          <TravelList travelList= {travelList}></TravelList>   
        </div>
        <br /> 
    <br /> 
     
    <div>
    <Ad />
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
      <Link to = {"/BusSeat"}>버스 좌석</Link>
     </div>
     <br /> 
     <br /> 


    {/* 테스트용 마이페이지 */}
    <div>
    <Link to = {"/user/mypage"}>마이페이지</Link>   
    </div>
  


    <Footer/>
    </>
  )
}

export default Home;
/* eslint-disable */
import { useContext, useState } from 'react'
import { useEffect } from 'react'

import { BrowserRouter, Link, useLocation, useNavigate } from "react-router-dom";
import './App.css'
import '@/bootstrap_css/bootstrap.min.css';
import '@/bootstrap_js/bootstrap.bundle.min.js';

import SeoulImage from './components/img/region_img/seoul.jpg';
import DaeguImage from './components/img/region_img/daegu.jpg';
import BusanImage from './components/img/region_img/busan.jpeg';


// import BusImage from './components/img/Transportation_img/bus_image.png';
// import TrainImage from './components/img/Transportation_img/train_image.png';
// import AirportImage from './components/img/Transportation_img/airport_image.png';

import BusImage from './components/img/Transportation_img/bus_image.jpg';
import TrainImage from './components/img/Transportation_img/train_image.jpg';
 import AirportImage from './components/img/Transportation_img/airport_image.jpg';


//import Article from '@components/Article';


import KakaoMapComponent from './components/KakaoMapComponent';
import './css/Popup.css'
import { AuthContext } from './global/AuthContext';
import Layout from './components/Layout';

import Travellist1 from '@/components/img/travellist/travellist1.jpeg';
import Travellist2 from '@/components/img/travellist/travellist2.jpg';
import Travellist3 from '@/components/img/travellist/travellist3.jpeg';
import Travellist4 from '@/components/img/travellist/travellist4.jpg';
import Travellist5 from '@/components/img/travellist/travellist5.jpg';
import Travellist6 from '@/components/img/travellist/travellist6.jpg';
import Travellist7 from '@/components/img/travellist/travellist7.jpg';
import Travellist8 from '@/components/img/travellist/travellist8.jpg';
import Travellist9 from '@/components/img/travellist/travellist9.jpeg';
import Travellist10 from '@/components/img/travellist/travellist10.jpeg';
import Travellist11 from '@/components/img/travellist/travellist11.jpeg';
import RandomTravelList from './recommendlist/RandomTravelList';











//import CustomCards from '@/components/Customcards';

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



//여행지 추천 리스트
const recommendList = [


  {

    region: '부산',      //travellist1
    name: '해운대 해수욕장',
    imgSrc: Travellist1,
    description: '부산의 대표적인 해수욕장으로 맑은 바다와 고운 모래로 유명합니다.'
  },
  {
    region: '제주',  //2
    name: '성산 일출봉',
    imgSrc: Travellist2,
    description: '제주의 동쪽 해안에 위치한 일출 명소로, 장엄한 일출을 감상할 수 있습니다.'
  },
  {
    region: '서울',    //3
    name: '경복궁',
    imgSrc: Travellist3,
    description: '서울의 대표적인 고궁으로, 한국의 전통 건축 양식을 감상할 수 있는 곳입니다.'
  },
  {              //4
    region: '경주',
    name: '불국사',
    imgSrc: Travellist4,
    description: '경주의 대표적인 사찰로, 유네스코 세계문화유산으로 지정되어 있습니다.'
  },
  {
    region: '인천',  //5
    name: '월미도',
    imgSrc: Travellist5,
    description: '인천의 유명한 관광지로, 다양한 해양 액티비티와 해변을 즐길 수 있습니다.'
  },
  {
    region: '군위군',  //6
    name: '군위군 리틀포레스트 촬영지',
    imgSrc: Travellist6,
    description: '군위군의 아름다운 자연을 배경으로 한 영화 "리틀 포레스트"의 촬영지입니다. 평화로운 풍경과 정겨운 분위기를 느낄 수 있습니다.'
  },
  {
    region: '부산',    //7
    name: '연산동 고분군',
    imgSrc: Travellist7,
    description: '부산 연산동에 위치한 고분군으로, 역사의 흔적을 간직한 유적지입니다. 고분과 함께 산책을 즐기기에 좋은 곳입니다.'
  },
  {
    region: '밀양',  //8
    name: '달빛쌈지공원',
    imgSrc: Travellist8,
    description: '밀양의 달빛쌈지공원은 조용한 휴식과 산책을 즐길 수 있는 곳으로, 자연 속에서 여유로운 시간을 보낼 수 있습니다.'
  },
  {
    region: '고성',  //9
    name: '폭포암',
    imgSrc: Travellist9,
    description: '고성에 위치한 폭포암은 웅장한 폭포와 아름다운 자연경관을 자랑합니다. 힐링과 사진 촬영 명소로 인기입니다.'
  },
  {
    region: '충남',    //10
    name: '서산 용비저수지',
    imgSrc: Travellist10,
    description: '서산의 용비저수지는 낚시와 산책을 즐기기에 좋은 장소로, 아름다운 저수지 풍경이 인상적입니다.'
  },
  {
    region: '충남',  //11
    name: '판교 마을',
    imgSrc: Travellist11,
    description: '충남의 판교 마을은 전통적인 한국의 농촌 마을 풍경을 간직하고 있습니다. 전통 체험과 함께 농촌의 여유로움을 느낄 수 있습니다.'
  }

];


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

  // const handleOptionSelect = (option) => {
  //   setShowPopup(false);
  //   //const url = `/ticketbook/${selectedTransportation.id}?type=${option}`;
  //   const url = `/bookresult/${selectedTransportation.id}?type=${option}`;
  //   if (option === '회원') {
  //     setRedirectUrl(url);
  //     navigate('/api/user/login');
  //   } else {
  //     setGuestRedirectUrl(url);
  //     navigate('/api/user/guest-booking');
  //   }
  // };

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









function CustomCards({ transportation }) {
  const imgStyle = {
    width: '100%',
    height: 'auto',
    marginBottom: '10px'
  };

  const textStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '30px',
    marginLeft: '10px'
  };

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="container px-4 py-5" id="custom-cards">
      <h2 className="pb-2 border-bottom">예매</h2>

      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {transportation.map(t => (
          <div className="col" key={t.id}>
            <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
              <Link to={"/ticketbook/" + t.id} style={textStyle} onClick={handleClick}>
                <img src={t.imgSrc} alt={t.title} style={imgStyle} />
                <p style={textStyle}>{t.title}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//export default CustomCards;






const Home = () => {

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
    { id: "bus", title: "버스", explain: '버스 예약', imgSrc: BusImage },
    { id: "train", title: "기차", explain: '기차 예약', imgSrc: TrainImage },
    { id: "plane", title: "항공", explain: '항공 예약', imgSrc: AirportImage }
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

    <Layout loginstate={loginstate} title="홈" body="버스,기차,항공 예약 홈페이지입니다">


      {/* <div>
          <h3>추천여행</h3>
      
          <TravelList travelList= {travelList}></TravelList>   
        </div> */}



      {/* <div>
          <h3>예매</h3>
          <TransportationList transportation= {transportation}></TransportationList>   
        </div>
        <br /> 
    <br />  */}

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


      {/* <div class="b-example-divider"></div> */}


      <CustomCards transportation={transportation} />
      {/* <div className="container px-4 py-5" id="custom-cards">
  <h2 className="pb-2 border-bottom">예매</h2>

  <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
    <div className="col">
    <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{backgroundImage: "url('components/img/Transportation_img/bus_image.png')"}}>
        <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
          <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">버스</h3>
          <ul className="d-flex list-unstyled mt-auto">
            <li className="me-auto">
              <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white"/>
            </li>
            <li className="d-flex align-items-center me-3">
              <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
              <small>Earth</small>
            </li>
            <li className="d-flex align-items-center">
              <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
              <small>3d</small>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{backgroundImage: "url('unsplash-photo-2.jpg')"}}>
        <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
          <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">기차</h3>
          {/* <ul className="d-flex list-unstyled mt-auto">
            <li className="me-auto">
              <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white"/>
            </li>
            <li className="d-flex align-items-center me-3">
              <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
              <small>Pakistan</small>
            </li>
            <li className="d-flex align-items-center">
              <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
              <small>4d</small>
            </li>
          </ul> 
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{backgroundImage: "url('unsplash-photo-3.jpg')"}}>
        <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
          <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">비행기</h3>
          <ul className="d-flex list-unstyled mt-auto">
            {/* <li className="me-auto">
              <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white"/>
            </li>
            <li className="d-flex align-items-center me-3">
              <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
              <small>California</small>
            </li>
            <li className="d-flex align-items-center">
              <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
              <small>5d</small>
            </li> 
          </ul>
        </div>
      </div>
    </div>
  </div>
</div> */}



      {/* <hr class="featurette-divider"/> */}

      <RandomTravelList list={recommendList} count={3} viewType={1} />

      {/* <div class="row featurette">
  <div class="col-md-7">
    <h2 class="featurette-heading fw-normal lh-1"> 제주도<span class="text-body-secondary">천백고지</span></h2>
    <p class="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
  </div>
  <div class="col-md-5">
    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"/><text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text></svg>
  </div>
</div>

<hr class="featurette-divider"/>

<div class="row featurette">
  <div class="col-md-7 order-md-2">
    <h2 class="featurette-heading fw-normal lh-1">Oh yeah, it’s that good. <span class="text-body-secondary">See for yourself.</span></h2>
    <p class="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
  </div>
  <div class="col-md-5 order-md-1">
    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"/><text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text></svg>
  </div>
</div>

<hr class="featurette-divider"/>

<div class="row featurette">
  <div class="col-md-7">
    <h2 class="featurette-heading fw-normal lh-1">And lastly, this one. <span class="text-body-secondary">Checkmate.</span></h2>
    <p class="lead">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
  </div>
  <div class="col-md-5">
    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"/><text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text></svg>
  </div>
</div>

// <hr class="featurette-divider"/> */}



      <RandomTravelList list={recommendList} count={3} />         {/* viewType 이 없을 경우 여행지에 관한 정보가 자세히 나오는 문단이 나옴*/}




{/* 
      <div>
        <h3>기능 (테스트)</h3> <br /><br />
        <KakaoMapComponent />

        <Link to={"/BusSeat"}>버스 좌석</Link>
      </div>
      <br />
      <br /> */}


      {/* 테스트용 마이페이지 */}

      {/* <div>
    <Link to = {"/api/user/mypage"}>마이페이지</Link>   
    </div> */}

      {/* 테스트용 */}
      {/* <div>
        <h3>비회원,회원예매 선택 테스트창</h3>
        <TransportationList_test transportation={transportation}></TransportationList_test>
      </div> */}
      <br />
      <br />
    </Layout>

  );
}

export default Home;
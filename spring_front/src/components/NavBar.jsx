import { Link } from 'react-router-dom';

const NavBar = () => {


  // nav바 메뉴
  const topics = [     

    // { id: 1, title: "예매", body: '예매' },
    // { id: 2, title: "조회/변경/취소", body: '예매 취소' },
      { id: 1, title: "운행정보", body: '운행 정보임' },
      { id: 2, title: "터미널정보 (버스)", body: '터미널 정보임' },
      { id: 3, title: "기차역정보/노선도 (기차)", body: '기차 정보임' },
      { id: 4, title: "안내·서비스 (공항)", body: '안내 정보임' },
      { id: 5, title: "수수료 정보", body: '수수료 정보임' },
 
 
 
     //  { id:8, title: "국내여행", body: '국내여행임' },
     //  { id: 9, title: "고객지원", body: '고객지원임' },
   ];
return (
    <div className="NavBar">
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    {/* <Link to={"/"} class="navbar-brand" > 홈</Link> */}
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
       




            {/* 드랍다운 1(예매탭) -- 예매 탭에 교통수단 나열 */}
            <li className="nav-item dropdown">                          
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          승차권 예매
          </a>
          <ul class="dropdown-menu">
           {/* <a className="dropdown-item" href="#">예매권</a> */}
            <li><Link to={"/ticketbook/bus"} className="dropdown-item">버스 (회원, 비회원)</Link></li>
            <li><Link to={"/ticketbook/train"} className="dropdown-item">기차 (회원, 비회원)</Link></li>
            <li><Link to={"/ticketbook/airport"} className="dropdown-item">공항 (회원, 비회원)</Link></li>
          </ul>
        </li>

 
          {/* 드랍다운 1(예매탭) -- 예매 탭에 회원,비회원 분리 */}
        {/* <li className="nav-item dropdown">                          
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            예매
          </a>
          <ul class="dropdown-menu">
             <li> <a className="dropdown-item" href="#">회원예매</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">비회원예매</a></li>
 
          </ul>
        </li> */}



          {/* 드랍다운 1(예매탭) -- 예매 탭만 만들 경우 */}

         {/* <li class="nav-item">
        
            <li className="nav-link" aria-current="page"><Link to={'/'}>예매</Link></li>
           {/* <li className="nav-link active" aria-current="page" key={topic.id}><Link to={'/' + topic.id}>{topic.title}</Link></li> */}
        {/*} </li>  */}
   



        {/* 드랍다운 1 (예매탭)  -- 예매 탭에 회원,비회원 란을 몰아서 넣을 경우
        <li className="nav-item dropdown">                          
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            예매
          </a>
          <ul class="dropdown-menu">
           <a className="dropdown-item" href="#">회원예매</a>
            <li><Link to={"/bus"} className="dropdown-item">버스 - (회원)</Link></li>
            <li><Link to={"/train"} className="dropdown-item">기차 - (회원)</Link></li>
            <li><Link to={"/airport"} className="dropdown-item">공항 - (회원)</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">비회원예매</a></li>
            <li><Link to={"/bus"} className="dropdown-item" >버스 - (비회원)</Link></li>
            <li><Link to={"/bus"} className="dropdown-item" >기차 - (비회원)</Link></li>
            <li><Link to={"/bus"} className="dropdown-item" >공항 - (비회원)</Link></li>
          </ul>
        </li> */}

          {/*드랍다운 2*/}
          <li className="nav-item dropdown">                          
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            조회/수정/취소
          </a>
          <ul class="dropdown-menu">
           {/* <a className="dropdown-item" href="#">예매권</a> */}
            <li><Link to={"/ticket/Ticket_Detail"} className="dropdown-item">티켓 조회</Link></li>
            <li><Link to={"/ticket/Ticket_Modify"} className="dropdown-item">티켓 수정</Link></li>
            <li><Link to={"/ticket/Ticket_Cancel"} className="dropdown-item">티켓 취소</Link></li>
          </ul>
        </li>


        <li class="nav-item">
        {topics.map(topic => (
            <li className="nav-link" aria-current="page" key={topic.id}><Link to={'/nav/navlink' + topic.id}>{topic.title}</Link></li>
         //active 클래스 : 탭이 활성화된 경우   // <li className="nav-link active" aria-current="page" key={topic.id}><Link to={'/' + topic.id}>{topic.title}</Link></li>
          ))}
        </li>
        <li class ="nav-item">
        <div>

       {/* <ul>
           <li><a>예매</a></li>
          <li><Link to={"Book"} className="nav-link">회원예매</Link></li>
          <li><Link to={"Book"} className="nav-link">비회원예매</Link></li>
   
        </ul> */}

      </div>
        </li>
      

        
        {/* <li class="nav-item">                                       //disabled 주석해놓음
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> */}
       
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      
    </div>
  </div>
  
</nav>
</div>
);
}

export default NavBar;
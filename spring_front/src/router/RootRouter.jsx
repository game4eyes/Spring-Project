import React, { Suspense, lazy } from 'react';
//import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
//import Home from '../Home';
import Login from '../User/Login';
import Signup from '../User/Signup';
import FindUserId from '../User/FindUserId';
import MyPage from '../User/Mypage';

import BusSeat from '../components/BusSeat';

import ResetPassword from '../User/ResetPassword';
import Ticket_Detail from '../Ticket/Ticket_Detail';
import Ticket_Modify from '../Ticket/Ticket_Modify';
import Ticket_Cancel from '../Ticket/Ticket_Cancel';
import Bus from '../Ticket/Ticket_Book/Bus';
import Train from '../Ticket/Ticket_Book/Train';
import Airport from '../Ticket/Ticket_Book/Airport';
import NavLink1 from '../components/API/NavLink/NavLink1';
import NavLink2 from '../components/API/NavLink/NavLink2';
import NavLink3 from '../components/API/NavLink/NavLink3';
import NavLink4 from '../components/API/NavLink/NavLink4';
import NavLink5 from '../components/API/NavLink/NavLink5';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import TicketBookRouter from './TicketBookRouter';
import TicketRouter from './TicketRouter';
import NavBarRouter from './NavBarRouter';
import UserRouter from './UserRouter';
import AdRouter from './AdRouter';


const Loading = <div className={'bg-purple-500'}>Loading</div>;
 const Home = lazy(() => import("../Home"));

const RootRouter = createBrowserRouter([
  {
      path    : '',
      element : <Suspense fallback={Loading}><Home/></Suspense>
      
  },

  // {
  //     path    : 'todo',
  //     element : <Suspense fallback={Loading}>0<TodoIndex/></Suspense>,
  //     children: todoRouter()
  // },



  //계정 (user)

  {
         path    : 'user',
        // element : <Suspense fallback={Loading}>0<Login/></Suspense>,
        children: UserRouter()
  },


//   {
//     path    : '/Login',
//     element : <Login/>
//   },
//   {
//     path    : '/Signup',
//     element : <Suspense fallback={Loading}><Signup/></Suspense>
// },
// {
//     path    : '/MyPage',
//     element : <Suspense fallback={Loading}><MyPage/></Suspense>
// },
// {
//     path    : 'FindUserId',
//     element : <FindUserId/>
//     //children: todoRouter()
// },

// {
//   path    : '/MyPageModify',
//   element : <Suspense fallback={Loading}><MyPageModify/></Suspense>
// },
// {
//   path    : 'FindUserId',
//   element : <FindUserId/>
// },

// {
// path    : 'ResetPassword',
// element : <ResetPassword/>
// },



//이동수단 예약 (ticketBook)

  
{
path    : 'ticketbook',
//element : <Suspense fallback={Loading}>0<Bus/></Suspense>,
//element 주석하니까 페이지 이동됨
children: TicketBookRouter()
},

// {
// path    : '/bus',
// element : <Suspense fallback={Loading}><Bus/></Suspense>
// },
// {
// path    : '/train',
// element : <Suspense fallback={Loading}><Train/></Suspense>
// },
// {
// path    : '/airport',
// element : <Suspense fallback={Loading}><Airport/></Suspense>
// },


//티켓  (ticket)

{
  path    : 'ticket',
  //element : <Suspense fallback={Loading}>0<Ticket_Detail/></Suspense>,
  children: TicketRouter()
  },

// {
// path    : '/Ticket_Detail',
// element : <Suspense fallback={Loading}><Ticket_Detail/></Suspense>
// },
// {
// path    : '/Ticket_Modify',
// element : <Suspense fallback={Loading}><Ticket_Modify/></Suspense>
// },

// {
// path    : '/Ticket_Cancel',
// element : <Suspense fallback={Loading}><Ticket_Cancel/></Suspense>
// },

//네비게이션바 링크 (nav)



{
  path    : 'nav',
  //element : <Suspense fallback={Loading}><Home /></Suspense>,
  children : NavBarRouter()
},

// {
// path    : '/navLink1',
// element : <Suspense fallback={Loading}><NavLink1/></Suspense>
// },
// {
// path    : '/navLink2',
// element : <Suspense fallback={Loading}><NavLink2/></Suspense>
// },

// {
// path    : '/navLink3',
// element : <Suspense fallback={Loading}><NavLink3/></Suspense>
// },
// {
// path    : '/navLink4',
// element : <Suspense fallback={Loading}><NavLink4/></Suspense>
// },
// {
// path    : '/navLink5',
// element : <Suspense fallback={Loading}><NavLink5/></Suspense>
// },



{
  path    : 'ad',
  children : AdRouter()
},


]);

export default RootRouter;









// import { Routes, Route } from 'react-router-dom';
// import Home from '@/Home';

// {/*루트 라우터*/}
// const HomeRouter = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//     </Routes>
//   );
// };

// export default HomeRouter;
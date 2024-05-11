import { Routes, Route } from 'react-router-dom';

import { Suspense } from 'react';
import Ticket_Detail from '../Ticket/Ticket_Detail';
import Ticket_Modify from '../Ticket/Ticket_Modify';
import Ticket_Cancel from '../Ticket/Ticket_Cancel';
// import TicketBookingPage from '../Ticket/Ticket_Book/TicketBookingPage';


{/*티켓 정보 조회,수정,취소 라우터*/}

const Loading = <div className={'bg-purple-500'}>Loading</div>;
// const TodoList = lazy(() => import("../pages/todo/ListPage"));
// const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
// const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));

const TicketRouter = () => {
  return [
  //   {
  //     path    : '',   //           todo/ 요청이오면 todo/list로 redirection@@@@@@@@@@@
  //     element:<Navigate replace={true} to={'list'}></Navigate>,
  // },

    {
path    : 'ticket_detail',
element : <Suspense fallback={Loading}><Ticket_Detail/></Suspense>
},
{
path    : 'ticket_modify',
element : <Suspense fallback={Loading}><Ticket_Modify/></Suspense>
},

{
path    : 'ticket_cancel',
element : <Suspense fallback={Loading}><Ticket_Cancel/></Suspense>
},

    // <Routes>
    //   <Route path="/Ticket_Detail" element={<TicketDetail />} />
    //   <Route path="/Ticket_Modify" element={<TicketModify />} />
    //   <Route path="/Ticket_Cancel" element={<TicketCancel />} />
    // </Routes>
 ]
};

export default TicketRouter;
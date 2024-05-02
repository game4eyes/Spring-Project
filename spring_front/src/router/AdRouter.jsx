import { Routes, Route } from 'react-router-dom';

import { Suspense } from 'react';
import Ticket_Detail from '../Ticket/Ticket_Detail';
import Ticket_Modify from '../Ticket/Ticket_Modify';
import Ticket_Cancel from '../Ticket/Ticket_Cancel';
import Ad from '../components/Ad';


{/*광고 배열 라우터*/}

const Loading = <div className={'bg-purple-500'}>Loading</div>;
// const TodoList = lazy(() => import("../pages/todo/ListPage"));
// const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
// const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));

const AdRouter = () => {
  return [

  // 강의자료   
  //   {
  //     path    : '',   // todo/ 요청이오면 todo/list로 redirection
  //     element:<Navigate replace={true} to={'list'}></Navigate>,
  // },

    {
path    : 'ad1',        // /ad/ad1
element : <Suspense fallback={Loading}><Ad/></Suspense>
},
{
path    : 'ad2',        // /ad/ad2
element : <Suspense fallback={Loading}><Ad/></Suspense>
},

{
path    : 'ad3',        // /ad/ad3
element : <Suspense fallback={Loading}><Ad/></Suspense>
},
    // <Routes>
    //   <Route path="/Ticket_Detail" element={<TicketDetail />} />
    //   <Route path="/Ticket_Modify" element={<TicketModify />} />
    //   <Route path="/Ticket_Cancel" element={<TicketCancel />} />
    // </Routes>
 ]
};

export default AdRouter;
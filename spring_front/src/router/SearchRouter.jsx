import { Routes, Route } from 'react-router-dom';

import { Suspense } from 'react';
import Ticket_Detail from '../Ticket/Ticket_Detail';
import Ticket_Modify from '../Ticket/Ticket_Modify';
import Ticket_Cancel from '../Ticket/Ticket_Cancel';
import SearchBus from '../components/search/SearchBus';


{/*티켓 교통 정보 검색 라우터*/}

const Loading = <div className={'bg-purple-500'}>Loading</div>;
// const TodoList = lazy(() => import("../pages/todo/ListPage"));
// const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
// const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));

const SearchRouter = () => {
  return [
  //   {
  //     path    : '',   // todo/ 요청이오면 todo/list로 redirection
  //     element:<Navigate replace={true} to={'list'}></Navigate>,
  // },

    {
path    : 'searchbus',    // /search/searchbus
element : <Suspense fallback={Loading}><SearchBus/></Suspense>
},
{
path    : 'searchtrain',    // /search/searchtrain
element : <Suspense fallback={Loading}><Ticket_Modify/></Suspense>
},

{
path    : 'searchairport',    // //search/searchairport
element : <Suspense fallback={Loading}><Ticket_Cancel/></Suspense>
},
    // <Routes>
    //   <Route path="/Ticket_Detail" element={<TicketDetail />} />
    //   <Route path="/Ticket_Modify" element={<TicketModify />} />
    //   <Route path="/Ticket_Cancel" element={<TicketCancel />} />
    // </Routes>
 ]
};

export default SearchRouter;
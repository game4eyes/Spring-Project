import { Routes, Route } from 'react-router-dom';
import Bus from '../Bus/Ticket/Bus';
import Train from '../Train/Ticket/Train';
import { Suspense } from 'react';
import Plane from '../Plane/Ticket/Plane';
import BookResult from '../User/BookResult';


// import TicketBookingPage from '../Ticket/Ticket_Book/TicketBookingPage';



// {/*티켓 예약 라우터  : 버스, 기차, 공항 선택*/}


const Loading = <div className={'bg-purple-500'}>Loading</div>;
// const TodoList = lazy(() => import("../pages/todo/ListPage"));
// const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
// const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));



const TicketBookRouter = () => {
  return [

 {
path    : 'bus',    //   /ticketbook/bus
element : <Suspense fallback={Loading}>{<Bus/>}</Suspense>
},
{
path    : 'train',  //  /ticketbook/train
element : <Suspense fallback={Loading}>{<Train/>}</Suspense>
},
{
path    : 'plane',  //  /ticketbook/plane
element : <Suspense fallback={Loading}>{<Plane/>}</Suspense>
},
{
  path    : 'bookresult',  //  /ticketbook/bookresult
  element : <Suspense fallback={Loading}>{<BookResult/>}</Suspense>
  },



// {
//   path    : 'ticket_ticketbookingpage',
//   element : <Suspense fallback={Loading}><TicketBookingPage/></Suspense>       @@@@@@@@@@@@@@@@@@@@ useNavigate 쓸 수 있을 때 여기로 이동시키자
//   },
    
  ]

  // <Routes>
  //     <Route path="bus" element={<Bus />} />
  //     <Route path="train" element={<Train />} />
  //     <Route path="plane" element={<Plane />} />
  //   </Routes>
};

export default TicketBookRouter;
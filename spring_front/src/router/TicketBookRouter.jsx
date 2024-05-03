import { Routes, Route } from 'react-router-dom';
import Bus from '../Ticket/Ticket_Book/Bus';
import Train from '../Ticket/Ticket_Book/Train';
import Airport from '../Ticket/Ticket_Book/Airport';
import { Suspense } from 'react';



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
path    : 'airport',  //  /ticketbook/airport
element : <Suspense fallback={Loading}>{<Airport/>}</Suspense>
},
    
  ]

  // <Routes>
  //     <Route path="bus" element={<Bus />} />
  //     <Route path="train" element={<Train />} />
  //     <Route path="airport" element={<Airport />} />
  //   </Routes>
};

export default TicketBookRouter;
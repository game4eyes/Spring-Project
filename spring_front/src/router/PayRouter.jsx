//import { Routes, Route } from 'react-router-dom';
import Login from '../User/Login';
import Join from '../User/Join';
import MyPage from '../User/Mypage';
import ResetPassword from '../User/ResetPassword';
import { Suspense } from 'react';
import FindUserId from '../User/FindUserId';
import MyPageModify from '../User/MypageModify';
import ResultPage from '../components/ResultPage';
import Pay from '../pay/Pay';
import Charge from '../components/Charge';



const Loading = <div className={'bg-purple-500'}>Loading</div>;
// const TodoList = lazy(() => import("../pages/todo/ListPage"));
// const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
// const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));


{/*결제 라우터  (부모 URI :/ )   */ }
const PayRouter = () => {
  return [

  {
    path    : 'pay',     //   '/pay/pay
    element : <Suspense fallback={Loading}><Pay/></Suspense>,
  },
 
  
  {
    path    : 'paysuccess',     //   '/pay/paysuccess
    element : <Suspense fallback={Loading}><ResultPage result={"결제가 완료되었습니다"} /></Suspense>,
  },
 
  
  {
    path    : 'payfail',     //   '/pay/payfail
    element : <Suspense fallback={Loading}><ResultPage result={"결제가 실패되었습니다"} /></Suspense>,
  },
 
  {           //버스 수수료 정보 페이지
    path    : 'chargeinfo/bus',     //   '/pay/chargeinfo/bus/
    element : <Suspense fallback={Loading}><Charge id ={1}/></Suspense>,
  },
  {           //기차 수수료 정보 페이지
    path    : 'chargeinfo/train',     //   '/pay/chargeinfo/train/
    element : <Suspense fallback={Loading}><Charge id ={2}/></Suspense>,
  },
    {           //비행기 수수료 정보 페이지
    path    : 'chargeinfo/plane',     //   '/pay/chargeinfo/plane/
    element : <Suspense fallback={Loading}><Charge id ={3}/></Suspense>,
  },
  ]
};

export default PayRouter;
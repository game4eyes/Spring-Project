//import { Routes, Route } from 'react-router-dom';
import Login from '../User/Login';
import Join from '../User/Join';
import MyPage from '../User/Mypage';
import ResetPassword from '../User/ResetPassword';
import { Suspense } from 'react';
import FindUserId from '../User/FindUserId';
import MyPageModify from '../User/MypageModify';
import UserRouter from './UserRouter';



const Loading = <div className={'bg-purple-500'}>Loading</div>;
// const TodoList = lazy(() => import("../pages/todo/ListPage"));
// const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
// const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));


{/*계정 라우터  (부모 URI :/user )   */ }
const ApiRouter = () => {
  return [

    {
      path    : 'user',
     // element : <Suspense fallback={Loading}>0<Login/></Suspense>,
     children: UserRouter()
},

    // <Routes>
    //   <Route path="/user/Login" element={<Login />} />
    //   <Route path="/user/Join" element={<Join />} />
    //   <Route path="/user/MyPage" element={<MyPage />} />
    //   <Route path="/user/FindUserId" element={<FindUserId />} />
    //   <Route path="/user/ResetPassword" element={<ResetPassword />} />
    // </Routes>
  ]
};

export default ApiRouter;
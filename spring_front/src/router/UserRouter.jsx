//import { Routes, Route } from 'react-router-dom';
import Login from '../User/Login';
import Join from '../User/Join';
import ResetPassword from '../User/ResetPassword';
import { Suspense } from 'react';
import FindUserId from '../User/FindUserId';
import MyPageModify from '../User/MypageModify';
import Mypage from '../User/Mypage';




const Loading = <div className={'bg-purple-500'}>Loading</div>;
// const TodoList = lazy(() => import("../pages/todo/ListPage"));
// const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
// const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));


{/*계정 라우터  (부모 URI :/user )   */ }
const UserRouter = () => {
  return [

  {
    path    : 'login',     //   '/api/user/login'
    element : <Suspense fallback={Loading}><Login/></Suspense>,
  },
  {
    path    : 'join',         //   '/api/user/join'
    element : <Suspense fallback={Loading}><Join/></Suspense>
},
{
    path    : 'mypage',          //   '/api/user/mypage'
    element : <Suspense fallback={Loading}><Mypage/></Suspense>
},
{
    path    : 'finduserid',     //   '/api/user/finduserid'
    element : <FindUserId/>
    //children: todoRouter()
},

{
  path    : 'mypagemodify',
  element : <Suspense fallback={Loading}><MyPageModify/></Suspense>
},
// {
//   path    : 'FindUserId',
//   element : <FindUserId/>
// },

{
path    : 'resetpassword',
element : <ResetPassword/>
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

export default UserRouter;
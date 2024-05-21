
import React from 'react';

import {BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import RootRouter from './router/RootRouter';
//import { AuthContext } from './User/AuthContext';

// import HomeRouter from './router/RootRouter';
// import AccountRouter from './router/AccountRouter';
// import TicketBookRouter from './router/TicketBookRouter';
// import TicketRouter from './router/TicketRouter';
// import NavBarRouter from './router/NavBarRouter';



const App = () => {
  return (
    
   // <AuthContext>          {/* 로그인 상태 전역 context 추가 */}
    <RouterProvider router={RootRouter} />
   // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<HomeRouter />} />
    //     <Route path="/account/*" element={<AccountRouter />} />
    //     <Route path="/transportation/*" element={<TicketBookRouter />} />
    //     <Route path="/ticket/*" element={<TicketRouter />} />
    //     <Route path="/navigation/*" element={<NavBarRouter />} />
    //   </Routes>
    // </BrowserRouter> */}
   // </AuthContext>
  )
};
export default App;
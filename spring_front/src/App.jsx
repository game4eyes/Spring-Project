
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import RootRouter from './router/RootRouter';

// import HomeRouter from './router/RootRouter';
// import AccountRouter from './router/AccountRouter';
// import TicketBookRouter from './router/TicketBookRouter';
// import TicketRouter from './router/TicketRouter';
// import NavBarRouter from './router/NavBarRouter';



const App = () => {
  return (

    <RouterProvider router={RootRouter}/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<HomeRouter />} />
    //     <Route path="/account/*" element={<AccountRouter />} />
    //     <Route path="/transportation/*" element={<TicketBookRouter />} />
    //     <Route path="/ticket/*" element={<TicketRouter />} />
    //     <Route path="/navigation/*" element={<NavBarRouter />} />
    //   </Routes>
    // </BrowserRouter>
  )
};
export default App
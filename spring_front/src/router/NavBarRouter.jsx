import { Routes, Route } from 'react-router-dom';
import NavLink1 from '../components/API/NavLink/NavLink1';
import NavLink2 from '../components/API/NavLink/NavLink2';
import NavLink3 from '../components/API/NavLink/NavLink3';
import NavLink4 from '../components/API/NavLink/NavLink4';
import NavLink5 from '../components/API/NavLink/NavLink5';
import { Suspense } from 'react';



const Loading = <div className={'bg-purple-500'}>Loading</div>;
// const TodoList = lazy(() => import("../pages/todo/ListPage"));
// const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
// const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));


{/*네비바 라우터*/}
const NavBarRouter = () => {
  return [

    {
path    : 'navlink1',             //  '/nav/navlink1'
element : <Suspense fallback={Loading}><NavLink1/></Suspense>
},
{
path    : 'navlink2',             // ' /nav/navlink2'
element : <Suspense fallback={Loading}><NavLink2/></Suspense>
},

{
path    : 'navlink3',             //  'nav/navlink3'
element : <Suspense fallback={Loading}><NavLink3/></Suspense>
},
{
path    : 'navlink4',             // 'nav/navlink4'
element : <Suspense fallback={Loading}><NavLink4/></Suspense>
},
{
path    : 'navlink5',             //  'nav/navlink5'
element : <Suspense fallback={Loading}><NavLink5/></Suspense>
},

    // <Routes>
    //   <Route path="/nav/navLink1" element={<NavLink1 />} />
    //   <Route path="nav/navLink2" element={<NavLink2 />} />
    //   <Route path="/nav/navLink3" element={<NavLink3 />} />
    //   <Route path="/nav/navLink4" element={<NavLink4 />} />
    //   <Route path="/nav/navLink5" element={<NavLink5 />} />
    // </Routes>
    ]
};

export default NavBarRouter;

import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import RootRouter from './router/RootRouter';


// const App = () => {
  
//   return (
    
//     <RouterProvider router={RootRouter} />

//   )
// };
// export default App;


// import React, { useState, useEffect } from 'react';
import '@/css/Loading.css'; // Adjust the import path

const LoadingOverlay = () => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
    </div>
);

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading process
        setTimeout(() => {
            setIsLoading(false);
        }, 1200);
    }, []);

    return (
        <div>
            {isLoading && <LoadingOverlay />}
            <RouterProvider router={RootRouter} />
        
        </div>
    );
};

export default App;


import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import RootRouter from './router/RootRouter';


const App = () => {
  
  return (
    
    <RouterProvider router={RootRouter} />

  )
};
export default App;
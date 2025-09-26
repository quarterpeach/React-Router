import React from 'react';

import Navbar from './components/NavBar';
import ProductPages from './pages/ProductPages';
import { RouterProvider } from 'react-router';
import AboutPages from './pages/AboutPage';
import HomePages from './pages/HomePages';
import router from './router';

function App() {
  return (
    <>
   <RouterProvider router={router} />
   
  

  </>
  )
}

export default App;
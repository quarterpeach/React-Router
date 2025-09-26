import { createBrowserRouter } from "react-router";
import HomePages from "../pages/HomePages";
import AboutPages from "../pages/AboutPage";
import   Layout from "../components/Layout";
import ProductPages from "../pages/ProductPages";
 
const router = createBrowserRouter([
    
    {path:"/", element: <Layout/> ,children:[
    {index: true  ,element:<HomePages />},
    {path:"/product", element:<ProductPages />} ,
    {path:"/about" , element:<AboutPages/>}

  
]},
    
      
],
{ basename:"/React-Router",}
);

export default router;
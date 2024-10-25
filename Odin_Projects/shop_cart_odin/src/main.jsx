import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from "./components/Home";
import ShopCart from "./components/ShopCart";
import Cart from "./components/Cart";
import './style.css'
import ErrorPage from './components/ErrorPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
  element: <Home/>,
  errorElement :<ErrorPage/>,
  children: [{path: "ShopCart",element: <ShopCart/>}]

},
{
  path: "/cart",
element: <Cart/>

},
{
  path: "/ShopCart",
 element: <ShopCart/>,


}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

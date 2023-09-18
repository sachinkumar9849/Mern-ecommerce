import React from "react";
import Home from "./page/Home";
import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup"
import "./App.css";
import Checkout from "./page/Checkout";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from "./features/cart/Cart";
import ProductDetail from "./features/product/components/ProductDetail";
import Protected from "./features/auth/components/Protected";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },

  {
    path: "/cart",
    element:<Protected><Cart></Cart></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>,
  },
  {
    path: "/product-detail/:id",
    element:  <Protected><ProductDetail></ProductDetail></Protected>,
  },
]);

const App = () => {
  return (
    <div>
      
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

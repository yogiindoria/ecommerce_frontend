import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Login } from "./features/auth/component/Login";
import { Signup } from "./features/auth/component/Signup";
import CartPage from "./pages/CartPage";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Checkout from "./pages/Checkout";
import ProductDetailpage from "./pages/ProductDetailpage";
import Protected from "./features/auth/component/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, selectUserChecked } from "./features/auth/authSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import PageNotFound from "./pages/404";
import SignupPage from "./pages/SignupPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./features/auth/component/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminHome from "./pages/AdminHome";
import ProtectedAdmin from "./features/auth/component/ProtectedAdmin";
import AdminProductDetailpage from "./pages/AdminProductDetailPage";
import ProductFormpage from "./pages/ProductFromPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import LoginPage from "./pages/LoginPage";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};


const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailpage></AdminProductDetailpage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form-page",
    element: <ProtectedAdmin><ProductFormpage></ProductFormpage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form-page/edit/:id",
    element: <ProtectedAdmin><ProductFormpage></ProductFormpage></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>,
  },
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailpage></ProductDetailpage>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
  {
    path: "/order-success/:id",
    element: <Protected><OrderSuccessPage></OrderSuccessPage></Protected>
  },
  {
    path: "/orders",
    element: <Protected><UserOrderPage></UserOrderPage></Protected>
  }, 
  {
    path: "/profile",
    element: <Protected><UserProfilePage></UserProfilePage></Protected>
  }, 
  {
    path: "/logout",
    element: <Logout></Logout>
  }, 
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>
  }, 
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);
 
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch, user])
 
  return (
    <div className="App">
        <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
        </Provider>
    </div>
  );
}

export default App;

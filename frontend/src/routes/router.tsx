import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/Notfound/Notfound";
import Users from "../pages/Users/Users";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Orders from "../pages/Orders/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;

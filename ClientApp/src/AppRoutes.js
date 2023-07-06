import Account from "./components/Account";
import Admin from "./components/Admin";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";
import Register from "./components/Register";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
    {
        path: '/api/products/:id',
        element: <ProductDetails />
    },
    {
        path: '/api/account',
        element: <Account />
    },
    {
        path: '/api/admin',
        element: <Admin />
    },
    {
        path: '/cart',
        element: <Cart />
    }
];

export default AppRoutes;

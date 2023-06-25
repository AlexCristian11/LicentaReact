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
    }
];

export default AppRoutes;

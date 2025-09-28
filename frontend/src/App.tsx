import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Layout from "./components/layout/Layout";
import Categories from "./components/Categories";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminHome from "./admin/pages/AdminHome";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminAddProduct from "./admin/pages/AdminAddProduct";
import AdminNewProduct from "./admin/pages/AdminNewProduct";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/products" element={<AdminAddProduct />} />
        <Route path="/admin/products/add" element={<AdminNewProduct />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/*" element={<Product />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Route>
    </Routes>
  );
}

export default App;

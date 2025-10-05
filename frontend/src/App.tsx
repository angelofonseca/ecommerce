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
import AdminLayout from "./admin/layout/AdminLayout";
import AdminProduct from "./admin/pages/AdminProduct";
import AdminNewProduct from "./admin/pages/AdminNewProduct";
import AdminEditProduct from "./admin/pages/AdminEditProduct";
import AdminCategory from "./admin/pages/AdminCategory";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminBrand from "./admin/pages/AdminBrand";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProduct />} />
        <Route path="/admin/products/add" element={<AdminNewProduct />} />
        <Route path="/admin/products/edit/:id" element={<AdminEditProduct />} />
        <Route path="/admin/categories" element={<AdminCategory />} />
        <Route path="/admin/brands" element={<AdminBrand />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
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

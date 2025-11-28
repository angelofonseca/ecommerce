import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Layout from "./components/layout/Layout";
import Categories from "./components/Categories";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminProduct from "./admin/pages/AdminProduct";
import AdminNewProduct from "./admin/pages/AdminNewProduct";
import AdminEditProduct from "./admin/pages/AdminEditProduct";
import AdminCategory from "./admin/pages/AdminCategory";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminBrand from "./admin/pages/AdminBrand";
import AdminBackup from "./admin/pages/AdminBackup";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProduct />} />
        <Route path="products/add" element={<AdminNewProduct />} />
        <Route path="products/edit/:id" element={<AdminEditProduct />} />
        <Route path="categories" element={<AdminCategory />} />
        <Route path="brands" element={<AdminBrand />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="backup" element={<AdminBackup />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/*" element={<Product />} />
        <Route path="categories" element={<Categories />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<CheckoutSuccess />} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Signin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;

import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { HomeProvider } from "./context/HomeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <HomeProvider>
            <App />
          </HomeProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
);

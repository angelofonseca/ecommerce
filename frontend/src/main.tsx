import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import { HomeProvider } from "./context/HomeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ShopProvider>
        <HomeProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </HomeProvider>
      </ShopProvider>
    </AuthProvider>
  </BrowserRouter>
);

import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon/CartIcon";

import { useAuthContext } from "@/context/AuthContext";
import { useShopContext } from "@/context/ShopContext";

function Header() {
  const navigate = useNavigate();
  const { login, handleLogout } = useAuthContext();
  const { setRefreshHome, setSelectedCategory } = useShopContext();

  const handleHomeClick = async () => {
    setRefreshHome(true);
    setSelectedCategory(null);
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground shadow-2xl sticky top-0 z-50 border-b border-primary/20 backdrop-blur-lg">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              className="h-12 w-auto cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
              src={"/logo.png"}
              alt="logo"
              onClick={handleHomeClick}
            />
          </div>

          <div className="flex-1 max-w-3xl mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={handleHomeClick}
                className="text-sm font-medium hover:text-accent transition-colors duration-300 hover:scale-105 bg-transparent border-none cursor-pointer"
              >
                Início
              </button>
              {login ? (
                <>
                  <span className="text-sm font-medium mr-2">
                    Bem-vindo, {login.user.name}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium hover:text-accent transition-colors duration-300 hover:scale-105"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="text-sm font-medium hover:text-accent transition-colors duration-300 hover:scale-105"
                >
                  Login
                </NavLink>
              )}
            </nav>

            <div className="w-px h-6 bg-primary-foreground/20 hidden md:block"></div>

            <NavLink
              data-testid="shopping-cart-button"
              to="/cart"
              className="p-3 rounded-xl hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-110 relative group"
            >
              <CartIcon />
              <div className="absolute inset-0 rounded-xl bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

import { NavLink } from "react-router-dom";

import { useAuthContext } from "@/context/AuthContext";

function AdminHeader() {
  const { login, handleLogout } = useAuthContext();

  return (
    <header className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground shadow-2xl sticky top-0 z-50 border-b border-primary/20 backdrop-blur-lg">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              className="h-12 w-auto"
              src={"/logo.png"}
              alt="logo"
            />
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <h2>ADMIN</h2>
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
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminHeader;

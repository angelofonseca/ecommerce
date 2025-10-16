import { NavLink } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

function AdminHeader() {
  const { login, handleLogout } = useAuthContext();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg">
      <nav className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                <img
                  className="h-6 w-auto filter brightness-0 invert"
                  src={"/logo.png"}
                  alt="logo"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <p className="text-xs text-gray-500">
                  Sistema de Gerenciamento
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {login ? (
              <div className="flex items-center gap-4">

                <div className="hidden md:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                      {login.user.name}
                    </p>
                    <p className="text-xs text-gray-500">Administrador</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-semibold">
                      {login.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Sair do sistema"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden sm:inline text-sm font-medium">
                    Sair
                  </span>
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span className="text-sm font-medium">Login</span>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminHeader;

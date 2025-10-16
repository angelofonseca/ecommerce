import { NavLink } from "react-router-dom";
import { useState } from "react";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0M3 7l9-6 9 6M13 5h6v1a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z"
          />
        </svg>
      ),
      label: "Dashboard",
      path: "/admin/dashboard",
      description: "Visão geral",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      label: "Produtos",
      path: "/admin/products",
      description: "Gerenciar produtos",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
      label: "Categorias",
      path: "/admin/categories",
      description: "Gerenciar categorias",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h1a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      label: "Marcas",
      path: "/admin/brands",
      description: "Gerenciar marcas",
    },
  ];

  return (
    <>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-80 lg:w-full
          col-span-1 bg-white shadow-lg border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Painel Administrativo
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={
                  item.path === "/admin/products" ||
                  item.path === "/admin/dashboard"
                }
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-102"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`transition-all duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-blue-500"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-medium text-sm ${
                          isActive ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {item.label}
                      </div>
                      <div
                        className={`text-xs ${
                          isActive
                            ? "text-blue-100"
                            : "text-gray-500 group-hover:text-gray-600"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-white shadow-lg"
                          : "bg-transparent group-hover:bg-blue-500"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;

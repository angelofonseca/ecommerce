import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

function AdminLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    function verifyAdminRole(): void {
      const token = localStorage.getItem("login");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "ADMIN") {
          navigate("/admin");
          return;
        }
      }
      navigate("/admin/login");
    }
    verifyAdminRole();
  }, []);

  return (
    <>
      <AdminHeader />
      <main className="grid grid-cols-4 min-h-screen bg-gray-100">
        <aside className="col-span-1 bg-gray-400">
          <ol>
            <li>
              <NavLink to="/admin/products">Cadastro de Produtos</NavLink>
            </li>
            <li></li>
            <li></li>
            <li></li>
          </ol>
        </aside>
        <section className="col-span-3">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default AdminLayout;

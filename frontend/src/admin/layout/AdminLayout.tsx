import { NavLink, Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { useAdminAuth } from "@/hooks/useAdminAuth";

function AdminLayout() {
  useAdminAuth();

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

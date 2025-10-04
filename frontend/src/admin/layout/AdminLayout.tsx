import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";

function AdminLayout() {
  useAdminAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="lg:grid lg:grid-cols-4 min-h-[calc(100vh-64px)]">
        <AdminSidebar />
        <section className="lg:col-span-3 p-4 lg:p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AdminLayout;

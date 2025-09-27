import { AdminLoginForm } from "@/admin/components/AdminLoginForm";
function AdminLogin() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-700">
      <div className="w-full max-w-sm">
        <AdminLoginForm />
      </div>
    </div>
  )
}

export default AdminLogin;
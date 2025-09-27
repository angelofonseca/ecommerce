import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    function verifyAdminRole(): void {
      const token = localStorage.getItem("login");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log(payload.role)
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
      <Outlet />
    </>
  );
}

export default AdminLayout;

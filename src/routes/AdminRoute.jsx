import DashboardLoader from "@/components/Loader/DashboardLoader";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { Navigate } from "react-router";
import useRole from "@/hooks/useRole";
import { toast } from "sonner";

const AdminRoute = ({ children }) => {
  const loading = useAuthLoading();
  const [role, isLoading] = useRole();
  const user = useAuthUser();

  // Return Loader
  if (loading || isLoading) return <DashboardLoader />;

  // Return Children
  if (user && user.email && role === "administrator") return children;

  // !role !== "administrator" Navigate to dashboard
  return (
    <Navigate
      to={
        role === "pharmacist"
          ? "/dashboard/pharmacist-overview"
          : role === "patient"
          ? "/dashboard/patient-overview"
          : role === "receptionist"
          ? "/dashboard/receptionist-overview"
          : "/"
      }
    >
      {toast.error("You're not allowed to visit Admin routes!", {
        position: "top-right",
        duration: 2000,
      })}
    </Navigate>
  );
};

export default AdminRoute;

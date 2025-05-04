import DashboardLoader from "@/components/Loader/DashboardLoader";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { Navigate } from "react-router";
import useRole from "@/hooks/useRole";
import { toast } from "sonner";

const ReceptionistRoute = ({ children }) => {
  const loading = useAuthLoading();
  const [role, isLoading] = useRole();
  const user = useAuthUser();

  // Return Loader
  if (loading || isLoading) return <DashboardLoader />;

  // Return Children
  if (user && user.email && role === "receptionist") return children;

  // !role !== "receptionist" Navigate to dashboard
  return (
    <Navigate
      to={
        role === "administrator"
          ? "/dashboard/administrator-overview"
          : role === "patient"
          ? "/dashboard/patient-overview"
          : role === "pharmacist"
          ? "/dashboard/pharmacist-overview"
          : "/"
      }
    >
      {toast.error("You're not allowed to visit receptionist routes!", {
        position: "top-right",
        duration: 2000,
      })}
    </Navigate>
  );
};

export default ReceptionistRoute;

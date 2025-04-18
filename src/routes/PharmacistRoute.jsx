import DashboardLoader from "@/components/Loader/DashboardLoader";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { Navigate } from "react-router";
import useRole from "@/hooks/useRole";
import toast from "react-hot-toast";

const PharmacistRoute = ({ children }) => {
  const loading = useAuthLoading();
  const [role, isLoading] = useRole();
  const user = useAuthUser();

  // Return Loader
  if (loading || isLoading) return <DashboardLoader />;

  // Return Children
  if (user && user.email && role === "pharmacist") return children;

 

  // !role !== "pharmacist" Navigate to dashboard
  return (
    <Navigate
      to={
        role === "administrator"
          ? "/dashboard/administrator-overview"
          : role === "patient"
          ? "/dashboard/patient-overview"
          : role === "receptionist"
          ? "/dashboard/receptionist-overview"
          : "/"
      }>
        {toast.error("You're not allowed to visit Pharmacist route!")}
      </Navigate>

  );
};

export default PharmacistRoute;

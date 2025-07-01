import DashboardLoader from "@/components/Loader/DashboardLoader";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { Navigate } from "react-router";
import useRole from "@/hooks/useRole";
import { toast } from "sonner";

const PrivateRoute = ({ children }) => {
  const loading = useAuthLoading();
  const [, isLoading] = useRole();
  const user = useAuthUser();

  // Return Loader
  if (loading || isLoading) return <DashboardLoader />;

  // Return Children
  if (user && user.email) return children;

  // !user Navigate to login
  return (
    <Navigate to={"/login"}>
      {toast.error("Login Required", {
        description: "You must be logged in to access this page!",
        position: "top-right",
        duration: 3000,
      })}
    </Navigate>
  );
};

export default PrivateRoute;

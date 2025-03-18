import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const loading = useAuthLoading();
  const user = useAuthUser();

  if (loading) return "LOADING...";
  if (user && user.email) return children;

  return <Navigate to={"/login"} />;
};

export default PrivateRoute;

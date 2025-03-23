import { useAuthUser } from "@/redux/auth/authActions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const user = useAuthUser();

  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/role/${user?.email}`);
      return data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;

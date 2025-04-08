import { useAuthUser } from "@/redux/auth/authActions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePhone = () => {
  const user = useAuthUser();

  const { data: phoneNumber = "", isLoading } = useQuery({
    queryKey: ["phone-number", user?.uid],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/phone/${user?.uid}`
      );
      return data.phoneNumber;
    },
  });

  return [phoneNumber, isLoading];
};

export default usePhone;

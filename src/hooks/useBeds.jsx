import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBeds = ({ isActive }) => {
  const {
    data: beds = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["beds", isActive],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/beds?isActive=${isActive}`
      );
      return data;
    },
  });
  return [beds, isLoading, refetch];
};

export default useBeds;

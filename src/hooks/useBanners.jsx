import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBanners = ({ isActive }) => {
  const {
    data: banners = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pharmacy-banners", isActive],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/banners?isActive=${isActive}`
      );
      return data;
    },
  });
  return [banners, isLoading, refetch];
};

export default useBanners;

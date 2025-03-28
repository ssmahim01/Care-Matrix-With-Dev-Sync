import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useOrders = () => {
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/purchase/orders`
      );
      return data;
    },
  });
  return [orders, isLoading, refetch];
};

export default useOrders;

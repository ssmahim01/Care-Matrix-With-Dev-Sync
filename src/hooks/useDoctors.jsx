import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDoctors = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: doctors = [],
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        "/dashboard/administrator/doctors"
      );
      return data;
    },
  });

  return [doctors];
};

export default useDoctors;

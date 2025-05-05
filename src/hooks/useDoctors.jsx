import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDoctors = (search, selectedSort ) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: doctors = [],
    isPending,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["doctors", search, selectedSort],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/dashboard/administrator/doctors/all?search=${search}&sort=${selectedSort}`
      );
      return data;
    },
  });

  return [doctors, isLoading, refetch];
};

export default useDoctors;

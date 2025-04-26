import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBeds = () => {
  const {
    data: beds = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["beds"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/beds`);
      // console.log("Raw API Response:", data); // Debug: See all beds
      // Filter only "available" or "requested" beds
      const filteredBeds = data.filter(
        (bed) => bed.status === "available" || bed.status === "requested"
      );
      // console.log("Filtered Beds:", filteredBeds); // Debug: See filtered result
      return filteredBeds;
    },
  });

  return [beds, isLoading, refetch];
};

export default useBeds;
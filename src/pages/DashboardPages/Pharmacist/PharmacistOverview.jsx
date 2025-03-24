import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SectionCards from "./PharmacistOverview/SectionCards";

const PharmacistOverview = () => {
  const axiosPublic = useAxiosPublic();
  // Get Pharmacist-Stats
  const {
    data: stats = [],
    isloading,
    refetch,
  } = useQuery({
    queryKey: ["pharmacist-stats"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/pharmacist/stats`);
      return data;
    },
  });
  return (
    <div>
      <SectionCards
        totalBanners={stats?.totalBanners}
        totalActive={stats?.totalActive}
        totalInActive={stats?.totalInActive}
        totalMedicines={stats?.totalMedicines}
        totalInStockMedicines={stats?.totalInStockMedicines}
        totalLimitedStockMedicines={stats?.totalLimitedStockMedicines}
        totalOutOFStockMedicines={stats?.totalOutOFStockMedicines}
      />
    </div>
  );
};

export default PharmacistOverview;

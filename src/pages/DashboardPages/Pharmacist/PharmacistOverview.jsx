import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import CategoryChart from "./PharmacistOverview/categoryChart";
import ManufacturerChart from "./PharmacistOverview/ManufacturerChart";
import SectionCards from "./PharmacistOverview/SectionCards";
import SupplierChart from "./PharmacistOverview/SupplierChart";

const PharmacistOverview = () => {
  const axiosPublic = useAxiosPublic();

  // Get Pharmacist-Stats
  const {
    data: stats = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pharmacist-stats"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/pharmacist/stats`);
      return data;
    },
  });

  // Data For Charts
  const chartData =
    stats?.medicinesPerCategory?.map((item) => ({
      category: item.category,
      count: item.count,
    })) || [];

  const manufacturerChartData =
    stats?.medicinesPerManufacturer?.map((item) => ({
      manufacturer: item.manufacturer,
      count: item.count,
    })) || [];

  const supplierChartData =
    stats?.medicinesPerSupplier?.map((item) => ({
      supplier: item.supplier,
      count: item.count,
    })) || [];

  return (
    <div className="space-y-6 px-7">
      {/* Section Cards */}
      <SectionCards
        isLoading={isLoading}
        totalBanners={stats?.totalBanners}
        totalActive={stats?.totalActive}
        totalInActive={stats?.totalInActive}
        totalMedicines={stats?.totalMedicines}
        totalInStockMedicines={stats?.totalInStockMedicines}
        totalLimitedStockMedicines={stats?.totalLimitedStockMedicines}
        totalOutOFStockMedicines={stats?.totalOutOFStockMedicines}
        expiredCount={stats?.expiredCount}
        nearExpiryCount={stats?.nearExpiryCount}
      />
      {/* Category & Prescription Chart */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Medicines Per Category Chart */}
        <CategoryChart chartData={chartData} isLoading={isLoading} />
      </div>
      <div className="flex gap-6 items-center flex-col lg:flex-row w-full">
        {/* Medicines Per Manufacturer Chart */}
        <ManufacturerChart
          manufacturerChartData={manufacturerChartData}
          isLoading={isLoading}
        />
        {/* Medicines Per Supplier Chart */}
        <SupplierChart
          supplierChartData={supplierChartData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default PharmacistOverview;

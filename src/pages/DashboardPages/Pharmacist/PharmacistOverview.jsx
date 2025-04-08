import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import CategoryChart from "./PharmacistOverview/categoryChart";
import ManufacturerChart from "./PharmacistOverview/ManufacturerChart";
import SectionCards from "./PharmacistOverview/SectionCards";
import SupplierChart from "./PharmacistOverview/SupplierChart";
import { PrescriptionRequirementChart } from "./PharmacistOverview/PrescriptionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="lg:col-span-3 xl:col-span-2">
          <Card className="bg-white border border-gray-200 rounded-lg px-4 py-8 shadow-sm col-span-4">
            <CardHeader>
              {isLoading ? (
                <div className="skeleton h-8 w-48 mb-3"></div>
              ) : (
                <CardTitle className="text-2xl font-bold text-gray-700 mb-3">
                  Medicines Per Category
                </CardTitle>
              )}
            </CardHeader>
            <CardContent>
              <PrescriptionRequirementChart />
            </CardContent>
          </Card>
        </div>
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

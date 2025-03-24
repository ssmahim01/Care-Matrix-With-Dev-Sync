import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import SectionCards from "./PharmacistOverview/SectionCards";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CategoryChart from "./PharmacistOverview/categoryChart";
import ManufacturerChart from "./PharmacistOverview/ManufacturerChart";
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
    <div className="space-y-6 p-4 lg:p-6">
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
      />

      {/* Medicines Per Category Chart */}
      <CategoryChart chartData={chartData} />
      <div className="flex gap-6 items-center flex-col lg:flex-row w-full">
        {/* Medicines Per Manufacturer Chart */}
       <ManufacturerChart manufacturerChartData={manufacturerChartData} />
        {/* Medicines Per Supplier Chart */}
     <SupplierChart supplierChartData={supplierChartData} />
      </div>
    </div>
  );
};

export default PharmacistOverview;

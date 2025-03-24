import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SectionCards from "./PharmacistOverview/SectionCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Section Cards */}
      <SectionCards
        totalBanners={stats?.totalBanners}
        totalActive={stats?.totalActive}
        totalInActive={stats?.totalInActive}
        totalMedicines={stats?.totalMedicines}
        totalInStockMedicines={stats?.totalInStockMedicines}
        totalLimitedStockMedicines={stats?.totalLimitedStockMedicines}
        totalOutOFStockMedicines={stats?.totalOutOFStockMedicines}
      />

      {/* Medicines Per Category Chart */}
      <Card className="bg-white border border-gray-200 rounded-lg px-4 py-8 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-3">
            Medicines Per Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  bottom: 50,
                }}
              >
                <XAxis
                  dataKey="category"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  tick={{ fill: "#6B7280", fontSize: 12 }} // Gray-500
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }} // Gray-500
                  domain={[0, "auto"]}
                  allowDecimals={false}
                  tickCount={5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B", // Slate-800
                    border: "none",
                    borderRadius: "4px",
                    color: "#F3F4F6", // Gray-100
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar
                  dataKey="count"
                  fill="#64748B" // Slate-500
                  fillOpacity={0.5}
                  stroke="#64748B" // Slate-600
                  strokeWidth={1}
                  name="Medicine Count"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-6 items-center flex-col lg:flex-row w-full">
        {/* Medicines Per Manufacturer Chart */}
        <Card className="bg-white border w-full border-gray-200 rounded-lg px-4 py-8 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-3">
              Medicines Per Manufacturer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={manufacturerChartData}
                  margin={{
                    top: 20,
                    bottom: 80,
                  }}
                >
                  <XAxis
                    dataKey="manufacturer"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={60}
                    tick={{ fill: "#6B7280", fontSize: 12 }} // Gray-500
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 12 }} // Gray-500
                    domain={[0, "auto"]}
                    allowDecimals={false}
                    tickCount={5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B", // Slate-800
                      border: "none",
                      borderRadius: "4px",
                      color: "#F3F4F6", // Gray-100
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar
                    dataKey="count"
                    fill="#64748B" // Slate-500
                    fillOpacity={0.5}
                    stroke="#64748B" // Slate-600
                    strokeWidth={1}
                    name="Medicine Count"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        {/* Medicines Per Supplier Chart */}
        <Card className="bg-white border w-full border-gray-200 rounded-lg px-4 py-8 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-3">
              Medicines Per Supplier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={supplierChartData}
                  margin={{
                    top: 20,
                    bottom: 80,
                  }}
                >
                  <XAxis
                    dataKey="supplier"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={60}
                    tick={{ fill: "#6B7280", fontSize: 12 }} // Gray-500
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 12 }} // Gray-500
                    domain={[0, "auto"]}
                    allowDecimals={false}
                    tickCount={5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B", // Slate-800
                      border: "none",
                      borderRadius: "4px",
                      color: "#F3F4F6", // Gray-100
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar
                    dataKey="count"
                    fill="#64748B" // Slate-500
                    fillOpacity={0.5}
                    stroke="#64748B" // Slate-600
                    strokeWidth={1}
                    name="Medicine Count"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacistOverview;

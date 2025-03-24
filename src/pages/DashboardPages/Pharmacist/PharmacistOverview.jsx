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

  // Prepare data for Recharts
  const chartData =
    stats?.medicinesPerCategory?.map((item) => ({
      category: item.category,
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
      <Card className="bg-white border border-gray-200 rounded-lg px-4 py-7 shadow-sm">
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
                  right: 30,
                  left: 0,
                  bottom: 40,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0, 0, 0, 0.05)"
                />
                <XAxis
                  dataKey="category"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  tick={{ fill: "#4B5563", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "#4B5563", fontSize: 12 }}
                  domain={[0, "auto"]}
                  allowDecimals={false}
                  tickCount={5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "4px",
                    color: "#F3F4F6",
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar
                  dataKey="count"
                  fill="rgba(59, 130, 246, 0.5)"
                  stroke="rgba(59, 130, 246, 1)"
                  strokeWidth={1}
                  name="Medicine Count"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacistOverview;

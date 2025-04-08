import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip, { COLORS } from "./CustomTooltip";

const OrderVolumeChart = ({ enhancedRevenueData }) => {
  return (
    <Card className="col-span-4 border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base font-bold">
          Daily Order Volume
        </CardTitle>
        <CardDescription className="py-0 font-medium -mt-1">
          Number of items sold per day
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={enhancedRevenueData}>
            <defs>
              <linearGradient id="colorItems" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={COLORS.orders.primary}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={COLORS.orders.primary}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="formattedDate"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip valueSuffix=" items" />} />
            <Legend />
            <Bar
              dataKey="totalQty"
              name="Items Sold"
              fill="url(#colorItems)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OrderVolumeChart;

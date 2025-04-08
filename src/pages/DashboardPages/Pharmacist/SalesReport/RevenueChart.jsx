import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip, { COLORS } from "./CustomTooltip";

const RevenueChart = ({ enhancedRevenueData = [] }) => {
  return (
    <Card className="lg:col-span-4 xl:col-span-5 border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base font-bold">Revenue Trends</CardTitle>
        <CardDescription className="py-0 font-medium -mt-1">
          Daily revenue with average per item
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={enhancedRevenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={COLORS.revenue.primary}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={COLORS.revenue.primary}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={COLORS.items.primary}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={COLORS.items.primary}
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
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip content={<CustomTooltip valuePrefix="$" />} />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="totalRevenue"
              name="Total Revenue"
              stroke={COLORS.revenue.primary}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgItemValue"
              name="Avg Value Per Item"
              stroke={COLORS.items.primary}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

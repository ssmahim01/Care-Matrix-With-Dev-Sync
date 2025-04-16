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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "./CustomTooltip";

const TopSellingChart = ({ topSellingMedicines }) => {
  return (
    <Card className="col-span-3 border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base font-bold">
          Top Selling Medicines
        </CardTitle>
        <CardDescription className="py-0 font-medium -mt-1">
          Top 5 medicines by quantity sold
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={topSellingMedicines}
            layout="vertical"
            margin={{ top: 5, right: 30, left: -25, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorQty" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0%"
                  stopColor={COLORS.orders.primary}
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor={COLORS.orders.secondary}
                  stopOpacity={0.8}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis
              dataKey="medicine"
              type="category"
              width={100}
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip formatter={(value) => [value, "Quantity Sold"]} />
            <Bar
              dataKey="totalQty"
              name="Quantity Sold"
              fill="url(#colorQty)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TopSellingChart;

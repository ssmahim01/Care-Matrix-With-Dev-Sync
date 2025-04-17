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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "../../Pharmacist/SalesReport/CustomTooltip";

const RevenueByDateChart = ({ chartData }) => {
  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Revenue By Dates
        </CardTitle>
        <CardDescription className="text-gray-600">
          Revenue chart with average per item
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          {" "}
          <AreaChart
            width={730}
            height={250}
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="colorAppointments"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip valueSuffix=" items" />} />
            <Area
              type="monotone"
              dataKey="totalRevenue"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Total Revenue"
            />
            <Area
              type="monotone"
              dataKey="appointments"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorAppointments)"
              name="Appointments"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueByDateChart;

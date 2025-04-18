import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CustomTooltip from "../../Pharmacist/SalesReport/CustomTooltip";

const pastelColors = [
  "#DBEAFE", // Blue 100
  "#BFDBFE", // Blue 200
  "#93C5FD", // Blue 300
  "#60A5FA", // Blue 400
  "#3B82F6", // Blue 500
  "#2563EB", // Blue 600
  "#1D4ED8", // Blue 700
  "#1E40AF", // Blue 800
  "#1E3A8A", // Blue 900
  "#38BDF8", // Sky 400
  "#0EA5E9", // Sky 500
  "#0284C7", // Sky 600
  "#0369A1", // Sky 700
  "#075985", // Sky 800
  "#0C4A6E", // Sky 900
  "#DDD6FE", // Purple 200
  "#C4B5FD", // Purple 300
  "#A78BFA", // Purple 400
  "#8B5CF6", // Purple 500
  "#7C3AED", // Purple 600
  "#6D28D9", // Purple 700
  "#5B21B6", // Purple 800
  "#4C1D95", // Purple 900
  "#C7D2FE", // Indigo 200
  "#A5B4FC", // Indigo 300
  "#818CF8", // Indigo 400
  "#6366F1", // Indigo 500
  "#4F46E5", // Indigo 600
  "#4338CA", // Indigo 700
  "#3730A3", // Indigo 800
  "#312E81", // Indigo 900
];

const assignRandomColors = (data) => {
  return data.map((item) => ({
    ...item,
    fill: pastelColors[Math.floor(Math.random() * pastelColors.length)],
  }));
};

const DoctorChart = ({ doctorData }) => {
  const data = assignRandomColors(doctorData);
  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Top 5 Doctors By Total Revenue
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Visualize the highest-earning doctors based on successful appointments
          and total revenue generated.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="w-full h-[180px]">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 50, left: 15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="doctor"
                type="category"
                tick={{ fontSize: 14 }}
                width={150}
              />
              <Tooltip
                content={<CustomTooltip formatter={(value) => `$${value}`} />}
              />
              <Bar
                dataKey="totalRevenue"
                isAnimationActive
                radius={[0, 8, 8, 0]}
              >
                <LabelList
                  dataKey="totalRevenue"
                  position="right"
                  formatter={(value) => `$${value}`}
                  className="text-sm font-medium"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorChart;

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
  "#87CEEB", // Sky Blue
  "#4682B4", // Steel Blue
  "#5F9EA0", // Cadet Blue
  "#0000FF", // Blue
  "#1E90FF", // Dodger Blue
  "#6A5ACD", // Slate Blue
  "#7B68EE", // Medium Slate Blue
  "#8A2BE2", // Blue Violet
  "#4B0082", // Indigo
  "#800080", // Purple
  "#9B30FF", // Purple
  "#6A0DAD", // Purple
  "#9370DB", // Medium Purple
  "#483D8B", // Dark Slate Blue
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

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

const SupplierChart = ({ supplierChartData }) => {
  return (
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
  );
};

export default SupplierChart;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CategoryChart = ({ chartData, isLoading }) => {
  return (
    <Card className="bg-white border border-gray-200 rounded-lg px-4 py-8 shadow-sm">
      <CardHeader>
        {isLoading ? (
          <div className="skeleton h-8 w-48 mb-3"></div>
        ) : (
          <CardTitle className="text-2xl font-bold mb-3">
            Medicines Per Category
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex justify-between items-baseline gap-8">
                <div className="skeleton h-48 w-full"></div>
                <div className="skeleton h-40 w-full"></div>
                <div className="skeleton h-44 w-full"></div>
                <div className="skeleton h-36 w-full"></div>
                <div className="skeleton h-48 w-full"></div>
                <div className="skeleton h-52 w-full"></div>
                <div className="skeleton h-32 w-full"></div>
              </div>
              <div className="flex justify-between gap-8">
                <div className="skeleton h-4 w-20 mt-6 -rotate-45"></div>
                <div className="skeleton h-4 w-20 mt-6 -rotate-45"></div>
                <div className="skeleton h-4 w-20 mt-6 -rotate-45"></div>
                <div className="skeleton h-4 w-20 mt-6 -rotate-45"></div>
                <div className="skeleton h-4 w-20 mt-6 -rotate-45"></div>
                <div className="skeleton h-4 w-20 mt-6 -rotate-45"></div>
                <div className="skeleton h-4 w-20 mt-6 -rotate-45"></div>
              </div>
            </div>
          ) : (
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
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  domain={[0, "auto"]}
                  allowDecimals={false}
                  tickCount={5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "none",
                    borderRadius: "4px",
                    color: "#F3F4F6",
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar
                  dataKey="count"
                  fill="#64748B"
                  fillOpacity={0.5}
                  stroke="#64748B"
                  strokeWidth={1}
                  name="Medicine Count"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default CategoryChart;

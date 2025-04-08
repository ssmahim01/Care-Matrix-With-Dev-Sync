import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CategoryChart = ({ chartData, isLoading }) => {
  return (
    <Card className="bg-white border border-gray-200 rounded-lg px-4 py-8 shadow-sm lg:col-span-4 xl:col-span-5">
      <CardHeader>
        {isLoading ? (
          <div className="skeleton h-8 w-48 mb-3"></div>
        ) : (
          <CardTitle className="text-2xl font-bold text-gray-700 mb-3">
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
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: -20, bottom: 45 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="category"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    value.length > 10 ? `${value.slice(0, 30)}...` : value
                  }
                />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <Card className="p-2 rounded border shadow-sm bg-background">
                          <div className="text-sm font-medium">
                            {payload[0].payload.category}
                          </div>
                          <div className="text-sm text-muted-foreground -mt-5">
                            Count: {payload[0].value}
                          </div>
                        </Card>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default CategoryChart;

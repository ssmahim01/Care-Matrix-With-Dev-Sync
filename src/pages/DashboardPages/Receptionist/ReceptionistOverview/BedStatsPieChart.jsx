import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BedStatsPieChart = ({ bedStatusBreakdown }) => {
  // Colors for Pie Charts
  const COLORS = ["#3B82F6", "#facc15", "#ef4444", "#3b82f6"];
  return (
    <Card className="lg:col-span-3 xl:col-span-4 border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle>Bed Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={bedStatusBreakdown}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              paddingAngle={3}
              fill="#82ca9d"
              label
            >
              {bedStatusBreakdown.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BedStatsPieChart;

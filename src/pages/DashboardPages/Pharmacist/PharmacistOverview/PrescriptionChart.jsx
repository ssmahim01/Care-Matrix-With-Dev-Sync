import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444"];

const transformData = (data) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((entry, index) => ({
    ...entry,
    name: entry.prescriptionRequired
      ? "Prescription Required"
      : "No Prescription",
    color: COLORS[index % COLORS.length],
  }));
};

export function PrescriptionRequirementChart({ data, isLoading }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const chartData = transformData(data);
  const total = chartData.reduce((sum, entry) => sum + entry.count, 0);

  if (isLoading || !data) {
    return (
      <div className="w-full h-[320px] flex items-center justify-center">
        <div className="w-40 h-40 bg-gray-200 skeleton rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={activeIndex !== null ? 90 : 80}
            innerRadius={activeIndex !== null ? 40 : 30}
            dataKey="count"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationDuration={300}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={activeIndex === index ? "#1e40af" : "transparent"}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-3 border shadow-md bg-white">
                    <div className="text-sm font-medium">{payload[0].name}</div>
                    <div className="text-sm text-muted-foreground">
                      Count: {payload[0].payload.count}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {total > 0
                        ? Math.round((payload[0].payload.count / total) * 100)
                        : 0}
                      % of total
                    </div>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Legend
            formatter={(value) => (
              <span className="text-sm font-medium">{value}</span>
            )}
            iconSize={10}
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

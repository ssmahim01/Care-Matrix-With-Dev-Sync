import { useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Prescription Required", value: 12, color: "#2563eb" },
  { name: "No Prescription", value: 7, color: "#60a5fa" },
];

export function PrescriptionRequirementChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={activeIndex !== null ? 90 : 80}
          innerRadius={activeIndex !== null ? 40 : 30}
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
          animationDuration={300}
        >
          {data.map((entry, index) => (
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
                    Count: {payload[0].value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round((payload[0].value / 19) * 100)}% of total
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
  );
}

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

const AppointmentPieChart = ({ appointmentStatusBreakdown }) => {
  // Colors for Pie Charts
  const COLORS = ["#10B981", "#F59E0B", "#F59E0B", "#10B981"];
  return (
    <Card className="lg:col-span-4 xl:col-span-4 border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle>Appointment Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={appointmentStatusBreakdown}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              paddingAngle={3}
              fill="#8884d8"
              label
            >
              {appointmentStatusBreakdown.map((entry, index) => (
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

export default AppointmentPieChart;

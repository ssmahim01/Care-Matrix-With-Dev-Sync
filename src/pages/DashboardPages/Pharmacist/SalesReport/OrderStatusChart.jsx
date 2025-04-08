import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const OrderStatusChart = ({ orderStatusData }) => {
  return (
    <Card className="lg:col-span-3 xl:col-span-2 border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base font-bold">Order Status</CardTitle>
        <CardDescription className="py-0 font-medium -mt-1">
          Current distribution of order statuses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-full">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} orders`, name]} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;

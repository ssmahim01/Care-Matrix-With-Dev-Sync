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
    <Card className="col-span-3 border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>
          Current distribution of order statuses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-full">
          <ResponsiveContainer width="200%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
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

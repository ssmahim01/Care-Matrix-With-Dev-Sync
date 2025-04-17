import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Custom Tooltip Component for better styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const earnings = payload.find((p) => p.dataKey === "earnings")?.value || 0;
    const patients = payload.find((p) => p.dataKey === "patients")?.value || 0;
    return (
      <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">
          {new Date(label).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-purple-600 font-medium">
          Earnings: ৳
          {earnings.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-green-600 font-medium">Booked Patient: {patients}</p>
      </div>
    );
  }
  return null;
};

export function AdministratorAnalytics({ chartData }) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    if (isNaN(date.getTime())) return false;
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-wrap md:items-center gap-2 space-y-0 border-b py-5 sm:flex-row flex-col">
        <div className="grid flex-1 gap-1 text-left">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Patient Growth & Earnings
          </CardTitle>
          <CardDescription className="text-gray-600">
            Showing total patients and earnings for the last{" "}
            {timeRange === "90d"
              ? "3 months"
              : timeRange === "30d"
              ? "30 days"
              : "7 days"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto border-gray-300 focus:ring-2 focus:ring-purple-500"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-4 pt-6 sm:px-8 sm:pt-8">
        {filteredData.length === 0 ? (
          <div className="flex justify-center items-center h-[350px]">
            <p className="text-gray-500 text-lg">
              No data available for the selected time range.
            </p>
          </div>
        ) : (
          <ChartContainer className="aspect-auto h-[350px] w-full">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#8884d8" // Purple for earnings
                    stopOpacity={0.6}
                  />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#82ca9d" // Green for patients
                    stopOpacity={0.7}
                  />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                yAxisId="earnings"
                orientation="left"
                tickFormatter={(value) => `৳${value.toLocaleString()}`}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                label={{
                  value: "Earnings (৳)",
                  angle: -90,
                  position: "insideLeft",
                  offset: -5,
                  style: {
                    textAnchor: "middle",
                    fill: "#6b7280",
                    fontSize: 12,
                  },
                }}
              />
              <YAxis
                yAxisId="patients"
                orientation="right"
                tickFormatter={(value) => value}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, "auto"]} // Dynamic domain for patients
                tick={{ fill: "#6b7280", fontSize: 12 }}
                label={{
                  value: "Patients (count)",
                  angle: 90,
                  position: "insideRight",
                  offset: -5,
                  style: {
                    textAnchor: "middle",
                    fill: "#6b7280",
                    fontSize: 12,
                  },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                yAxisId="earnings"
                dataKey="earnings"
                type="natural"
                fill="url(#fillEarnings)"
                stroke="#8884d8"
                strokeWidth={2}
                name="Earnings"
              />
              <Area
                yAxisId="patients"
                dataKey="patients"
                type="natural"
                fill="url(#fillPatients)"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Patients"
              />
              <ChartLegend
                content={<ChartLegendContent />}
                wrapperStyle={{ paddingTop: 10 }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default AdministratorAnalytics;

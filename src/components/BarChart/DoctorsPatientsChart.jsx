import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define a set of wonderful colors
const wonderfulColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
];

// Define chart configuration
const chartConfig = {
  patients: {
    label: "Patients",
  },
};

export default function DoctorsPatientsChart({counts}) {
  // Transform fetched data into chartData format
  const chartData = counts?.doctorsPatients
    ? counts.doctorsPatients.map((item, index) => ({
        doctor: item.doctorName,
        patients: item.patients,
        fill: wonderfulColors[index % wonderfulColors.length],
      }))
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctors and Patients</CardTitle>
        <CardDescription>Patient Distribution by Doctor</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={"h-[300px]"}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="doctor"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <XAxis dataKey="patients" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="patients" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col pb-5 items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Patient distribution across doctors <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total patients per doctor
        </div>
      </CardFooter>
    </Card>
  );
}
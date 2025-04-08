import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, TrendingUp } from "lucide-react";
import { format, parseISO } from "date-fns";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import OverviewCards from "./OverviewCards";
import SalesReportHeader from "./SalesReportHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RevenueChart from "./RevenueChart";
import OrderStatusChart from "./OrderStatusChart";
import TopSellingChart from "./TopSellingChart";
import OrderVolumeChart from "./OrderVolumeChart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RevenueByDayTable from "./RevenueByDayTable";

// Fetch All Sales Report Data
const fetchSalesReport = async () => {
  const { data } = await axios(`${import.meta.env.VITE_API_URL}/sales-report`);
  return data || [];
};

// Color schemes for charts
const COLORS = {
  revenue: {
    primary: "#06b6d4",
    secondary: "#0ea5e9",
    gradient: ["#0ea5e9", "#06b6d4"],
  },
  orders: {
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    gradient: ["#8b5cf6", "#a78bfa"],
  },
  items: {
    primary: "#f97316",
    secondary: "#fb923c",
    gradient: ["#f97316", "#fb923c"],
  },
};

// Custom tooltip component for charts
const CustomTooltip = ({
  active,
  payload,
  label,
  valuePrefix = "",
  valueSuffix = "",
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3 text-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload?.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{ color: entry?.color }}
            className="flex items-center gap-2"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }}
            ></span>
            <span>
              {entry?.name}: {valuePrefix}
              {Number(entry?.value).toLocaleString()}
              {valueSuffix}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SalesReport() {
  // Use Sales Report Data
  const { data: report = [], isLoading } = useQuery({
    queryKey: ["sales-report"],
    queryFn: fetchSalesReport,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Sort revenue data by date for the chart
  const sortedRevenueData = [...(report?.revenuePerDay || [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate additional metrics
  const totalItems = report?.revenuePerDay.reduce(
    (acc, day) => acc + day?.totalQty,
    0
  );
  const avgOrderValue = report?.totalRevenue / report?.totalOrders;
  const avgItemValue = report?.totalRevenue / totalItems;
  const avgDailyRevenue =
    report?.revenuePerDay.reduce((acc, day) => acc + day?.totalRevenue, 0) /
    report?.revenuePerDay.length;

  // Order status data for pie chart
  const orderStatusData = [
    {
      name: "Delivered",
      value: report?.totalDeliveredOrders,
      color: "#10b981",
    },
    {
      name: "Pending",
      value: report?.totalPendingOrders,
      color: "#f59e0b",
    },
    {
      name: "Other",
      value:
        report?.totalOrders -
        report?.totalPendingOrders -
        report?.totalDeliveredOrders,
      color: "#6b7280",
    },
  ];

  // Enhanced data for charts
  const enhancedRevenueData = report?.revenuePerDay.map((item) => ({
    ...item,
    formattedDate: format(parseISO(item?.date), "MMM dd"),
    avgItemValue: item?.totalRevenue / item?.totalQty,
  }));

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 px-7 md:gap-8">
        {/* Sales Report Header */}
        <SalesReportHeader />
        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          {/* All Tablist */}
          <TabsList className="border py-6 px-1">
            <TabsTrigger
              value="overview"
              className={"cursor-pointer py-2 px-4"}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className={"cursor-pointer py-2 px-4"}
            >
              Detailed Analytics
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className={"cursor-pointer py-2 px-4"}
            >
              Product Performance
            </TabsTrigger>
          </TabsList>
          {/* 1st Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            {/* Overview Cards */}
            <OverviewCards
              totalOrders={report?.totalOrders}
              totalPendingOrders={report?.totalPendingOrders}
              totalDeliveredOrders={report?.totalDeliveredOrders}
              totalRevenue={report?.totalRevenue}
            />
            {/* Revenue & OrderStatus  Charts */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              {/* Revenue Chart */}
              <RevenueChart enhancedRevenueData={enhancedRevenueData} />
              {/* OrderStatus Chart */}
              <OrderStatusChart orderStatusData={orderStatusData} />
            </div>
            {/* Top Selling & Order Volume Charts */}
            <div className="grid gap-6 lg:grid-cols-7">
              {/* Top Selling Chart */}
              <TopSellingChart
                topSellingMedicines={report?.topSellingMedicines.slice(0, 5)}
              />
              {/* Order Volume Chart */}
              <OrderVolumeChart enhancedRevenueData={enhancedRevenueData} />
            </div>
          </TabsContent>
          {/* 2nd Tab Content */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
              <CardHeader>
                <CardTitle className="text-base font-bold">
                  Revenue Analysis
                </CardTitle>
                <CardDescription className="py-0 font-medium -mt-1">
                  Detailed breakdown of revenue metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Revenue Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="border shadow border-[#e5e7eb] w-full pb-6">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-base font-semibold text-gray-700">
                          Average Daily Revenue
                        </div>
                        <div className="text-3xl font-extrabold mt-1 text-primary">
                          $
                          {avgDailyRevenue.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow border-[#e5e7eb] w-full pb-6">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-base font-semibold text-gray-700">
                          Average Order Value
                        </div>
                        <div className="text-3xl font-extrabold mt-1 text-primary">
                          $
                          {avgOrderValue.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow border-[#e5e7eb] w-full pb-6">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-base font-semibold text-gray-700">
                          Average Item Value
                        </div>
                        <div className="text-3xl font-extrabold mt-1 text-primary">
                          $
                          {avgItemValue.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow border-[#e5e7eb] w-full pb-6">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-base font-semibold text-gray-700">
                          Total Items Sold
                        </div>
                        <div className="text-3xl font-extrabold mt-1 text-primary">
                          {totalItems.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Revenue by Day */}
                <div>
                  <h3 className="text-base font-bold mb-4">Revenue by Day</h3>
                  <div>
                    <RevenueByDayTable sortedRevenueData={sortedRevenueData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* 3rd Tab Content */}
          <TabsContent value="products" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>
                  Detailed analysis of top selling products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={report.topSellingMedicines}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorBar"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366f1"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366f1"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="medicine"
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                      />
                      <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="totalQty"
                        name="Quantity Sold"
                        fill="url(#colorBar)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="overflow-hidden rounded-lg border bg-background">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-3 text-left font-medium">Rank</th>
                        <th className="p-3 text-left font-medium">Medicine</th>
                        <th className="p-3 text-left font-medium">
                          Quantity Sold
                        </th>
                        <th className="p-3 text-left font-medium">
                          % of Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.topSellingMedicines.map((medicine, index) => (
                        <tr
                          key={medicine.medicine}
                          className={index % 2 === 0 ? "bg-muted/20" : ""}
                        >
                          <td className="p-3 font-medium">{index + 1}</td>
                          <td className="p-3">{medicine.medicine}</td>
                          <td className="p-3">{medicine.totalQty}</td>
                          <td className="p-3">
                            {((medicine.totalQty / totalItems) * 100).toFixed(
                              1
                            )}
                            %
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-muted/20 border-none">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Product Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          </div>
                          <span>
                            Ciproxin is the top selling medicine with 25 units
                            sold
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          </div>
                          <span>
                            Antibiotics (Ciproxin, Dalacin C, Zithromax) are the
                            most popular category
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          </div>
                          <span>
                            Top 5 products account for{" "}
                            {(
                              (report.topSellingMedicines.reduce(
                                (acc, med) => acc + med.totalQty,
                                0
                              ) /
                                totalItems) *
                              100
                            ).toFixed(1)}
                            % of total sales
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/20 border-none">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                            <TrendingUp className="h-3 w-3 text-amber-500" />
                          </div>
                          <span>
                            Increase stock levels for top selling antibiotics
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                            <TrendingUp className="h-3 w-3 text-amber-500" />
                          </div>
                          <span>
                            Consider bundle promotions for frequently purchased
                            medicines
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                            <TrendingUp className="h-3 w-3 text-amber-500" />
                          </div>
                          <span>
                            Monitor Lipitor inventory as it has lower sales
                            volume
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

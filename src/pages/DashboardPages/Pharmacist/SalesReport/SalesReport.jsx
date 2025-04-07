import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO } from "date-fns";
import {
  CheckCircle,
  Clock,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
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
import SalesReportHeader from "./SalesReportHeader";
import OverviewCards from "./OverviewCards";

// Data from the provided JSON
const dashboardData = {
  totalOrders: 21,
  totalPendingOrders: 12,
  totalDeliveredOrders: 4,
  totalRevenue: 9223.95,
  revenuePerDay: [
    {
      totalQty: 25,
      totalRevenue: 6550.110000000001,
      date: "2025-04-05",
    },
    {
      totalQty: 41,
      totalRevenue: 4049.9399999999996,
      date: "2025-04-02",
    },
    {
      totalQty: 9,
      totalRevenue: 9529.66,
      date: "2025-03-29",
    },
    {
      totalQty: 3,
      totalRevenue: 1036.5,
      date: "2025-04-07",
    },
    {
      totalQty: 36,
      totalRevenue: 27830.48,
      date: "2025-03-27",
    },
    {
      totalQty: 11,
      totalRevenue: 1075.98,
      date: "2025-04-06",
    },
  ],
  topSellingMedicines: [
    {
      totalQty: 25,
      medicine: "Ciproxin",
    },
    {
      totalQty: 24,
      medicine: "Dalacin C",
    },
    {
      totalQty: 24,
      medicine: "Zithromax",
    },
    {
      totalQty: 19,
      medicine: "Flagyl",
    },
    {
      totalQty: 12,
      medicine: "Lipitor",
    },
  ],
};

// Sort revenue data by date for the chart
const sortedRevenueData = [...dashboardData.revenuePerDay].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

// Calculate additional metrics
const totalItems = dashboardData.revenuePerDay.reduce(
  (acc, day) => acc + day.totalQty,
  0
);
const avgOrderValue = dashboardData.totalRevenue / dashboardData.totalOrders;
const avgItemValue = dashboardData.totalRevenue / totalItems;
const avgDailyRevenue =
  dashboardData.revenuePerDay.reduce((acc, day) => acc + day.totalRevenue, 0) /
  dashboardData.revenuePerDay.length;

// Order status data for pie chart
const orderStatusData = [
  {
    name: "Delivered",
    value: dashboardData.totalDeliveredOrders,
    color: "#10b981",
  },
  {
    name: "Pending",
    value: dashboardData.totalPendingOrders,
    color: "#f59e0b",
  },
  {
    name: "Other",
    value:
      dashboardData.totalOrders -
      dashboardData.totalPendingOrders -
      dashboardData.totalDeliveredOrders,
    color: "#6b7280",
  },
];

// Enhanced data for charts
const enhancedRevenueData = sortedRevenueData.map((item) => ({
  ...item,
  formattedDate: format(parseISO(item.date), "MMM dd"),
  avgItemValue: item.totalRevenue / item.totalQty,
}));

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
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
            className="flex items-center gap-2"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span>
              {entry.name}: {valuePrefix}
              {Number(entry.value).toLocaleString()}
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
            <OverviewCards
              totalOrders={dashboardData?.totalOrders}
              totalPendingOrders={dashboardData?.totalPendingOrders}
              totalDeliveredOrders={dashboardData?.totalDeliveredOrders}
              totalRevenue={dashboardData?.totalRevenue}
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 border-none shadow-md">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>
                    Daily revenue with average per item
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={enhancedRevenueData}>
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.revenue.primary}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.revenue.primary}
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorAvg"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.items.primary}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.items.primary}
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="formattedDate"
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                      />
                      <YAxis
                        yAxisId="left"
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                      />
                      <Tooltip content={<CustomTooltip valuePrefix="$" />} />
                      <Legend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="totalRevenue"
                        name="Total Revenue"
                        stroke={COLORS.revenue.primary}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="avgItemValue"
                        name="Avg Value Per Item"
                        stroke={COLORS.items.primary}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-3 border-none shadow-md">
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>
                    Current distribution of order statuses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <ResponsiveContainer width="100%" height={250}>
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
                        <Tooltip
                          formatter={(value, name) => [`${value} orders`, name]}
                        />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          iconType="circle"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-800 font-medium">
                        Delivered
                      </p>
                      <p className="text-2xl font-bold text-green-700">
                        {dashboardData.totalDeliveredOrders}
                      </p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-xs text-amber-800 font-medium">
                        Pending
                      </p>
                      <p className="text-2xl font-bold text-amber-700">
                        {dashboardData.totalPendingOrders}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-800 font-medium">Other</p>
                      <p className="text-2xl font-bold text-gray-700">
                        {dashboardData.totalOrders -
                          dashboardData.totalPendingOrders -
                          dashboardData.totalDeliveredOrders}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3 border-none shadow-md">
                <CardHeader>
                  <CardTitle>Top Selling Medicines</CardTitle>
                  <CardDescription>
                    Top 5 medicines by quantity sold
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={dashboardData.topSellingMedicines}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorQty"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop
                            offset="0%"
                            stopColor={COLORS.orders.primary}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor={COLORS.orders.secondary}
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                      />
                      <YAxis
                        dataKey="medicine"
                        type="category"
                        width={100}
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                      />
                      <Tooltip
                        formatter={(value) => [value, "Quantity Sold"]}
                      />
                      <Bar
                        dataKey="totalQty"
                        name="Quantity Sold"
                        fill="url(#colorQty)"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-4 border-none shadow-md">
                <CardHeader>
                  <CardTitle>Daily Order Volume</CardTitle>
                  <CardDescription>
                    Number of items sold per day
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={enhancedRevenueData}>
                      <defs>
                        <linearGradient
                          id="colorItems"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.orders.primary}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.orders.primary}
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="formattedDate"
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                      />
                      <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                      <Tooltip
                        content={<CustomTooltip valueSuffix=" items" />}
                      />
                      <Legend />
                      <Bar
                        dataKey="totalQty"
                        name="Items Sold"
                        fill="url(#colorItems)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* 2nd Tab Content */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of revenue metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-primary/5 border-none">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">
                          Average Daily Revenue
                        </div>
                        <div className="text-3xl font-bold mt-2 text-primary">
                          $
                          {avgDailyRevenue.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 border-none">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">
                          Average Order Value
                        </div>
                        <div className="text-3xl font-bold mt-2 text-primary">
                          $
                          {avgOrderValue.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 border-none">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">
                          Average Item Value
                        </div>
                        <div className="text-3xl font-bold mt-2 text-primary">
                          $
                          {avgItemValue.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 border-none">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">
                          Total Items Sold
                        </div>
                        <div className="text-3xl font-bold mt-2 text-primary">
                          {totalItems.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Revenue by Day</h3>
                  <div className="overflow-hidden rounded-lg border bg-background">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="p-3 text-left font-medium">Date</th>
                          <th className="p-3 text-left font-medium">
                            Items Sold
                          </th>
                          <th className="p-3 text-left font-medium">Revenue</th>
                          <th className="p-3 text-left font-medium">
                            Avg. Item Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedRevenueData.map((day, index) => (
                          <tr
                            key={day.date}
                            className={index % 2 === 0 ? "bg-muted/20" : ""}
                          >
                            <td className="p-3 font-medium">
                              {format(new Date(day.date), "MMM dd, yyyy")}
                            </td>
                            <td className="p-3">{day.totalQty} items</td>
                            <td className="p-3 font-medium">
                              $
                              {day.totalRevenue.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </td>
                            <td className="p-3">
                              $
                              {(day.totalRevenue / day.totalQty).toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                      data={dashboardData.topSellingMedicines}
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
                      {dashboardData.topSellingMedicines.map(
                        (medicine, index) => (
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
                        )
                      )}
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
                              (dashboardData.topSellingMedicines.reduce(
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

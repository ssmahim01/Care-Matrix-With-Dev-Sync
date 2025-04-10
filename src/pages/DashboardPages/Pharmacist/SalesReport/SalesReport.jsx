import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";

import axios from "axios";
import OrderStatusChart from "./OrderStatusChart";
import OrderVolumeChart from "./OrderVolumeChart";
import OverviewCards from "./OverviewCards";
import PerformanceChart from "./PerformanceChart";
import PerformanceTable from "./PerformanceTable";
import ProductInsightsCard from "./ProductInsightsCard";
import RecommendationsCard from "./RecommendationsCard";
import RevenueByDayTable from "./RevenueByDayTable";
import RevenueCards from "./RevenueCards";
import RevenueChart from "./RevenueChart";
import SalesReportHeader from "./SalesReportHeader";
import TopSellingChart from "./TopSellingChart";
import SalesReportSkeleton from "./SalesReportSkeleton";
import toast from "react-hot-toast";
import { utils, writeFile } from "xlsx";
import RevenueByDayPDF from "./RavenueByDayPdf";
import TopCustomerTable from "./TopCustomerTable";

// Fetch All Sales Report Data
const fetchSalesReport = async () => {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/sales-report`
    );
    return data || [];
  } catch (error) {
    toast.error(error?.message || "Something Wen't Wrong");
  }
};

export default function SalesReport() {
  // Use Sales Report Data
  const {
    data: report = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sales-report"],
    queryFn: fetchSalesReport,
  });

  if (isLoading || isError) {
    return <SalesReportSkeleton />;
  }

  // Sort revenue data by date for the chart
  const sortedRevenueData = [...(report?.revenuePerDay || [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate additional metrics
  const totalItems = (report?.revenuePerDay ?? []).reduce(
    (acc, day) => acc + (day?.totalQty ?? 0),
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

  const handleDownload = () => {
    const tableData = sortedRevenueData?.reverse().map((day) => {
      const avgItemValue = day?.totalRevenue / day?.totalQty;
      const tax = day?.totalRevenue * 0.1;
      const netRevenue = day?.totalRevenue - tax;
      return {
        Date: format(new Date(day?.date), "MMM dd, yyyy"),
        "Items Sold": `${day?.totalQty} items`,
        Revenue: `৳ ${day?.totalRevenue.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`,
        "Avg Item Value": `৳ ${avgItemValue?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`,
        "Estimated Tax (10%)": `৳ ${tax?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`,
        "Net Revenue": `৳ ${netRevenue?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`,
      };
    });

    const worksheet = utils.json_to_sheet(tableData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Revenue By Day");
    writeFile(
      workbook,
      `Sales_Report_${format(new Date(), "yyyy-MM-dd")}.xlsx`
    );
  };

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 px-7 md:gap-8">
        {/* Sales Report Header */}
        <SalesReportHeader
          handleDownload={handleDownload}
          sortedRevenueData={sortedRevenueData}
          fileName={`Sales_Report_${format(new Date(), "yyyy-MM-dd")}.pdf`}
        />
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
            <TabsTrigger
              value="insights"
              className={"cursor-pointer py-2 px-4"}
            >
              Customer Insights
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
                  <RevenueCards
                    avgDailyRevenue={avgDailyRevenue}
                    avgOrderValue={avgOrderValue}
                    avgItemValue={avgItemValue}
                    totalItems={totalItems}
                  />
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
            <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
              <CardHeader>
                <CardTitle className="text-base font-bold">
                  Product Performance
                </CardTitle>
                <CardDescription className="py-0 font-medium -mt-1">
                  Detailed analysis of top selling products
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Performance Chart & Table */}
                <div className="grid lg:grid-cols-7 xl:grid-cols-8">
                  <div className="mb-6 lg:col-span-4 xl:col-span-5 w-full">
                    {/* Medicine Performance Chart */}
                    <PerformanceChart
                      topSellingMedicines={report?.topSellingMedicines}
                    />
                  </div>
                  {/* Medicine Performance Table */}
                  <div className="lg:col-span-3 xl:col-span-3 w-full">
                    <PerformanceTable
                      topSellingMedicines={report?.topSellingMedicines}
                      totalItems={totalItems}
                    />
                  </div>
                </div>
                {/* Product Insights & Recommendations */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Insights */}
                  <ProductInsightsCard
                    topSellingMedicines={report?.topSellingMedicines}
                    totalItems={totalItems}
                  />
                  {/* Recommendations */}
                  <RecommendationsCard />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* 4th Tab Content */}
          <TabsContent value="insights">
            <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
              <CardHeader>
                <CardTitle className="text-base font-bold">
                  Top Customer
                </CardTitle>
                <CardDescription className="py-0 font-medium -mt-1">
                  Most valuable customers based on total purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopCustomerTable topCustomers={report?.topCustomers} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

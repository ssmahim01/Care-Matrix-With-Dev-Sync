import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShoppingCart, Clock, CheckCircle, DollarSign } from "lucide-react";

const OverviewCards = ({
  totalOrders,
  totalPendingOrders,
  totalDeliveredOrders,
  totalRevenue,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
          <CardTitle className="text-lg font-bold">Total Revenue</CardTitle>
          <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent className="relative ml-1 -mt-3">
          <div className="text-3xl font-bold">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center mt-2">
            <Badge
              variant="secondary"
              className="text-xs bg-green-100 text-green-800 hover:bg-green-100"
            >
              +8.2% from last month
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
          <CardTitle className="text-lg font-bold">Total Orders</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <ShoppingCart className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="relative ml-1 -mt-3">
          <div className="text-3xl font-bold">{totalOrders}</div>
          <div className="flex items-center mt-2">
            <Badge
              variant="secondary"
              className="text-xs bg-green-100 text-green-800 hover:bg-green-100"
            >
              +12% from last month
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
          <CardTitle className="text-lg font-bold">Pending Orders</CardTitle>
          <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent className="relative ml-1 -mt-3">
          <div className="text-3xl font-bold">{totalPendingOrders}</div>
          <div className="flex items-center mt-2">
            <p className="text-xs text-muted-foreground">
              {((totalPendingOrders / totalOrders) * 100).toFixed(1)}% of total
              orders
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
          <CardTitle className="text-lg font-bold">Delivered Orders</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent className="relative ml-1 -mt-3">
          <div className="text-3xl font-bold">{totalDeliveredOrders}</div>
          <div className="flex items-center mt-2">
            <p className="text-xs text-muted-foreground">
              {((totalDeliveredOrders / totalOrders) * 100).toFixed(1)}% of
              total orders
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;

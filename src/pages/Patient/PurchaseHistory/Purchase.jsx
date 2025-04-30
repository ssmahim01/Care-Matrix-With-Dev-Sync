import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";
import { GiMedicines } from "react-icons/gi";
import { Link } from "react-router";

export default function PurchaseHistoryMain({ ordersData }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5" />;
      case "Processing":
        return <Package className="h-5 w-5" />;
      case "Ready for Pickup":
        return <ShoppingBag className="h-5 w-5" />;
      case "Shipped":
        return <Truck className="h-5 w-5" />;
      case "Out for Delivery":
        return <Truck className="h-5 w-5" />;
      case "Delivered":
        return <CheckCircle2 className="h-5 w-5" />;
      case "Canceled":
        return <AlertCircle className="h-5 w-5" />;
      case "Refunded":
        return <RotateCcw className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  // Get status color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Ready for Pickup":
        return "bg-purple-100 text-purple-800";
      case "Shipped":
        return "bg-indigo-100 text-indigo-800";
      case "Out for Delivery":
        return "bg-cyan-100 text-cyan-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Canceled":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen w-full">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="border w-full flex flex-col lg:flex-row mb-4">
          <TabsTrigger
            className={"cursor-pointer py-2 px-4 w-full "}
            value="all"
          >
            All Orders
          </TabsTrigger>
          <TabsTrigger
            className={"cursor-pointer py-2 px-4 w-full "}
            value="pending"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            className={"cursor-pointer py-2 px-4 w-full "}
            value="processing"
          >
            Processing
          </TabsTrigger>
          <TabsTrigger
            className={"cursor-pointer py-2 px-4 w-full "}
            value="delivered"
          >
            Delivered
          </TabsTrigger>
          <TabsTrigger
            className={"cursor-pointer py-2 px-4 w-full "}
            value="canceled"
          >
            Canceled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {selectedOrder ? (
            <OrderDetails
              order={selectedOrder}
              onBack={() => setSelectedOrder(null)}
            />
          ) : (
            <OrdersList orders={ordersData} onSelectOrder={setSelectedOrder} />
          )}
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          {selectedOrder ? (
            <OrderDetails
              order={selectedOrder}
              onBack={() => setSelectedOrder(null)}
            />
          ) : (
            <OrdersList
              orders={ordersData.filter(
                (order) => order.orderStatus === "Pending"
              )}
              onSelectOrder={setSelectedOrder}
            />
          )}
        </TabsContent>
        <TabsContent value="processing" className="space-y-4">
          {selectedOrder ? (
            <OrderDetails
              order={selectedOrder}
              onBack={() => setSelectedOrder(null)}
            />
          ) : (
            <OrdersList
              orders={ordersData.filter(
                (order) =>
                  order.orderStatus === "Processing" ||
                  order.orderStatus === "Shipped" ||
                  order.orderStatus === "Out for Delivery"
              )}
              onSelectOrder={setSelectedOrder}
            />
          )}
        </TabsContent>
        <TabsContent value="delivered" className="space-y-4">
          {selectedOrder ? (
            <OrderDetails
              order={selectedOrder}
              onBack={() => setSelectedOrder(null)}
            />
          ) : (
            <OrdersList
              orders={ordersData.filter(
                (order) => order.orderStatus === "Delivered"
              )}
              onSelectOrder={setSelectedOrder}
            />
          )}
        </TabsContent>
        <TabsContent value="canceled" className="space-y-4">
          {selectedOrder ? (
            <OrderDetails
              order={selectedOrder}
              onBack={() => setSelectedOrder(null)}
            />
          ) : (
            <OrdersList
              orders={ordersData.filter(
                (order) =>
                  order.orderStatus === "Canceled" ||
                  order.orderStatus === "Refunded"
              )}
              onSelectOrder={setSelectedOrder}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}



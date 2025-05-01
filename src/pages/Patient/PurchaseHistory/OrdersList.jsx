import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Package,
  RotateCcw,
  ShoppingBag,
  Truck,
} from "lucide-react";

const OrdersList = ({ orders, onSelectOrder }) => {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Processing":
        return <Package className="h-4 w-4" />;
      case "Ready for Pickup":
        return <ShoppingBag className="h-4 w-4" />;
      case "Shipped":
        return <Truck className="h-4 w-4" />;
      case "Out for Delivery":
        return <Truck className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      case "Canceled":
        return <AlertCircle className="h-4 w-4" />;
      case "Refunded":
        return <RotateCcw className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (orders.length === 0) {
    return (
      <Card
        className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
      >
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No orders found</h3>
            <p className="text-muted-foreground mt-1">
              You don't have any orders in this category yet.
            </p>
          </div>{" "}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 :::grid grid-cols-1 lg:grid-cols-2 gap-4">
      {orders?.map((order) => (
        <Card
          key={order._id}
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow  border shadow-sm border-[#e5e7eb] w-full rounded-lg"
        >
          <div
            className="flex flex-col sm:flex-row"
            onClick={() => onSelectOrder(order)}
          >
            <div className="flex-1 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-4 mb-2">
                <div>
                  <p className="text-base text-gray-800">
                    {format(new Date(order.date), "MMMM d, yyyy")}
                  </p>
                  <h3 className="font-medium text-lg">
                    Order #{order._id.slice(-10)}
                  </h3>
                </div>
                <div
                  className={`inline-flex w-fit items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {getStatusIcon(order.orderStatus)}
                  <span>{order.orderStatus}</span>
                </div>
              </div>
              <Separator className="border mt-4 md:mt-0" />
              <div className="mt-2">
                <div className="flex flex-col">
                  <div className="text-base">
                    <span className="text-gray-700">Items:</span>{" "}
                    <span className="font-medium">
                      {order.medicines.length}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className="text-gray-700">Total:</span>{" "}
                    <span className="font-medium">
                      <span className="font-extrabold">৳</span>{" "}
                      {order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {order.medicines.slice(0, 2).map((medicine) => (
                    <Badge
                      key={medicine.medicineId}
                      variant="outline"
                      className="font-normal"
                    >
                      {medicine.medicineName} x{medicine.quantity}
                    </Badge>
                  ))}
                  {order.medicines.length > 2 && (
                    <Badge variant="outline" className="font-normal">
                      +{order.medicines.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-4 sm:border-l bg-muted/20">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OrdersList;

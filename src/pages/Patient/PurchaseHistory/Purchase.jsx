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
import EmptyState from "@/pages/DashboardPages/PatientOverview/EmptyState";
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
import { useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { Link } from "react-router";
import StatusTracker from "./StatusTracker";

const PurchaseHistoryMain = ({ ordersData }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return ordersData.length === 0 ? (
    <Card
      className={
        "mt-6 border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
      }
    >
      <CardContent>
        <EmptyState
          icon={ShoppingBag}
          title="No orders or purchase history found"
          description="Looks like you haven't made any purchases yet. Once you place an order, all your order details, tracking info, and history will appear here — happy shopping!"
          actionLabel="Make An order"
          actionLink="/dashboard/patient/manage-cart"
        />
      </CardContent>{" "}
    </Card>
  ) : (
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
};

// Orders List Component
const OrdersList = ({ orders, onSelectOrder }) => {
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

  // Get status icon based on status
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
      {orders.map((order) => (
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

// Order Details Component
const OrderDetails = ({ order, onBack }) => {
  // Calculate subtotal from medicines
  const subtotal = order.medicines.reduce(
    (sum, medicine) => sum + medicine.subtotal,
    0
  );

  return (
    <div className="space-y-1">
      <div className="pl-1 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className={"cursor-pointer"}
        >
          <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
          Back to Orders
        </Button>
      </div>

      <div className="pl-1 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Order #{order._id.slice(-10)}</h2>
          <p className="text-gray-800">
            Placed on {format(new Date(order.date), "MMMM d, yyyy 'at' h:mm a")}
          </p>
          <p className="text-gray-800 max-w-72 md:max-w-80 lg:max-w-xl truncate">
            Address: {order.customerInfo.address}, {order.customerInfo.district}
            , {order.customerInfo.division}
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <StatusBadge status={order.orderStatus} />
        </div>
      </div>

      {/* Status Tracker */}
      <Card
        className={
          "mt-4 border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
        }
      >
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
          <CardDescription className={"text-gray-700"}>
            Track your order's progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StatusTracker currentStatus={order.orderStatus} />
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card className="mt-4 w-full border shadow-sm border-[#e5e7eb] py-6 rounded-lg">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription className={"text-gray-700"}>
              Transaction ID: {order.transactionId}
            </CardDescription>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              {order.paymentStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.medicines.map((medicine) => (
              <div
                key={medicine.medicineId}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-md bg-muted flex items-center justify-center">
                    <GiMedicines className="h-6 w-6 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">
                      Qty: {medicine.quantity}
                    </p>
                    <p className="font-medium text-gray-800">
                      {medicine.medicineName}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  <span className="font-extrabold">৳</span>{" "}
                  {medicine.subtotal.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <Separator className="mt-6 mb-4 border" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-800">Subtotal</p>
              <p>
                <span className="font-extrabold">৳</span> {subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-800">
                Discount ({order.discountPercentage}%)
              </p>
              <p>
                -<span className="font-extrabold">৳</span>{" "}
                {Number.parseFloat(order.discountAmount).toFixed(2)}
              </p>
            </div>
            <Separator className="my-4 border" />
            <div className="flex justify-between font-medium">
              <p>Total</p>
              <p className="text-lg">
                <span className="font-extrabold">৳</span>{" "}
                {order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-end">
        <Link to={`/dashboard/invoice/${order.transactionId}`}>
          <Button
            variant="outline"
            className={"cursor-pointer flex items-center gap-1"}
          >
            <FaFileInvoice /> Download Invoice
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
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

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(
        status
      )}`}
    >
      {getStatusIcon(status)}
      <span className="font-medium text-sm">{status}</span>
    </div>
  );
};


export default PurchaseHistoryMain;

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
import StatusBadge from "./StatusBadge";

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

export default OrderDetails;

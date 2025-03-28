import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { FaTruck } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import axios from "axios";
import toast from "react-hot-toast";
import useOrders from "./../../../../hooks/useOrders";
import MedicinesDialog from "./MedicinesDialog";
import { useState } from "react";

const ManageOrders = () => {
  const [orders, isLoading, refetch] = useOrders();
  const [activeTab, setActiveTab] = useState("All");

  // Function to change order status
  const changeOrderStatus = async (id, newStatus) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/purchase/orders/change-status/${id}`,
        {
          orderStatus: newStatus,
        }
      );
      if (data.data.modifiedCount) {
        refetch();
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Order status options
  const orderStatuses = [
    "All",
    "Pending",
    "Processing",
    "Ready for Pickup",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Canceled",
    "Refunded",
  ];

  // Filter orders based on active tab
  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.orderStatus === activeTab);

  // Table component extracted for reusability
 

  return (
    <div className="p-7">
      <DashboardPagesHeader
        title="Manage Orders"
        subtitle="Track and process all customer orders efficiently, Manage orders in one place"
        icon={FaTruck}
      />

      {/* Tabs Navigation */}
      <Tabs defaultValue="All" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="flex items-center w-full lg:w-9/12 flex-wrap h-full mb-4">
          {orderStatuses.map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className={"cursor-pointer"}
            >
              {status}
              {status !== "All" && (
                <span className="ml-2 text-xs">
                  (
                  {
                    orders.filter((order) => order.orderStatus === status)
                      .length
                  }
                  )
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        {orderStatuses.map((status) => (
          <TabsContent key={status} value={status}>
            <OrdersTable ordersData={filteredOrders} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ManageOrders;

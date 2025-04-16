import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useOrders from "./../../../../hooks/useOrders";
import { FaTruck } from "react-icons/fa6";
import OrdersTable from "./OrdersTable";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

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
      : orders?.filter((order) => order.orderStatus === activeTab);

  return (
    <div className="px-7">
      <DashboardPagesHeader
        title="Manage Orders"
        subtitle="Track and process all customer orders efficiently, Manage orders in one place"
        icon={FaTruck}
      />

      {/* Tabs Navigation */}
      <Tabs defaultValue="All" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="flex flex-col md:flex-row items-center w-full flex-wrap h-full mb-4 border">
          {orderStatuses?.map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className={"cursor-pointer py-2 px-4 w-full"}
            >
              {status}
              {status !== "All" ? (
                <span className="ml-1 mt-1 text-xs">
                  (
                  {
                    orders.filter((order) => order?.orderStatus === status)
                      .length
                  }
                  )
                </span>
              ) : (
                <span className="ml-1 mt-1 text-xs">({orders?.length})</span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        {orderStatuses?.map((status) => (
          <TabsContent key={status} value={status}>
            <OrdersTable
              ordersData={filteredOrders}
              isLoading={isLoading}
              changeOrderStatus={changeOrderStatus}
              orderStatuses={orderStatuses}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ManageOrders;

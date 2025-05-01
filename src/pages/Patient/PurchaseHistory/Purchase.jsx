import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyState from "@/pages/DashboardPages/PatientOverview/EmptyState";
import { ShoppingBag } from "lucide-react";
import OrderDetails from "./OrderDetails";
import OrdersList from "./OrdersList";
import { useState } from "react";

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

export default PurchaseHistoryMain;

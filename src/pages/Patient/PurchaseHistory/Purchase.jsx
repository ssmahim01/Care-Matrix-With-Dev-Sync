import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyState from "@/pages/DashboardPages/PatientOverview/EmptyState";
import { ShoppingBag } from "lucide-react";
import OrderDetails from "./OrderDetails";
import OrdersList from "./OrdersList";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PurchaseHistoryMain = ({ ordersData }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAllOrders, setIsAllOrders] = useState(ordersData.slice(0, 3));

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
          actionLabel="Make An Order"
          actionLink="/dashboard/patient/manage-cart"
        />
      </CardContent>{" "}
    </Card>
  ) : (
    <div className="w-full">
      <Tabs defaultValue="all" className="w-full mt-2">
        <TabsList className="border w-full flex flex-col lg:flex-row mb-2">
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
            <>
              <OrdersList
                orders={isAllOrders}
                onSelectOrder={setSelectedOrder}
              />
              {ordersData.length > 2 && (
                <div className="mt-4 flex justify-end">
                  {isAllOrders.length === 3 ? (
                    <Button
                      onClick={() => setIsAllOrders(ordersData)}
                      className={"cursor-pointer flex items-center gap-2"}
                    >
                      <ShoppingBag />
                      View Past Orders
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsAllOrders(ordersData.slice(0, 3))}
                      className={"cursor-pointer flex items-center gap-2"}
                    >
                      <ShoppingBag />
                      View Recent Orders
                    </Button>
                  )}
                </div>
              )}
            </>
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

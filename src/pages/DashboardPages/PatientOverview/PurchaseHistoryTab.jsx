import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pill } from "lucide-react";

const PurchaseHistoryTab = ({
  purchaseHistory,
  formatDate,
  formatCurrency,
}) => {
  return (
    <Card
      className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
    >
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
        <CardDescription>Your recent medication orders</CardDescription>
      </CardHeader>
      <CardContent>
        {purchaseHistory && purchaseHistory.length > 0 ? (
          <div className="space-y-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
            {purchaseHistory.map((order) => (
              <div
                key={order._id || Math.random().toString()}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">
                      Order Date: {formatDate(order.date)}
                    </p>
                    <p className="text-sm">
                      Total: {formatCurrency(order.totalPrice)}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1">
                    <Badge
                      className={
                        order.paymentStatus === "Paid"
                          ? "bg-green-500"
                          : "bg-amber-500"
                      }
                    >
                      {order.paymentStatus || "Unknown"}
                    </Badge>
                    <Badge variant="outline">
                      {order.orderStatus || "Unknown"}
                    </Badge>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-2">Items:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {order.medicines &&
                      order.medicines.map((med, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Pill className="h-3 w-3 text-muted-foreground" />
                          <span>{med.name || "N/A"}</span>
                          <span className="text-muted-foreground">
                            x{med.qty || 0}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No purchase history found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseHistoryTab;

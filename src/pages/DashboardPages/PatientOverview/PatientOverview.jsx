import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthUser } from "@/redux/auth/authActions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Pill,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import OverviewCards from "./OverviewCards";
import SmartWaitTime from "./SmartWaitTime";
import AppointmentsTab from "./AppointmentsTab";
import BedBookingsTab from "./BedBookingsTab";

const PatientOverview = () => {
  // Fetch patient overview data
  const user = useAuthUser();
  const { data: patientStats = [], isLoading } = useQuery({
    queryKey: ["patient-stats", user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/patient/stats/${user?.email}`
      );
      return data;
    },
  });

  // Format date for display
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Format currency
  function formatCurrency(amount) {
    if (!amount && amount !== 0) return "N/A";
    return typeof amount === "string" && amount.startsWith("$")
      ? amount
      : `$${Number(amount).toFixed(2)}`;
  }
  return (
    <div className="px-7">
      {/* Overview Cards */}
      <OverviewCards
        bedBookings={patientStats?.bedBookings}
        overviewStats={patientStats?.overviewStats}
        appointment={patientStats?.appointment}
      />

      {/* Smart Wait Time Prediction */}
      {patientStats?.appointment && (
        <SmartWaitTime appointment={patientStats?.appointment} />
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="appointments" className="mt-6 space-y-4">
        <TabsList className="border py-6 px-2 mb-2">
          <TabsTrigger
            className={"cursor-pointer py-2 px-4"}
            value="appointments"
          >
            Appointments
          </TabsTrigger>
          <TabsTrigger className={"cursor-pointer py-2 px-4"} value="beds">
            Bed Bookings
          </TabsTrigger>
          <TabsTrigger
            className={"cursor-pointer py-2 px-4"}
            value="medications"
          >
            Medications
          </TabsTrigger>
          <TabsTrigger className={"cursor-pointer py-2 px-4"} value="history">
            Purchase History
          </TabsTrigger>
        </TabsList>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-4">
          <AppointmentsTab
            appointment={patientStats?.appointment}
            formatDate={formatDate}
          />
        </TabsContent>
        {/* Bed Bookings Tab */}
        <TabsContent value="beds" className="space-y-4">
          <BedBookingsTab
            bedBookings={patientStats?.bedBookings}
            formatDate={formatDate}
          />
        </TabsContent>
        {/* Medications Tab */}
        <TabsContent value="medications" className="space-y-4">
          <Card
            className={
              "border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
            }
          >
            <CardHeader>
              <CardTitle>Medicine Cart</CardTitle>
              <CardDescription>Items currently in your cart</CardDescription>
            </CardHeader>
            <CardContent>
              {patientStats?.medicineCart &&
              patientStats?.medicineCart.length > 0 ? (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medicine</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patientStats?.medicineCart.map((item) => (
                        <TableRow key={item._id || Math.random().toString()}>
                          <TableCell className="font-medium">
                            {item.medicineName || "N/A"}
                          </TableCell>
                          <TableCell>{formatCurrency(item.price)}</TableCell>
                          <TableCell>{item.quantity || 0}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(
                              (item.price || 0) * (item.quantity || 0)
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-sm font-medium">
                        Total Items:{" "}
                        {patientStats?.overviewStats?.itemsInCart || 0}
                      </p>
                      <p className="text-sm font-medium">
                        Total:{" "}
                        {formatCurrency(
                          patientStats?.medicineCart.reduce(
                            (sum, item) =>
                              sum + (item.price || 0) * (item.quantity || 0),
                            0
                          )
                        )}
                      </p>
                    </div>
                    <Button>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Checkout
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Your cart is empty.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* Purchase History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card
            className={
              "border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
            }
          >
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>Your recent medication orders</CardDescription>
            </CardHeader>
            <CardContent>
              {patientStats?.purchaseHistory &&
              patientStats?.purchaseHistory.length > 0 ? (
                <div className="space-y-6">
                  {patientStats?.purchaseHistory.map((order) => (
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
                <p className="text-muted-foreground">
                  No purchase history found.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientOverview;

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { FaFileInvoice } from "react-icons/fa";
import { Link } from "react-router";

const PurchaseHistoryTable = ({ purchaseHistory, isLoading }) => (
  <Table>
    <TableCaption>Your Purchase History</TableCaption>
    <TableHeader>
      <TableRow className={"bg-base-200 hover:bg-base-200"}>
        <TableHead>Order ID</TableHead>
        <TableHead>
          Medicines <sub>(qty)</sub>
        </TableHead>
        <TableHead>Total Amount</TableHead>
        <TableHead>Payment Status</TableHead>
        <TableHead>Order Status</TableHead>
        <TableHead>Purchase Date</TableHead>
        <TableHead>Shipping Address</TableHead>
        <TableHead className={"text-right"}>Invoice</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 8 }).map((_, j) => (
              <TableCell key={j}>
                <div className="skeleton h-8 rounded w-full"></div>
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : purchaseHistory.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={8}
            className="text-center font-medium text-gray-800 py-4 border-y"
          >
            No Purchase History Available
          </TableCell>
        </TableRow>
      ) : (
        purchaseHistory?.map((order, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">{order?._id}</TableCell>
            <TableCell>
              <div
                className={`${
                  order?.medicines.length > 4
                    ? "max-h-[100px] overflow-y-auto"
                    : ""
                } space-y-1`}
              >
                {order?.medicines?.map((medicine, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="font-medium text-sm">
                      {medicine?.medicineName}
                    </span>
                    <sub className="text-xs text-gray-500">
                      ({medicine?.quantity})
                    </sub>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>৳ {order?.totalPrice.toFixed(2)}</TableCell>
            <TableCell>
              <span
                className={`${
                  order?.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-red-600"
                } font-medium`}
              >
                {order?.paymentStatus}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <span
                  className={`text-xl font-medium rounded ${
                    order?.orderStatus === "Pending"
                      ? "text-yellow-600"
                      : order?.orderStatus === "Processing"
                      ? "text-orange-500"
                      : order?.orderStatus === "Ready for Pickup"
                      ? "text-blue-500"
                      : order?.orderStatus === "Shipped"
                      ? "text-blue-600"
                      : order?.orderStatus === "Out for Delivery"
                      ? "text-indigo-500"
                      : order?.orderStatus === "Delivered"
                      ? "text-green-600"
                      : order?.orderStatus === "Canceled"
                      ? "text-red-600"
                      : order?.orderStatus === "Refunded"
                      ? "text-gray-500"
                      : ""
                  }`}
                >
                  ●
                </span>
                <span className="font-medium">{order?.orderStatus}</span>
              </div>
            </TableCell>
            <TableCell>
              {order?.date
                ? new Date(order.date).toLocaleString().split(",")[0]
                : "N/A"}{" "}
              <br />
              <span className="mt-[1px] text-xs">
                {order?.date
                  ? new Date(order.date).toLocaleString().split(",")[1]
                  : "N/A"}
              </span>
            </TableCell>
            <TableCell>
              <div>{order?.customerInfo?.address}</div>
              {/* <div>
                {order?.customerInfo?.district && order?.customerInfo?.division
                  ? `${order?.customerInfo?.district}, ${order?.customerInfo?.division}`
                  : "N/A"}
              </div> */}
            </TableCell>
            <TableCell>
              <Link to={`/dashboard/invoice/${order.transactionId}`} className="flex justify-end items-center">
                <FaFileInvoice className="text-xl hover:text-blue-400"/>
              </Link>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
);

// Example usage component
const PurchaseHistory = () => {
  // Demo data (replace with your API call later)
  //   const demoData = [
  //     {
  //       _id: "67ed554fa53db1a89d9fef43",
  //       customerInfo: {
  //         name: "Demo Patient",
  //         email: "patient@carematrix.com",
  //         phone: "+8801624343171",
  //         district: "",
  //         division: "",
  //         address: "Mandari Bazar, Lakshmipur",
  //       },
  //       totalPrice: 97.91,
  //       transactionId: "pi_3R9T3UJHnPc6ZjSU1T59G5nJ",
  //       paymentStatus: "Paid",
  //       orderStatus: "Pending",
  //       date: "2025-04-02T15:18:39.345Z",
  //       medicines: [
  //         {
  //           medicineId: "67ed5453a53db1a89d9fef40",
  //           medicineName: "Ciproxin",
  //           quantity: 1,
  //           price: 9.5,
  //           subtotal: 9.5,
  //         },
  //         {
  //           medicineId: "67ed545aa53db1a89d9fef41",
  //           medicineName: "Zithromax",
  //           quantity: 2,
  //           price: 7.23,
  //           subtotal: 14.46,
  //         },
  //         {
  //           medicineId: "67ed545ea53db1a89d9fef42",
  //           medicineName: "Dalacin C",
  //           quantity: 1,
  //           price: 13.95,
  //           subtotal: 13.95,
  //         },
  //       ],
  //     },
  //   ];
  const user = useAuthUser();
  const loading = useAuthLoading();
  const axiosSecure = useAxiosSecure();
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/purchase/orders?email=${user.email}`);
      return res.data;
    },
  });
  console.log(orders);
  return (
    <div className="container mx-auto py-8 p-2">
      {/* <h1 className="text-2xl font-bold mb-6">My Purchase History</h1> */}
      <PurchaseHistoryTable purchaseHistory={orders} isLoading={false} />
    </div>
  );
};

export default PurchaseHistory;

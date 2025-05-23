import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaFileInvoice } from "react-icons/fa";
import { Link } from "react-router";

const PurchaseHistoryTable = ({ purchaseHistory, isLoading }) => (
  <Table>
    <TableCaption>Your Purchase History</TableCaption>
    <TableHeader>
      <TableRow className={"bg-base-200 hover:bg-base-200"}>
        <TableHead className={"mt-1 text-xs flex flex-col gap-1"}>
          <span>Order ID</span>
          <span>Transition ID</span>
        </TableHead>
        <TableHead>
          Medicines <sub>(qty)</sub>
        </TableHead>
        <TableHead>Total Amount</TableHead>
        <TableHead>Payment Status</TableHead>
        <TableHead>Order Status</TableHead>
        <TableHead>Purchase Date</TableHead>
        <TableHead>Shipping Address</TableHead>
        <TableHead />
        <TableHead>Invoice</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 9 }).map((_, j) => (
              <TableCell key={j}>
                <div className="skeleton h-8 rounded w-full"></div>
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : purchaseHistory.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={9}
            className="text-center font-medium text-gray-800 py-4 border-y"
          >
            No Purchase History Available
          </TableCell>
        </TableRow>
      ) : (
        purchaseHistory?.map((order, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <div className={"mt-1 text-xs flex flex-col font-medium gap-1.5"}>
                <span>{order?._id}</span>
                <span>{order?.transactionId}</span>
              </div>
            </TableCell>
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
              <div
                className={`flex ${
                  order?.orderStatus === "Ready for Pickup" ||
                  order?.orderStatus === "Out for Delivery"
                    ? "items-stretch"
                    : "items-center "
                } gap-1`}
              >
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
                </span>{" "}
                <span className="font-medium mt-[3.2px]">
                  {(order?.orderStatus === "Ready for Pickup" && (
                    <span>
                      Ready for <br /> Pickup
                    </span>
                  )) ||
                    (order?.orderStatus === "Out for Delivery" && (
                      <span>
                        Out for <br /> Delivery
                      </span>
                    )) ||
                    order?.orderStatus}
                </span>
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
            <TableCell className="max-w-40 overflow-x-auto">
              <div>{order?.customerInfo?.address}</div>
              <div>
                {order?.customerInfo?.district && order?.customerInfo?.division
                  ? `${order?.customerInfo?.district}, ${order?.customerInfo?.division}`
                  : "N/A"}
              </div>
            </TableCell>
            <TableCell />
            <TableCell>
              <Link to={`/dashboard/invoice/${order.transactionId}`}>
                <Button variant={"outline"} className={"cursor-pointer"}>
                  <FaFileInvoice className="text-slate-700" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
);

export default PurchaseHistoryTable;

import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { Button } from "@/components/ui/button";
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
import { FaEye } from "react-icons/fa";
import useOrders from "./../../../../hooks/useOrders";

const ManageOrders = () => {
  const [orders, isLoading, refetch] = useOrders();

  return (
    <div className="p-7">
      <DashboardPagesHeader
        title="Manage Orders"
        subtitle="Track and process all customer orders efficiently, Manage orders in one place"
        icon={FaTruck}
      />

      <div>
        {/* Orders Table */}
        <Table>
          <TableCaption>A List Of All Orders</TableCaption>
          <TableHeader>
            <TableRow className={"bg-base-200 hover:bg-base-200"}>
              <TableHead>Customer</TableHead>
              <TableHead>
                Medicines <sub>(qty)</sub>
              </TableHead>
              <TableHead className={"text-xs"}>
                Total <br /> Amount
              </TableHead>
              <TableHead className={"text-xs"}>
                Payment <br /> Status
              </TableHead>
              <TableHead className={"mt-1 text-xs flex flex-col gap-1"}>
                <span>Order ID</span>
                <span>Transition ID</span>
              </TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Shipping Address</TableHead>
              <TableHead className={"text-xs"}>
                Change
                <br />
                Order Status
              </TableHead>
              <TableHead className={"text-[10px]"}>
                View <br /> Ordered
                <br />
                Medicines
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div>
                    <h1 className="font-normal">
                      <span className="font-semibold">Name:</span>{" "}
                      {order?.customerInfo?.name}
                    </h1>
                    <h1 className="font-normal">
                      <span className="font-semibold">Email:</span>{" "}
                      <span className="font-semibold">Name:</span>{" "}
                      {order?.customerInfo?.email}
                    </h1>
                    <h1 className="font-normal">
                      <span className="font-semibold">Phone:</span>{" "}
                      <span className="font-semibold">Name:</span>{" "}
                      {order?.customerInfo?.phone}
                    </h1>
                  </div>
                </TableCell>
                <TableCell>
                  {order?.medicines?.map((medicine, idx) => (
                    <div key={idx}>
                      <span className="font-medium ">
                        {medicine?.medicineName}
                      </span>{" "}
                      <sub>({medicine?.quantity})</sub>
                    </div>
                  ))}
                </TableCell>
                <TableCell>${order?.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{order?.paymentStatus}</TableCell>
                <TableCell>
                  <div
                    className={"mt-1 text-xs flex flex-col font-medium gap-1.5"}
                  >
                    <span>{order?._id}</span>
                    <span>{order?.transactionId}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {order?.date ? order.date.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell>
                  <div className={"flex items-center gap-1"}>
                    <span
                      className={`text-xl font-medium rounded ${
                        order?.orderStatus === "Pending"
                          ? " text-yellow-600"
                          : order?.orderStatus === "Shipped"
                          ? " text-blue-600"
                          : order?.orderStatus === "Delivered"
                          ? " text-green-600"
                          : ""
                      }`}
                    >
                      ●
                    </span>{" "}
                    <span className="font-medium mt-[3.2px]">
                      {order?.orderStatus}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>{order?.customerInfo?.address}</div>
                  <div>
                    {order?.customerInfo?.district},{" "}
                    {order?.customerInfo?.division} -{" "}
                    {order?.customerInfo?.postalCode || "N/A"}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={order?.orderStatus}
                    // onValueChange={(newStatus) =>
                    //   onStatusChange(orderId, newStatus)
                    // }
                  >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue>{order?.orderStatus}</SelectValue>
                    </SelectTrigger>
                    <SelectContent className="cursor-pointer">
                      <SelectItem className="cursor-pointer" value="Pending">
                        Pending
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Delivered">
                        Delivered
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Shipped">
                        Shipped
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant={"outline"} className={"cursor-pointer"}>
                    <FaEye className="text-slate-700" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageOrders;

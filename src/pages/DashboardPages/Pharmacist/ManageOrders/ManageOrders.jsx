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
import toast from "react-hot-toast";
import axios from "axios";

const ManageOrders = () => {
  const [orders, isLoading, refetch] = useOrders();

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
              <TableHead>Shipping Address</TableHead>
              <TableHead>Order Status</TableHead>
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
                  {order?.date ? order?.date.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell>
                  <div>{order?.customerInfo?.address}</div>
                  <div>
                    {order?.customerInfo?.district},{" "}
                    {order?.customerInfo?.division} -{" "}
                    {order?.customerInfo?.postalCode || "N/A"}
                  </div>
                </TableCell>{" "}
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
                  <Select
                    value={order?.orderStatus}
                    onValueChange={(newStatus) =>
                      changeOrderStatus(order?._id, newStatus)
                    }
                    className={"cursor-pointer"}
                  >
                    <SelectTrigger className="cursor-pointer min-w-[115px] truncate">
                      <SelectValue>
                        {" "}
                        {(order?.orderStatus === "Ready for Pickup" && (
                          <span className={"py-1"}>
                            Ready for <br /> Pickup
                          </span>
                        )) ||
                          (order?.orderStatus === "Out for Delivery" && (
                            <span className={"py-1"}>
                              Out for <br /> Delivery
                            </span>
                          )) ||
                          order?.orderStatus}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className={"cursor-pointer min-w-[170px]"}>
                      <SelectItem className={"cursor-pointer"} value="Pending">
                        Pending
                      </SelectItem>
                      <SelectItem
                        className={"cursor-pointer"}
                        value="Processing"
                      >
                        Processing
                      </SelectItem>
                      <SelectItem
                        className={"cursor-pointer"}
                        value="Ready for Pickup"
                      >
                        Ready for Pickup
                      </SelectItem>
                      <SelectItem className={"cursor-pointer"} value="Shipped">
                        Order Shipped
                      </SelectItem>
                      <SelectItem
                        className={"cursor-pointer"}
                        value="Out for Delivery"
                      >
                        Out for Delivery
                      </SelectItem>
                      <SelectItem
                        className={"cursor-pointer"}
                        value="Delivered"
                      >
                        Order Delivered
                      </SelectItem>
                      <SelectItem className={"cursor-pointer"} value="Canceled">
                        Order Canceled
                      </SelectItem>
                      <SelectItem className={"cursor-pointer"} value="Refunded">
                        Order Refunded
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

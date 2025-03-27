import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { FaTruck } from "react-icons/fa6";

import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Eye, Pencil, Trash, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";

const status = "Shipped";

const ManageOrders = () => {
  return (
    <div className="p-7">
      <DashboardPagesHeader
        title="Manage Orders"
        subtitle="Track and process all customer orders efficiently! Manage orders in one place"
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
            {Array.from({ length: 6 }).map((order, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div>
                    <h1 className="font-normal">
                      <span className="font-semibold">Name:</span> Jhon Dohn
                    </h1>
                    <h1 className="font-normal">
                      <span className="font-semibold">Email:</span>{" "}
                      jhondohn@gmail.com
                    </h1>
                    <h1 className="font-normal">
                      <span className="font-semibold">Phone:</span>{" "}
                      +88012342-82348
                    </h1>
                  </div>
                </TableCell>
                <TableCell>
                  {Array.from({ length: 3 }).map(() => (
                    <div>
                      <span className="font-medium">Augmentin</span>{" "}
                      <sub>(3)</sub>
                    </div>
                  ))}
                </TableCell>
                <TableCell>$234.34</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>
                  <div
                    className={"mt-1 text-xs flex flex-col font-medium gap-1.5"}
                  >
                    <span>67e183cb5d6e235d001caf0a</span>
                    <span>pi_3R6DZBJHnPc6ZjSU1QATGFVv</span>
                  </div>
                </TableCell>
                <TableCell>2/27/2025</TableCell>
                <TableCell>
                  {" "}
                  <span
                    className={`px-2 py-1 text-base font-medium rounded ${
                      status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : status === "Shipped"
                        ? "bg-blue-100 text-blue-600"
                        : status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : ""
                    }`}
                  >
                    {status}
                  </span>
                </TableCell>
                <TableCell>
                  <div>{"Uttara, Sector-4"}</div>
                  <div>
                    {"Dhaka"}, {"Dhaka"} - {1230}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={status}
                    // onValueChange={(newStatus) =>
                    //   onStatusChange(orderId, newStatus)
                    // }
                  >
                    <SelectTrigger>
                      <SelectValue>{status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant={"outline"}>
                    <FaEye />
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

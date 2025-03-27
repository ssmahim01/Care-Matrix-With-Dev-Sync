import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
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

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaEye } from "react-icons/fa";

const status = "Delivered";

const ManageOrders = () => {
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
            {Array.from({ length: 6 }).map((idx) => (
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
                  <div className={"flex items-center gap-1"}>
                    <span
                      className={`text-base font-medium rounded ${
                        status === "Pending"
                          ? " text-yellow-600"
                          : status === "Shipped"
                          ? " text-blue-600"
                          : status === "Delivered"
                          ? " text-green-600"
                          : ""
                      }`}
                    >
                      ●
                    </span>{" "}
                    <span className="font-medium mt-[1px]">{status}</span>
                  </div>
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
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue>{status}</SelectValue>
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

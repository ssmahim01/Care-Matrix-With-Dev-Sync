import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TopCustomerTable = ({ topCustomers }) => {
  return (
    <Table className={"p-6"}>
      <TableCaption>A List Of Top Customer</TableCaption>
      <TableHeader>
        <TableRow className={"bg-base-200 hover:bg-base-200"}>
          <TableHead className={"px-6"}>Name</TableHead>
          <TableHead className={"px-6"}>Email</TableHead>
          <TableHead className={"px-6"}>UID</TableHead>
          <TableHead className={"px-6"}>Phone</TableHead>
          <TableHead className={"px-6"}>Orders</TableHead>
          <TableHead className={"px-6"}>Total Spent</TableHead>
          <TableHead className={"px-6"}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topCustomers?.map((customer, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell className={"px-6 flex items-center gap-4"}>
                <img
                  src={customer?.photo}
                  alt={customer?.name}
                  className="w-14 h-14 rounded-full object-cover"
                />{" "}
                {customer?.name}
              </TableCell>
              <TableCell className={"px-6"}>{customer?.email}</TableCell>
              <TableCell className={"px-6"}>{customer?.uid}</TableCell>
              <TableCell className={"px-6"}>{customer?.phone}</TableCell>
              <TableCell className={"px-6"}>
                {customer?.totalOrders} <sub>(Total)</sub>
              </TableCell>
              <TableCell className={"px-6"}>
                ৳ {customer?.totalSpent.toFixed(2)}
              </TableCell>
              <TableCell className={"px-6"}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="bg-base-200 p-2 rounded border border-border w-fit cursor-pointer">
                      <MoreVertical className="text-gray-700" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TopCustomerTable;

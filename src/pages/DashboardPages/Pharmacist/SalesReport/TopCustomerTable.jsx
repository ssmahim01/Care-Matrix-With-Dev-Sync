// TopCustomerTable.jsx
import { User, Star, BadgeCheck, ShoppingBag } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import CustomerModal from "@/components/Modal/CustomerModal";
import { Separator } from "@/components/ui/separator";

const TopCustomerTable = ({ topCustomers }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const topThree = topCustomers?.slice(0, 3) || [];
  const otherCustomers = topCustomers?.slice(3) || [];
  // console.log(discount);

  return (
    <div className="grid grid-cols-1 gap-6 p-4">
      {/* Left Column - Top 3 Customers in Cards */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 :w-11/12 mx-auto">
          {topThree.map((customer, idx) => (
            <Card
              key={idx}
              className="bg-gradient-to-br from-base-100 to-base-200 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary flex flex-col items-center pb-4"
            >
              <div className="w-full flex justify-between items-center px-4 pt-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                  #{idx + 1}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="bg-base-100 p-2 rounded-full border border-border w-fit cursor-pointer hover:bg-base-200"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <User className="" />
                    </div>
                  </DialogTrigger>
                  {selectedCustomer?._id === customer._id && (
                    <CustomerModal customer={customer} />
                  )}
                </Dialog>
              </div>

              <div className="-mt-10">
                <img
                  src={customer?.photo}
                  alt={customer?.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                />
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold flex items-center justify-center gap-1">
                  {customer?.name}{" "}
                  {customer?.totalOrders > 10 && (
                    <BadgeCheck className="h-4 mt-1 w-4 text-primary" />
                  )}
                </h3>
                <p className="text-base text-gray-600 font-medium">
                  {customer?.email}
                </p>
                <p className="text-sm font-medium mt-1 text-muted-foreground">
                  {customer?.uid}
                </p>
              </div>
              <Separator />
              <CardContent className="w-full md:w-2/3">
                <div className="flex gap-4 justify-between items-center">
                  <div className="justify-center text-center">
                    <p className="text-sm text-muted-foreground">
                      Total Orders
                    </p>
                    <p className="font-medium flex justify-center items-center">
                      {" "}
                      <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                      {customer?.totalOrders}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="font-medium">
                      ৳ {customer?.totalSpent.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column - Other Customers in Table */}
      <div>
        <Table className="bg-base-100 rounded-lg shadow-md mt-2">
          <TableCaption>A List Of Top Customers</TableCaption>
          <TableHeader>
            <TableRow className="bg-base-200 hover:bg-base-200">
              <TableHead className="px-6">Name</TableHead>
              <TableHead className="px-6">Email</TableHead>
              <TableHead className="px-6">UID</TableHead>
              <TableHead className="px-6">Orders</TableHead>
              <TableHead className="px-6">Total Spent</TableHead>
              <TableHead className="px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {otherCustomers.map((customer, idx) => (
              <TableRow
                key={idx}
                className="hover:bg-base-50 transition-colors"
              >
                <TableCell className="px-6 flex items-center gap-4">
                  <img
                    src={customer?.photo}
                    alt={customer?.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {customer?.name}
                </TableCell>
                <TableCell className="px-6">{customer?.email}</TableCell>
                <TableCell className="px-6">{customer?.uid}</TableCell>
                <TableCell className="px-6">{customer?.totalOrders}</TableCell>
                <TableCell className="px-6">
                  ৳ {customer?.totalSpent.toFixed(2)}
                </TableCell>
                <TableCell className="px-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div
                        className="bg-base-200 p-2 rounded-full border border-border w-fit cursor-pointer hover:bg-base-300"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <User className="text-gray-700" />
                      </div>
                    </DialogTrigger>
                    {selectedCustomer?._id === customer._id && (
                      <CustomerModal customer={customer} />
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TopCustomerTable;

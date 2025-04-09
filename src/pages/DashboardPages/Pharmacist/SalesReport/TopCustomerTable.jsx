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
          <TableHead className={"px-6"}>Phone</TableHead>
          <TableHead className={"px-6"}>Orders</TableHead>
          <TableHead className={"px-6"}>Total Spent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topCustomers?.map((customer, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell className={"px-6"}>{customer?.name}</TableCell>
              <TableCell className={"px-6"}>{customer?.email}</TableCell>
              <TableCell className={"px-6"}>{customer?.phone}</TableCell>
              <TableCell className={"px-6"}>
                {customer?.totalOrders} <sub>(Total)</sub>
              </TableCell>
              <TableCell className={"px-6"}>
                ৳ {customer?.totalSpent.toFixed(2)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TopCustomerTable;

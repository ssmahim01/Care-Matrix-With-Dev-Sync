import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PerformanceTable = ({ topSellingMedicines, totalItems }) => {
  return (
    <Table>
      <TableCaption>A List Of Medicine Performance Rankings</TableCaption>
      <TableHeader>
        <TableRow className={"bg-base-200 hover:bg-base-200"}>
          <TableHead className="px-6">Rank</TableHead>
          <TableHead className="px-6">Medicine</TableHead>
          <TableHead className="px-6">Quantity Sold</TableHead>
          <TableHead className="px-6">% of Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topSellingMedicines?.map((medicine, index) => (
          <TableRow
            key={medicine.medicine}
            className={index % 2 === 0 ? "bg-muted/20" : ""}
          >
            <TableCell className="px-6 font-medium">{index + 1}</TableCell>
            <TableCell className="px-6">{medicine.medicine}</TableCell>
            <TableCell className="px-6">{medicine.totalQty}</TableCell>
            <TableCell className="px-6">
              {((medicine.totalQty / totalItems) * 100).toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PerformanceTable;

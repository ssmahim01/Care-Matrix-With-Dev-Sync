import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
const SupplierTable = ({ medicinesPerSupplier }) => {
  const maxCount = Math.max(...medicinesPerSupplier?.map((s) => s?.count));
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier</TableHead>
            <TableHead className="text-right">Count</TableHead>
            <TableHead>Distribution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicinesPerSupplier?.map((supplier) => (
            <TableRow key={supplier?.supplier}>
              <TableCell className="font-medium">
                {supplier?.supplier}
              </TableCell>
              <TableCell className="text-right">{supplier?.count}</TableCell>
              <TableCell>
                <Progress
                  value={(supplier?.count / maxCount) * 100}
                  className="h-2"
                  indicatorClassName="bg-blue-600"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SupplierTable;

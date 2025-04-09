import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const ManufacturersTable = ({ medicinesPerManufacturer }) => {
  const maxCount = Math.max(...medicinesPerManufacturer?.map((m) => m?.count));
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Manufacturer</TableHead>
            <TableHead className="text-right">Count</TableHead>
            <TableHead>Distribution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicinesPerManufacturer?.map((manufacturer) => (
            <TableRow key={manufacturer?.manufacturer}>
              <TableCell className="font-medium">
                {manufacturer?.manufacturer}
              </TableCell>
              <TableCell className="text-right">
                {manufacturer?.count}
              </TableCell>
              <TableCell>
                <Progress
                  value={(manufacturer?.count / maxCount) * 100}
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

export default ManufacturersTable;

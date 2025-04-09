import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Thermometer, Droplets, Sun } from "lucide-react";

const StorageConditionsTable = ({ storageConditionStats }) => {
  return (
    <div className="rounded-md border max-h-130 overflow-y-auto">
      {" "}
      {/* Add height & y-scroll */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"px-5"}>Storage Condition</TableHead>
            <TableHead className="text-right w-16 px-5">Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {storageConditionStats?.map((condition) => {
            const icons = [Thermometer, Droplets, Sun];
            const Icon = icons[Math.floor(Math.random() * icons.length)];
            return (
              <TableRow key={condition.condition}>
                <TableCell className="font-medium px-5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-blue-500" />
                    <span className="text-xs">{condition.condition}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right px-5">
                  {condition.count}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StorageConditionsTable;

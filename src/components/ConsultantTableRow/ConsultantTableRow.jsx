import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { FaCircle } from "react-icons/fa";

const ConsultantTableRow = ({ consultant, index }) => {
  return (
    <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <img
          src={consultant?.image}
          alt={consultant?.name}
          className="w-14 h-14 object-cover rounded"
          referrerPolicy="no-referrer"
        />
      </TableCell>
      <TableCell className="font-medium">{consultant?.name}</TableCell>
      <TableCell>{consultant?.title}</TableCell>
      <TableCell>{consultant?.experience}</TableCell>
      <TableCell>
        {consultant?.schedule
          ? new Date(consultant?.schedule).toLocaleString()
          : "N/A"}
      </TableCell>
      <TableCell>{consultant?.consultation_fee}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm p-1 rounded-full ${
              consultant?.available_days.length < 0
                ? "bg-rose-500"
                : "bg-green-600"
            } text-white`}
          >
            <FaCircle size={7} />
          </span>
          <span className="capitalize text-sm font-medium text-foreground">
            {consultant?.available_days.length > 0 ? "Available" : "N/A"}{" "}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="cursor-pointer" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer items-center"
              //   onClick={() => handleView(request)}
            >
              <Eye className="h-5 w-5" />
              <span>View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:text-destructive flex gap-2 items-center">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default ConsultantTableRow;

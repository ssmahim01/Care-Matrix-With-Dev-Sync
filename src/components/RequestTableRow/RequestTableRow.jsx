import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { BookmarkX, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RequestTableRow = ({
  request,
  index,
  handleCancelRequest,
  handleDeleteRequest,
  handleView,
}) => {
  return (
    <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <img
          src={request?.userPhoto}
          alt={request?.userName}
          className="w-20 md:h-14 h-12 rounded"
        />
      </TableCell>
      <TableCell className="font-medium">{request?.userName}</TableCell>
      <TableCell>{request?.userEmail}</TableCell>
      <TableCell>{request?.contactNumber}</TableCell>
      <TableCell>{request?.shift}</TableCell>
      <TableCell>
        {new Date(request?.requestDate).toLocaleDateString("en-UK")}
      </TableCell>
      <TableCell>{request?.department}</TableCell>
      <TableCell>{request?.requestedRole}</TableCell>
      <TableCell>
        <Badge
          className={`
            font-bold text-white min-w-20
            ${request?.status === "Pending" && "bg-amber-500"}
            ${request?.status === "Reject" && "bg-rose-500"}
            ${request?.status === "Assign" && "bg-green-600"}
            ${request?.status === "Cancel" && "bg-red-500"}
          `}
        >
          {request?.status === "Pending" && "Pending"}
          {request?.status === "Reject" && "Rejected"}
          {request?.status === "Assign" && "Assigned"}
          {request?.status === "Cancel" && "Cancelled"}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="cursor-pointer" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer items-center"
              onClick={() => handleView(request)}
            >
              <Eye className="h-5 w-5" />
              <span>View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={request?.status === "Cancel"}
              className="cursor-pointer disabled:cursor-not-allowed focus:text-destructive flex gap-2 items-center"
              onClick={() => handleCancelRequest(request?._id)}
            >
              <BookmarkX className="w-4 h-4" />
              <span>Cancel Request</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer focus:text-destructive duration-300 flex gap-2 items-center"
              onClick={() => handleDeleteRequest(request?._id)}
            >
              <Trash2 className="h-4 w-4 focus:text-destructive duration-300" />
              <span>Delete Request</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default RequestTableRow;

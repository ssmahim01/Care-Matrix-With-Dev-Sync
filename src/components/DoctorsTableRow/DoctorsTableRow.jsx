import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  deleteDoctor,
  deleteSpecificDoctor,
} from "@/redux/doctors/doctorSlice";

import {
  BookmarkX,
  EllipsisVertical,
  NotebookPen,
  NotebookTabs,
} from "lucide-react";

import moment from "moment";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Swal from "sweetalert2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DoctorsTableRow = ({
  doctor,
  index,
  dispatch,
  handleAddNote,
  handleDoctorDetails,
}) => {
  const handleDeleteDoctor = async (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot retrieve this doctor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await dispatch(deleteDoctor(id));
        const removeDoctor = await dispatch(deleteSpecificDoctor(email));
        if (response && removeDoctor) {
          toast.success("Doctor has been removed");
        }
      }
    });
  };

  return (
    <>
      <TableRow
        key={doctor?._id}
        className="hover:bg-gray-50 transition-colors"
      >
        <TableCell className="px-4 py-3 font-medium">{index + 1}</TableCell>
        <TableCell className="px-4 py-3">
          <Avatar className="w-12 h-12 rounded-md">
            <AvatarImage
              src={doctor?.userPhoto}
              alt={doctor?.userName}
              className="object-cover"
            />
            <AvatarFallback className="text-gray-700 font-semibold rounded-md">
              {doctor?.userName?.charAt(0).toUpperCase() || "D"}
            </AvatarFallback>
          </Avatar>
        </TableCell>
        <TableCell className="px-4 max-w-[130px] truncate">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <span>{doctor?.userName}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{doctor?.userName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="px-4 max-w-[150px] truncate">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <span>{doctor?.userEmail}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{doctor?.userEmail}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="px-4 py-3">{doctor?.contactNumber}</TableCell>
        <TableCell className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                doctor?.status === "Pending"
                  ? "bg-yellow-400"
                  : doctor?.status === "Assign"
                  ? "bg-blue-400"
                  : doctor?.status === "Reject"
                  ? "bg-red-400"
                  : "bg-gray-400"
              }`}
            />
            <span className="text-gray-700 font-medium">
              {doctor?.requestedRole}
            </span>
          </div>
        </TableCell>
        <TableCell className="px-4 py-3">{doctor?.department}</TableCell>
        <TableCell className="px-4 py-3 text-sm">
          {moment(doctor?.requestDate).fromNow()}
        </TableCell>
        <TableCell className="px-4 py-3">{doctor?.shift}</TableCell>
        <TableCell className="px-4 py-3">
          <Badge
            className={`px-3 py-1 font-semibold rounded-full ${
              doctor?.status === "Pending"
                ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                : doctor?.status === "Assign"
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : doctor?.status === "Reject"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {doctor?.status === "Pending"
              ? "Pending"
              : doctor?.status === "Assign"
              ? "Assigned"
              : doctor?.status === "Reject"
              ? "Rejected"
              : "Unknown"}
          </Badge>
        </TableCell>
        <TableCell className="px-4 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="cursor-pointer p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                size="icon"
              >
                <EllipsisVertical className="w-5 h-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white shadow-lg rounded-lg p-1"
            >
              <DropdownMenuItem
                className="cursor-pointer hover:bg-red-50 text-red-600 font-medium flex gap-2 items-center rounded-md px-3 py-2"
                onClick={() =>
                  handleDeleteDoctor(doctor?._id, doctor?.userEmail)
                }
              >
                <BookmarkX className="w-4 h-4" />
                <span>Remove</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100 font-medium flex gap-2 items-center  rounded-md px-3 py-2"
                onClick={() => handleAddNote(doctor)}
              >
                <NotebookPen className="w-4 h-4" />
                <span>Add Note</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100 font-medium flex gap-2 items-center rounded-md px-3 py-2"
                onClick={() => handleDoctorDetails(doctor)}
              >
                <NotebookTabs className="w-4 h-4" />
                <span>View Details</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DoctorsTableRow;

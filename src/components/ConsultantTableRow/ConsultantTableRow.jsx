import {
  CalendarCheck2,
  EllipsisVertical,
  FileUser,
  Trash2,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { FaCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { removeSpecificDoctor } from "@/redux/doctors/consultantSlice";
import InfoModal from "../DoctorInfoModal/InfoModal";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ConsultantTableRow = ({
  consultant,
  dispatch,
  index,
  handleChangeAvailability,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleRemove = (id) => {
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
        const removeDoctor = await dispatch(removeSpecificDoctor(id));
        if (removeDoctor) {
          toast.success("Doctor has been removed");
        }
      }
    });
  };

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
      <TableCell>
        <div className="font-medium flex flex-col gap-1">
          <h6>
            Name: <span className="font-normal">{consultant?.name}</span>
          </h6>
          <h6>
            Email: <span className="font-normal">{consultant?.email}</span>
          </h6>
        </div>
      </TableCell>
      <TableCell>{consultant?.title}</TableCell>
      <TableCell>{consultant?.experience}</TableCell>
      <TableCell>
        {consultant?.schedule
          ? new Date(consultant?.schedule).toLocaleDateString("en-UK")
          : "N/A"}
      </TableCell>
      <TableCell className="max-w-18 truncate">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <span>{consultant?.shift}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{consultant?.shift}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="cursor-pointer border"
              size="icon"
            >
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer flex gap-2 items-center"
              onClick={(e) => {
                e.preventDefault();
                setOpenDialog(true);
              }}
            >
              <FileUser className="w-4 h-4" />
              <span>Doctor Profile</span>
            </DropdownMenuItem>

            <InfoModal
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              consultant={consultant}
            />

            <DropdownMenuItem
              className="cursor-pointer flex gap-2 items-center"
              onClick={() => handleChangeAvailability(consultant)}
            >
              <CalendarCheck2 className="w-4 h-4" />
              <span>Change Availability</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer focus:text-destructive flex gap-2 items-center"
              onClick={() => handleRemove(consultant?._id)}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Doctor</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default ConsultantTableRow;

import { deleteDoctor } from "@/redux/doctors/doctorSlice";
import {
  BookmarkX,
  EllipsisVertical,
  NotebookPen,
  NotebookTabs,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { TableCell } from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const DoctorsTableRow = ({ doctor, index, dispatch, handleAddNote, handleDoctorDetails }) => {
  const handleDeleteDoctor = async (id) => {
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
        if (response) {
          toast.success("Doctor has been removed");
        }
      }
    });
  };

  return (
    <>
      <tr
        className={`${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:shadow-lg hover:bg-gray-100 transition duration-200 text-gray-700 font-semibold border border-gray-200`}
      >
        <th>{index + 1}</th>
        <td>
          <img
            className="w-14 h-14 rounded-md object-cover"
            src={doctor?.userPhoto}
            alt={doctor?.userName}
          />
        </td>
        <td>{doctor?.userName}</td>
        <td>{doctor?.userEmail}</td>
        <td>{doctor?.contactNumber}</td>
        <td>
          <p className="flex gap-2 items-center">
            <span
              className={`rounded-full w-2 h-2 shadow-md ${
                doctor?.status === "Pending" && "bg-amber-500"
              } ${doctor?.status === "Assign" && "bg-sky-500"} ${
                doctor?.status === "Reject" && "bg-rose-500"
              }`}
            ></span>
            <span>{doctor?.requestedRole}</span>
          </p>
        </td>
        <td>{doctor?.department}</td>
        <td>{new Date(doctor?.requestDate).toLocaleDateString("en-UK")}</td>
        <td>{doctor?.shift}</td>
        <td>
          <p
            className={`w-full border p-2 ${
              doctor?.status === "Pending" && "badge text-amber-500"
            } ${doctor?.status === "Cancel" && "badge text-error"} ${
              doctor?.status === "Assign" && "badge text-success"
            }`}
          >
            {(doctor?.status === "Pending" && "Pending") ||
              (doctor?.status === "Cancel" && "Cancelled") ||
              (doctor?.status === "Assign" && "Assigned")}
          </p>
        </td>
        <TableCell className={"lg:py-4 py-10"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="cursor-pointer border p-2"
                size="icon"
              >
                <EllipsisVertical className="w-5 h-10" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer disabled:cursor-not-allowed focus:text-destructive flex gap-2 items-center"
                onClick={() => handleDeleteDoctor(doctor?._id)}
              >
                <BookmarkX className="w-4 h-4" />
                <span>Remove</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer disabled:cursor-not-allowed flex gap-2 items-center"
                onClick={() => handleAddNote(doctor)}
              >
                <NotebookPen className="w-4 h-4" />
                <span>Add Note</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer disabled:cursor-not-allowed flex gap-2 items-center"
                onClick={() => handleDoctorDetails(doctor)}
              >
                <NotebookTabs className="w-4 h-4" />
                <span>View Details</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </tr>
    </>
  );
};

export default DoctorsTableRow;

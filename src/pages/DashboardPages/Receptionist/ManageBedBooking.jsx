import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loader from "@/shared/Loader";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, MoreVertical, Pencil, Trash } from "lucide-react";
import { LuBedSingle } from "react-icons/lu";
import Swal from "sweetalert2";
import { FaCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ManageBedBooking() {
  const axiosSecure = useAxiosSecure();

  // Fetching bed data using useQuery
  const {
    data: bed_booking = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bed_booking"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/bed-booking");
      //   console.log(data);
      return data;
    },
  });

  // Handle bed status change
  const handleBedStatusChange = async (id, bedId, newStatus, bedStatus) => {
    await toast.promise(
      axiosSecure.patch(`/bed-booking/status/${id}`, { status: newStatus }),
      {
        loading: "Updating status...",
        success: <b>Bed Booking Status Updated Successfully!</b>,
        error: <b>Could not update booking status.</b>,
      }
    );

    // Update bed status
    await toast.promise(
      axiosSecure.patch(`/beds/status/${bedId}`, { status: bedStatus }),
      {
        loading: "Updating bed status...",
        success: <b>Bed Status Updated Successfully!</b>,
        error: <b>Could not update bed status.</b>,
      }
    );
    // Refetch data
    refetch();
  };

  // Handle bed deletion
  const handleBedDelete = (id, bedId) => {
    toast(
      t => (
        <div className="flex gap-3 items-center">
          <div>
            <p>
              Are you <b>sure?</b>
            </p>
          </div>
          <div className="gap-2 flex">
            <button
              className="bg-red-400 text-white px-3 py-1 rounded-md"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  toast.loading("Deleting bed booking...", { position: "top-right" });
                  const { data } = await axiosSecure.delete(`/bed-booking/delete/${id}`);
                  
                  if (data.deletedCount) {
                    // Update bed status to available
                    await toast.promise(
                      axiosSecure.patch(`/beds/status/${bedId}`, { status: "available" }),
                      {
                        loading: "Updating bed status...",
                        success: <b>Bed status updated successfully!</b>,
                        error: <b>Could not update bed status.</b>,
                      },
                      { position: "top-right" }
                    );
                    
                    refetch();
                    toast.dismiss();
                    toast.success("Bed booking deleted successfully!", { position: "top-right" });
                  } else {
                    toast.dismiss();
                    toast.error("No bed booking was deleted.", { position: "top-right" });
                  }
                } catch (error) {
                  toast.dismiss();
                  toast.error(error.message || "Failed to delete the bed booking!", { position: "top-right" });
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-400 text-white px-3 py-1 rounded-md"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { position: "top-right" }
    );
  };

  return (
    <div className="px-7">
      <DashboardPagesHeader
        title={"Bed Booking Requests"}
        subtitle={"View And Manage All Bed Booking Requests"}
        icon={LuBedSingle}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="mx-auto">
          <Table>
            <TableCaption>A List of All Bed Booking Request</TableCaption>
            <TableHeader>
              <TableRow className="bg-base-200 hover:bg-base-200">
                <TableHead className="w-12">#</TableHead>
                <TableHead className={"text-xs"}>
                  Bed <br /> Image
                </TableHead>
                <TableHead className={"text-xs"}>Bed Title</TableHead>
                <TableHead className={"text-xs"}>Price</TableHead>
                <TableHead className={"text-xs"}>Requested Email</TableHead>
                <TableHead className={"text-xs"}>
                  Requested <br />
                  Time
                </TableHead>
                <TableHead className={"text-xs"}>Patient Info</TableHead>
                <TableHead className={"text-xs"}>Admission Date</TableHead>
                <TableHead className={"text-xs"}>Reason</TableHead>
                <TableHead className={"text-xs"}>Status</TableHead>
                <TableHead className="text-right text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 11 }).map((_, j) => (
                      <TableCell key={j}>
                        <div className="skeleton h-8 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : bed_booking?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    className="text-center font-semibold py-10"
                  >
                    No Bed Booking Requests Found
                  </TableCell>
                </TableRow>
              ) : (
                bed_booking?.map((bed, i) => (
                  <TableRow key={bed?._id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={bed?.bedImg}
                          className={"object-cover"}
                        />
                        <AvatarFallback>{bed?.bedTitle}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className={"max-w-32 truncate"}>
                      {bed?.bedTitle}
                    </TableCell>
                    <TableCell>{bed?.bedPrice}</TableCell>
                    <TableCell className={"max-w-50 truncate"}>
                      {bed?.authorEmail}
                    </TableCell>
                    <TableCell className="text-blue-500 font-semibold">
                      {bed?.time && moment(bed?.time).fromNow()}
                    </TableCell>
                    <TableCell>
                      <div className={"flex flex-col space-y-0.5"}>
                        <span className="font-semibold text-xs">
                          Age: <span className="font-normal">{bed?.age}</span>
                        </span>
                        <span className="font-semibold text-xs">
                          Name:{" "}
                          <span className="font-normal">
                            {bed?.patientName}
                          </span>
                        </span>
                        <span className="font-semibold text-xs">
                          Phone:{" "}
                          <span className="font-normal">
                            {bed?.contactNumber}
                          </span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{bed?.admissionDate}</TableCell>
                    <TableCell>
                      <Tooltip className={"cursor-pointer"}>
                        <TooltipTrigger className={"max-w-30 truncate cursor-pointer"}>
                          {bed?.bookingReason}
                        </TooltipTrigger>
                        <TooltipContent className={"cursor-pointer"}>
                          {bed?.bookingReason}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs p-1 rounded-full ${
                            bed?.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-green-600"
                          } text-white`}
                        >
                          <FaCircle size={7} />
                        </span>
                        <span className="capitalize text-sm font-medium text-gray-700">
                          {bed?.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="flex justify-end">
                      {bed?.status === "pending" ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="bg-base-200 p-2 mx-0 rounded border border-border w-fit">
                              <MoreVertical className="cursor-pointer text-gray-700" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                handleBedStatusChange(
                                  bed?._id,
                                  bed?.bedId,
                                  "accepted",
                                  "booked"
                                )
                              }
                              className="cursor-pointer"
                            >
                              <Check className="w-4 h-4 mr-2" /> Accept Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleBedDelete(bed?._id, bed?.bedId)
                              }
                              className="cursor-pointer"
                            >
                              <Trash className="w-4 h-4 mr-2 text-red-500" />{" "}
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="bg-base-200 p-2 mx-0 rounded border border-border w-fit">
                              <MoreVertical className="cursor-pointer text-gray-700" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                handleBedStatusChange(
                                  bed?._id,
                                  bed?.bedId,
                                  "pending",
                                  "requested"
                                )
                              }
                              className="cursor-pointer"
                            >
                              <MdPendingActions className="w-4 h-4 mr-2" /> Make
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleBedDelete(bed?._id, bed?.bedId)
                              }
                              className="cursor-pointer"
                            >
                              <Trash className="w-4 h-4 mr-2 text-red-500" />{" "}
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}

export default ManageBedBooking;

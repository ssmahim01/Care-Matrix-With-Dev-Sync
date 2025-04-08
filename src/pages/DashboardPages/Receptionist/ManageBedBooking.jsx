import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
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
import { RiAdvertisementFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Swal from "sweetalert2";

function ManageBedBooking() {
  const axiosSecure = useAxiosSecure();

  // Using your sample data renamed as bed_booking_data
  const bed_booking_data = [{
    _id: "67e39ac72af1f1267b1b20ac",
    bedTitle: "Testing bed 1",
    bedImg: "https://i.ibb.co/cKVvHWvj/Testing-Bed1.webp",
    bedPrice: "$20",
    patientName: "Kader",
    age: "22",
    contactNumber: "01233333333",
    admissionDate: "2025-03-28",
    time: "2025-03-26T06:12:23.586Z",
    authorName: "Wolverine K !!",
    authorImage: "https://lh3.googleusercontent.com/a/ACg8ocIs-7PoUHyGa8noBY5-xwxHWiRHt7…",
    authorEmail: "sayed0162714@gmail.com",
    status: "pending"
  }];

  const {
    data: beds = bed_booking_data,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bed_booking"],
    queryFn: async () => {
      // You can uncomment this to fetch from API instead
      // const { data } = await axiosSecure.get("/bed_booking");
      // return data;
      return bed_booking_data;
    },
  });

  // Handle bed status change
  const handleBedStatusChange = async (id, newStatus) => {
    await toast.promise(
      axiosSecure.patch(`/bed_booking/status/${id}`, { status: newStatus }),
      {
        loading: "Updating status...",
        success: <b>Bed Booking Status Updated Successfully!</b>,
        error: <b>Could not update status.</b>,
      }
    );
    refetch();
  };

  // Handle bed deletion
  const handleBedDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the bed booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(`/bed_booking/delete/${id}`);
        if (data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Bed booking has been deleted successfully!",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to delete the bed booking!",
          icon: "error",
          background: "#ffffff",
          color: "#000000",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  if (isLoading) return <Loader text={"Loading Bed Bookings"} />;

  return (
    <div className="p-7">
      <DashboardPagesHeader
        title={"Manage Bed Bookings"}
        subtitle={"View and manage all bed bookings"}
        icon={RiAdvertisementFill}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="mx-auto">
          <Table>
            <TableCaption>A List of All Bed Bookings</TableCaption>
            <TableHeader>
              <TableRow className="bg-base-200 hover:bg-base-200">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Bed Image</TableHead>
                <TableHead>Bed Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beds?.map((bed, i) => (
                <TableRow key={bed._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={bed.bedImg} />
                      <AvatarFallback>{bed.bedTitle[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{bed.bedTitle}</TableCell>
                  <TableCell>{bed.bedPrice}</TableCell>
                  <TableCell>{bed.patientName}</TableCell>
                  <TableCell>{bed.admissionDate}</TableCell>
                  <TableCell>
                    <Tooltip className="cursor-pointer">
                      <TooltipTrigger>
                        <Switch
                          className="cursor-pointer"
                          checked={bed.status === "approved"}
                          onCheckedChange={(checked) => {
                            const newStatus = checked ? "approved" : "pending";
                            handleBedStatusChange(bed._id, newStatus);
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>
                          {bed.status === "approved"
                            ? "Mark as Pending"
                            : "Mark as Approved"}
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="bg-base-200 p-2 mx-0 rounded border border-border w-fit">
                          <MoreVertical className="cursor-pointer text-gray-700" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer">
                          <Pencil className="w-4 h-4 mr-2" /> Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleBedDelete(bed._id)}
                          className="cursor-pointer"
                        >
                          <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}

export default ManageBedBooking;
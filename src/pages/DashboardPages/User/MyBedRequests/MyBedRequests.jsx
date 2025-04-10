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

import { Check, MoreVertical, Pencil, Trash } from "lucide-react";
import { LuBedSingle } from "react-icons/lu";
import Swal from "sweetalert2";
import { FaCircle } from "react-icons/fa";

import moment from "moment";
import { useAuthUser } from "@/redux/auth/authActions";

function MyBedRequests() {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();

  //    console.log(user?.email);

  // Fetching bed data using useQuery
  const {
    data: bed_booking = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my_bed_booking", user?.email],

    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bed-booking/${user?.email}`);
      //   console.log(data);
      return data;
    },
    enabled: !!user?.email,
  });

  // Handle bed deletion
  const handleBedDelete = async (id, bedId) => {
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
        const { data } = await axiosSecure.delete(`/bed-booking/delete/${id}`);
        if (data.deletedCount) {
          //   change the bed status to available
          await toast.promise(
            axiosSecure.patch(`/beds/status/${bedId}`, { status: "available" }),
            {
              loading: "Updating bed status...",
              success: <b>Bed Status Updated Successfully!</b>,
              error: <b>Could not update bed status.</b>,
            }
          );

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
        title={"Manage My Bed Booking Requests"}
        subtitle={"View and manage all bed booking Requests"}
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
                <TableHead>Bed Image</TableHead>
                <TableHead>Bed Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Requested Time</TableHead>

                <TableHead>Patient Name</TableHead>
                <TableHead>Patient Age</TableHead>
                <TableHead>Patient Number</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bed_booking?.map((bed, i) => (
                <TableRow key={bed._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={bed.bedImg} />
                      <AvatarFallback>{bed.bedTitle}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{bed.bedTitle}</TableCell>
                  <TableCell>{bed.bedPrice}</TableCell>
                  <TableCell className="text-blue-500 font-semibold">
                    {bed.time && moment(bed.time).fromNow()}
                  </TableCell>
                  <TableCell>{bed.patientName}</TableCell>
                  <TableCell>{bed.age}</TableCell>
                  <TableCell>{bed.contactNumber}</TableCell>
                  <TableCell>{bed.admissionDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs p-1 rounded-full ${
                          bed.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        } text-white`}
                      >
                        <FaCircle size={7} />
                      </span>
                      <span className="capitalize text-sm font-medium text-gray-700">
                        {bed.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div
                      onClick={() => handleBedDelete(bed._id, bed.bedId)}
                      className="cursor-pointer flex items-center justify-center"
                    >
                      <Trash className="w-5 h-5 text-red-500" />
                    </div>
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

export default MyBedRequests;

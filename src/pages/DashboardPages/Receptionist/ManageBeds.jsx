
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import toast from "react-hot-toast";

import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { RiAdvertisementFill } from "react-icons/ri";
import AddBooking from "./AddBooking";
import useBeds from "@/hooks/useBeds";

function ManageBeds() {
  const [isOpen, setIsOpen] = useState(false);
  const [beds, isLoading, refetch] = useBeds({ isActive: "all" });
  const axiosSecure = useAxiosSecure();

//   console.log(beds);

  const handleBedStatusChange = async (id, newStatus) => {
    await toast.promise(
      axiosSecure.patch(`/beds/status/${id}`, { status: newStatus }),
      {
        loading: "Updating status...",
        success: <b>Bed Status Updated Successfully!</b>,
        error: <b>Could not update status.</b>,
      }
    );
    refetch();
  };

  if (isLoading) return <Loader text={"Loading Bookings"} />;

  return (
    <div>
      <DashboardPagesHeader
        title={"Manage Bed Bookings"}
        subtitle={"View, approve, or reject bed booking requests"}
        icon={RiAdvertisementFill}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="mx-auto">
          <div className="flex justify-end mb-4">
            <Button className="cursor-pointer" onClick={() => setIsOpen(true)}>
              Add New Booking
            </Button>
          </div>
          <Table>
            <TableCaption>A List of All Bed Booking Requests</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Bed Image</TableHead>
                <TableHead>Bed Title</TableHead>
                <TableHead>Bed Price</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beds?.map((bed, i) => (
                <TableRow key={bed._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={bed.image} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{bed.title}</TableCell>
                  <TableCell>{bed.price}</TableCell>
                  <TableCell className="text-right flex justify-end">
                    <Switch
                      checked={bed.status === "active"}
                      onCheckedChange={(checked) => {
                        const newStatus = checked ? "active" : "inactive";
                        handleBedStatusChange(bed._id, newStatus);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Modal */}
          <AddBooking isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />
        </div>
      </motion.div>
    </div>
  );
}

export default ManageBeds;
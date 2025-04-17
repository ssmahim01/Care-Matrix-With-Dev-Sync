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
import { useQuery } from "@tanstack/react-query";
import AddBeds from "./AddBeds";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BedIcon, MoreVertical, Pencil, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Swal from "sweetalert2";

function ManageBeds() {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Fetching bed data using useQuery
  const {
    data: beds = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["beds"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/beds");
      return data;
    },
  });

  // Handle bed status change
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

  // Handle bed deletion
  const handleBedDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the bed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(`/beds/delete/${id}`);
        if (data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Bed has been deleted successfully!",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to delete the bed!",
          icon: "error",
          background: "#ffffff",
          color: "#000000",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  // if (isLoading) return <Loader text={"Loading Beds"} />;

  return (
    <div className="p-7">
      <DashboardPagesHeader
        title={"Manage Beds"}
        subtitle={"View, Add And Manage All Beds"}
        icon={BedIcon}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="mx-auto">
          <div className="flex justify-end mb-4">
            <Button className="cursor-pointer" onClick={() => setIsOpen(true)}>
              Add New Bed
            </Button>
          </div>
          <Table>
            <TableCaption>A List of All Beds</TableCaption>
            <TableHeader>
              <TableRow className="bg-base-200 hover:bg-base-200">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Bed Image</TableHead>
                <TableHead>Bed Title</TableHead>
                <TableHead>Bed Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                isLoading? Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <TableCell key={j}>
                        <div className="skeleton h-8 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                )) :
              
              beds?.map((bed, i) => (
                <TableRow key={bed._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={bed.image} className={"object-cover"} />
                      <AvatarFallback>{bed.title[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{bed.title}</TableCell>
                  <TableCell>{bed.price}</TableCell>
                  <TableCell >
                    <Tooltip className="cursor-pointer">
                      <TooltipTrigger>
                        <Switch
                          className="cursor-pointer"
                          checked={bed.status === "available"}
                          onCheckedChange={(checked) => {
                            const newStatus = checked ? "available" : "booked";
                            handleBedStatusChange(bed._id, newStatus);
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>
                          {bed.status === "available"
                            ? "Mark as Booked"
                            : "Mark as Available"}
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
              ))
            }
            </TableBody>
          </Table>
          {/* Modal */}
          <AddBeds isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />
        </div>
      </motion.div>
    </div>
  );
}

export default ManageBeds;

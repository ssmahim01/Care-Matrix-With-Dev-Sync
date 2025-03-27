import AddBanners from "@/components/Modal/AddBanner";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
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

import { RiAdvertisementFill } from "react-icons/ri";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useBanners from "@/hooks/useBanners";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";

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
import axios from "axios";

function ManageBanners() {
  const [setOpen, setIsOpen] = useState(false);
  const [banners, isLoading, refetch] = useBanners({ isActive: "all" });
  const axiosSecure = useAxiosSecure();

  const handleBannerStatusChange = async (id, newStatus) => {
    await toast.promise(
      axiosSecure.patch(`/banners/status/${id}`, { status: newStatus }),
      {
        loading: "Updating status...",
        success: <b>Banner Status Updated Successfully!</b>,
        error: <b>Could not update status.</b>,
      }
    );
    refetch();
  };

  // Medicine Delete Function
  const handleBannerDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the banner AD!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL}/banners/delete/${id}`
        );
        if (data.data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Banner has been deleted successfully!",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to delete the banner!",
          icon: "error",
          background: "#ffffff",
          color: "#000000",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  return (
    <div className="p-7">
      <DashboardPagesHeader
        title={"Manage Banners"}
        subtitle={"Create, edit, and showcase promotional banners"}
        icon={RiAdvertisementFill}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className=" mx-auto">
          <div className="flex justify-end mb-4">
            <Button className="cursor-pointer" onClick={() => setIsOpen(true)}>
              Add New Banner
            </Button>
          </div>
          <Table>
            <TableCaption>A List Of All Promotional Banners</TableCaption>
            <TableHeader>
              <TableRow className="bg-base-200 hover:bg-base-200">
                <TableHead className="w-12 ">#</TableHead>
                <TableHead className="w-32 ">Image</TableHead>
                <TableHead className="">Name</TableHead>
                <TableHead className="max-w-xs ">Description</TableHead>
                <TableHead className="">Inserted By</TableHead>
                <TableHead className="">Banner Added</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <TableCell key={j}>
                          <div className="skeleton h-8 rounded w-full"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : banners?.map((banner, i) => (
                    <TableRow key={banner?._id}>
                      <TableCell className="">{i + 1}</TableCell>
                      <TableCell className="">
                        <img
                          src={banner?.image}
                          alt="Banner Image"
                          className="min-w-28 h-16 object-cover mx-auto"
                        />
                      </TableCell>
                      <TableCell>{banner?.medicineName}</TableCell>
                      <TableCell className="max-w-xs truncate ">
                        {banner?.description}...
                      </TableCell>
                      <TableCell>{banner?.insertedBy}</TableCell>
                      <TableCell>{banner?.date}</TableCell>
                      <TableCell>
                        <Tooltip className="cursor-pointer">
                          <TooltipTrigger>
                            <Switch
                              className="cursor-pointer"
                              checked={banner?.status === "active"}
                              onCheckedChange={(checked) => {
                                const newStatus = checked
                                  ? "active"
                                  : "inactive";
                                handleBannerStatusChange(
                                  banner?._id,
                                  newStatus
                                );
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>
                              {banner?.status === "active"
                                ? "Deactivate Banner"
                                : "Activate Banner"}
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="">
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
                              onClick={() => handleBannerDelete(banner?._id)}
                              className="cursor-pointer"
                            >
                              <Trash className="w-4 h-4 mr-2 text-red-500" />{" "}
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>

          {/* modal */}
          <AddBanners
            isOpen={setOpen}
            setIsOpen={setIsOpen}
            refetch={refetch}
          ></AddBanners>
        </div>
      </motion.div>
    </div>
  );
}

export default ManageBanners;

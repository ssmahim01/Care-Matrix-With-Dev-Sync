import AddBanners from "@/components/Modal/AddBanner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

import useBanners from "@/hooks/useBanners";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { RiAdvertisementFill } from "react-icons/ri";
import Loader from "@/shared/Loader";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";

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

  if (isLoading) return <Loader text={"Loading Banners"} />;
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
        <div className="mx-auto">
          <div className="flex justify-end mb-4">
            <Button className="cursor-pointer" onClick={() => setIsOpen(true)}>
              Add New Banner
            </Button>
          </div>
          <Table>
            <TableCaption>A List Of All Promotional Banners</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Inserted By</TableHead>
                <TableHead>Banner Added</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners?.map((banner, i) => (
                <TableRow key={banner?._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>

                  <TableCell>
                    <Avatar>
                      <AvatarImage src={banner?.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{banner?.medicineName}</TableCell>
                  <TableCell>{banner?.description.slice(0, 22)}...</TableCell>
                  <TableCell>{banner?.insertedBy}</TableCell>
                  <TableCell>{banner?.date}</TableCell>
                  <TableCell className="text-right flex justify-end">
                    <Switch
                      checked={banner?.status === "active"}
                      onCheckedChange={(checked) => {
                        const newStatus = checked ? "active" : "inactive";
                        handleBannerStatusChange(banner?._id, newStatus);
                      }}
                    />
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

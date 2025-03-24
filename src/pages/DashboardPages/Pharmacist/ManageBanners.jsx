import AddBanners from "@/components/Modal/AddBanner";
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

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
function ManageBanners() {
    const [setOpen, setIsOpen] = useState(false)
    const axiosSecure = useAxiosSecure();
    const {
        data: banners = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["banners"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/banners");
            return data;
        },
    });
    // const handleBannerAdd = async (id) => {
    //     await toast.promise(
    //         axiosSecure.patch(`/banners/${id}`, { status: "added" }),
    //         {
    //             loading: "Updating status...",
    //             success: <b>Updated successfull!</b>,
    //             error: <b>Could not update.</b>,
    //         }
    //     );
    //     refetch();
    // };
    // const handleBannerRemove = async (id) => {
    //     await toast.promise(
    //         axiosSecure.patch(`/banners/${id}`, { status: "removed" }),
    //         {
    //             loading: "Updating status...",
    //             success: <b>Updated successfull!</b>,
    //             error: <b>Could not update.</b>,
    //         }
    //     );
    //     refetch();
    // };
    const handleBannerStatusChange = async (id, newStatus) => {
        // console.log(newStatus);
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

    if (isLoading) return <Loader text={"Loading Banners"} />
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
            <div className="container mx-auto">
                <div className="flex justify-end mb-4">
                    <Button className="cursor-pointer" onClick={() => setIsOpen(true)}>Add New Banner</Button>
                </div>
                <Table>
                    <TableCaption>A list of all Banners.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">ID</TableHead>
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
                            <TableRow
                                key={banner._id}>
                                <TableCell className="font-medium">{i + 1}</TableCell>

                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={banner.image} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{banner.medicineName}</TableCell>
                                <TableCell>{banner.description.slice(0, 22)}...</TableCell>
                                <TableCell>{banner.insertedBy}</TableCell>
                                <TableCell>{banner.date}</TableCell>
                                <TableCell className="text-right flex justify-end">
                                    {/* {banner.status === "added" ? (
                                        <Button onClick={() => handleBannerRemove(banner._id)}>
                                            Remove Slide
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            onClick={() => handleBannerAdd(banner._id)}
                                        >
                                            Add Slide
                                        </Button>
                                    )} */}
                                    <Switch
                                        checked={banner.status === "active"}
                                        onCheckedChange={(checked) => {
                                            const newStatus = checked ? "active" : "inactive";
                                            handleBannerStatusChange(banner._id, newStatus);
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* modal */}
                <AddBanners isOpen={setOpen} setIsOpen={setIsOpen} refetch={refetch}></AddBanners>
            </div>
        </motion.div>
    );
}

export default ManageBanners;

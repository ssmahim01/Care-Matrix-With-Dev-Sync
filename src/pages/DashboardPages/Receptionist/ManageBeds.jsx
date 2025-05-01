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
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { imgUpload } from "@/lib/imgUpload";

function ManageBeds() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
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
    toast(
      (t) => (
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
                  toast.loading("Deleting bed...", { position: "top-right" });
                  const { data } = await axiosSecure.delete(`/beds/delete/${id}`);
                  if (data.data.deletedCount) {
                    refetch();
                    toast.dismiss();
                    toast.success("Bed deleted successfully!", { position: "top-right" });
                  } else {
                    toast.dismiss();
                    toast.error("No bed was deleted.", { position: "top-right" });
                  }
                } catch (error) {
                  toast.dismiss();
                  toast.error(error.message || "Failed to delete the bed!", { position: "top-right" });
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

  // Handle edit
  const handleEdit = (bed) => {
    setSelectedBed(bed);
    setIsEditOpen(true);
    setPreview(bed.image);
    setValue("title", bed.title);
    setValue("price", bed.price);
    setValue("status", bed.status);
  };

  // Handle image upload
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  // Handle form submission for editing
  const onEditSubmit = async (data) => {
    setLoading(true);
    let imageUrl = selectedBed.image;

    if (image) {
      imageUrl = await toast.promise(imgUpload(image), {
        success: <b>Image Uploaded</b>,
        loading: "Image Uploading...",
        error: "Unable to upload!",
      });

      if (!imageUrl) {
        setLoading(false);
        toast.error("Image Upload Failed! Try Again");
        return;
      }
    }

    const updatedBedData = {
      title: data.title,
      price: parseFloat(data.price),
      image: imageUrl,
      status: data.status,
    };

    try {
      await toast.promise(
        axiosSecure.put(`/beds/${selectedBed._id}`, updatedBedData),
        {
          loading: "Updating Bed...",
          success: <b>Bed Updated Successfully!</b>,
          error: <b>Unable to Update!</b>,
        }
      );
      setIsEditOpen(false);
      setPreview("");
      setImage(null);
      reset();
      refetch();
    } catch (error) {
      toast.error("Failed to update bed");
    } finally {
      setLoading(false);
    }
  };

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
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={j}>
                          <div className="skeleton h-8 rounded w-full"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : beds?.map((bed, i) => (
                    <TableRow key={bed._id}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={bed.image}
                            className={"object-cover"}
                          />
                          <AvatarFallback>{bed.title[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>{bed.title}</TableCell>
                      <TableCell>{bed.price}</TableCell>
                      <TableCell>
                        <Tooltip className="cursor-pointer">
                          <TooltipTrigger>
                            <Switch
                              className="cursor-pointer"
                              checked={bed.status === "available"}
                              onCheckedChange={(checked) => {
                                const newStatus = checked
                                  ? "available"
                                  : "booked";
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
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <div className="bg-base-200 p-2 mx-0 rounded border border-border w-fit">
                              <MoreVertical className="cursor-pointer text-gray-700" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => handleEdit(bed)}
                            >
                              <Pencil className="w-4 h-4 mr-2" /> Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleBedDelete(bed._id)}
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
          {/* Add Bed Modal */}
          <AddBeds isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />

          {/* Edit Bed Dialog */}
          {selectedBed && (
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Bed</DialogTitle>
                  <DialogDescription>
                    Update the details of the bed.
                  </DialogDescription>
                </DialogHeader>
                <Form>
                  <form
                    onSubmit={handleSubmit(onEditSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="title">Bed Title</Label>
                      <Input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Bed Title"
                        required
                        {...register("title")}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        placeholder="Price"
                        required
                        step="0.01"
                        {...register("price")}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        name="status"
                        className="border rounded-md p-2"
                        {...register("status")}
                      >
                        <option value="available">Available</option>
                        <option value="booked">Booked</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="photo">Upload Bed Image</Label>
                      {preview === "" ? (
                        <div
                          className="w-full flex items-center justify-center flex-col gap-4 border-blue-200 border rounded-md py-4 cursor-pointer"
                          onClick={() =>
                            document.getElementById("file-input").click()
                          }
                        >
                          <FaFileUpload className="text-[2rem] text-[#777777]" />
                          <p className="text-gray-700">
                            Browse To Upload Bed Image
                          </p>
                          <input
                            id="file-input"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUploadImage}
                          />
                        </div>
                      ) : (
                        <div className="relative w-full border border-blue-200 rounded-xl p-4">
                          <img
                            src={preview}
                            alt="Selected file preview"
                            className="mx-auto object-cover rounded-full w-24 h-24"
                          />
                          <MdDelete
                            className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer rounded-tr-[13px]"
                            onClick={() => {
                              setPreview("");
                              setImage(null);
                            }}
                          />
                          {image && (
                            <div className="mt-4 text-center">
                              <p className="text-sm font-medium text-gray-700">
                                {image.name.length > 20
                                  ? image.name.slice(0, 10) +
                                    "..." +
                                    image.name.slice(-15)
                                  : image.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(image.size / 1024).toFixed(2)} KB | {image.type}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button className="cursor-pointer" disabled={loading}>
                        {loading ? "Updating..." : "Update Bed"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ManageBeds;
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthUser } from "@/redux/auth/authActions";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { imgUpload } from "@/lib/imgUpload";
import { TicketSlash } from "lucide-react";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";

function AddBanners({ isOpen, setIsOpen, refetch }) {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const user = useAuthUser();
  const [loading, setLoading] = useState(false);

  // State to manage image preview and file
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  const onSubmit = async (data) => {
    if (!user) {
      return toast.error("You're not authorized to do this action");
    }

    setLoading(true);
    if (!image) {
      setLoading(false);
      toast.error("Please Select A Banner Image!");
      return;
    }

    const imageUrl = await toast.promise(imgUpload(image), {
      // success: <b>Image Uploaded</b>,
      loading: "Image Uploading...",
      error: "Unable to upload!",
    });

    if (!imageUrl) {
      setLoading(false);
      toast.error("Image Upload Failed! Try Again");
      return;
    }

    const medicineBanner = {
      ...data,
      insertedBy: user.displayName,
      image: imageUrl,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "active",
    };

    await toast.promise(axiosSecure.post("/banners", medicineBanner), {
      loading: "Adding Banner...",
      success: <b>Banner Added Successfully!</b>,
      error: <b>Unable to Add!</b>,
    });
    setPreview("");
    setImage("");
    setIsOpen(false);
    refetch();
    reset();
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <div>
              <div>
                <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-3">
                  <TicketSlash className="text-5xl text-gray-700" />
                  Add New Banner AD
                </h2>
                <p className="text-gray-600 text-lg mt-1 ml-[2px] font-medium whitespace-pre-line">
                  Enter details to request a new Banner AD
                </p>
              </div>
            </div>
          </DialogHeader>
          <Form>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-3">
                <Label htmlFor="medicineName">Medicine Name</Label>
                <Input
                  id="medicineName"
                  type="text"
                  name="medicineName"
                  placeholder="Enter Banner Medicine Name"
                  defaultValue={""}
                  required
                  {...register("medicineName")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Banner Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter Short Description Related To Banner Medicine"
                  defaultValue={""}
                  {...register("description")}
                />
              </div>
              {/* Image Upload Section */}
              <div className="grid gap-3">
                <Label htmlFor="photo">Upload Banner Image</Label>
                {preview === "" ? (
                  <div
                    className="w-full md:w-[100%] flex items-center justify-center flex-col gap-4 border-gray-300 border rounded-md py-4 cursor-pointer"
                    onClick={() =>
                      document.getElementById("file-input").click()
                    }
                  >
                    <FaFileUpload className="text-[2rem] text-[#777777]" />
                    <p className="text-gray-700">
                      Browse To Upload Banner Image
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
                  <div className="relative w-full border border-gray-300 rounded-xl p-4">
                    <img
                      src={preview}
                      alt="Selected file preview"
                      className="mx-auto object-cover rounded w-[90%] h-28"
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
                <Button className="cursor-pointer"> Add Banner</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddBanners;

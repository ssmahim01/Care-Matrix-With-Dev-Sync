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

function AddBanners({ isOpen, setIsOpen, refetch }) {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const user = useAuthUser();
    const [loading, setLoading] = useState(false)

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
            return toast.error("You're not authorized to do this action")
        }

        setLoading(true)
        if (!image) {
            setLoading(false)
            toast.error("Please Select a Banner Image")
            return
        }

        const imageUrl = await toast.promise(imgUpload(image), {
            success: <b>Image Uploaded</b>,
            loading: "Image Uploading...",
            error: "Unable to upload!"
        })
        if (!imageUrl) {
            setLoading(false);
            toast.error("Image Upload Failed! Try Again");
            return;
        }


        const medicineBanner = {
            ...data,
            insertedBy: user.displayName,
            date: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
            image: imageUrl,
            status: "inactive"
        };
        console.log(medicineBanner);

        await toast.promise(axiosSecure.post('/banners', medicineBanner), {
            loading: "Adding Banner...",
            success: <b>Banner Added Successfully!</b>,
            error: <b>Unable to Add!</b>,
        });
        setPreview("")
        setImage("")
        setIsOpen(false);
        refetch();
        reset();
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Banner AD</DialogTitle>
                        <DialogDescription>
                            Enter details to request a new Banner AD.
                        </DialogDescription>
                    </DialogHeader>
                    <Form>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="medicineName">Medicine Name</Label>
                                <Input
                                    id="medicineName"
                                    type="text"
                                    name="medicineName"
                                    placeholder="Napa Extend"
                                    defaultValue={""}
                                    required
                                    {...register("medicineName")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter short description related to category"
                                    className="resize-none"
                                    defaultValue={""}
                                    {...register("description")}
                                />
                            </div>
                            {/* Image Upload Section */}
                            <div className="grid gap-2">
                                <Label htmlFor="photo">Upload Banner Image</Label>
                                {preview === "" ? (
                                    <div
                                        className="w-full md:w-[100%] flex items-center justify-center flex-col gap-4 border-blue-200 border rounded-md py-4 cursor-pointer"
                                        onClick={() => document.getElementById("file-input").click()}
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
                                                    {image.name.length > 20 ? image.name.slice(0, 10) + "..." + image.name.slice(-15) : image.name}
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
                                <Button className='cursor-pointer'> Add Banner</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddBanners;

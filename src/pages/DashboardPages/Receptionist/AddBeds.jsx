import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";



import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthUser } from "@/redux/auth/authActions";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { imgUpload } from "@/lib/imgUpload";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function AddBeds({ isOpen, setIsOpen, refetch }) {
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
            toast.error("Please Select a Bed Image");
            return;
        }

        const imageUrl = await toast.promise(imgUpload(image), {
            success: <b>Image Uploaded</b>,
            loading: "Image Uploading...",
            error: "Unable to upload!"
        });

        if (!imageUrl) {
            setLoading(false);
            toast.error("Image Upload Failed! Try Again");
            return;
        }

        // Split details input into an array
        const detailsArray = data.details.split('\n').filter(item => item.trim() !== '');

        const bedData = {
            title: data.title,
            price: `$${data.price}`,
            image: imageUrl,
            details: detailsArray,
            status: "available",
            insertedBy: user.displayName,
            date: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
        };

        await toast.promise(axiosSecure.post('/beds', bedData), {
            loading: "Adding Bed...",
            success: <b>Bed Added Successfully!</b>,
            error: <b>Unable to Add!</b>,
        });

        setPreview("");
        setImage(null);
        setIsOpen(false);
        refetch();
        reset();
        setLoading(false);
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Bed</DialogTitle>
                        <DialogDescription>
                            Enter details to add a new bed to the system.
                        </DialogDescription>
                    </DialogHeader>
                    <Form>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="title">Bed Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="GENERAL"
                                    defaultValue={""}
                                    required
                                    {...register("title")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price (in USD)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    name="price"
                                    placeholder="25"
                                    defaultValue={""}
                                    required
                                    {...register("price")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="details">Details (one per line)</Label>
                                <Textarea
                                    id="details"
                                    placeholder="Multiple beds in a shared ward&#10;Basic medical facilities&#10;Shared toilet and bathroom&#10;Nurse call system&#10;Ventilation with fans"
                                    className="resize-none"
                                    defaultValue={""}
                                    required
                                    {...register("details")}
                                />
                            </div>
                            {/* Image Upload Section */}
                            <div className="grid gap-2">
                                <Label htmlFor="photo">Upload Bed Image</Label>
                                {preview === "" ? (
                                    <div
                                        className="w-full md:w-[100%] flex items-center justify-center flex-col gap-4 border-blue-200 border rounded-md py-4 cursor-pointer"
                                        onClick={() => document.getElementById("file-input").click()}
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
                                <Button className="cursor-pointer" disabled={loading}>
                                    {loading ? "Adding..." : "Add Bed"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddBeds;
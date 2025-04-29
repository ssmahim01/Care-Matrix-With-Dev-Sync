
import { useForm } from "react-hook-form";


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
import { Card, CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import axios from "axios";

function AddBlogForm({ refetch, setIsFormOpen }) {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()    
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
            toast.error("Please select a blog image");
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

        const blogData = {
            title: data.title,
            tag: data.tag,
            image: imageUrl,
            description: data.description,
            status: "published",
            author: user.displayName,
            date: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
            authorEmail: user.email,
            authorImage: user.photoURL,
            authName: user.displayName,
        };

        console.log(blogData);


        await toast.promise(axiosSecure.post(`/blogs`, blogData), {
            loading: "Adding Blog...",
            success: <b>Blog Added Successfully!</b>,
            error: <b>Unable to Add!</b>,
        });

        setPreview("");
        setImage(null);
        setIsFormOpen(false);
        refetch();
        reset();
        setLoading(false);
    };

    return (
        <div>
            <Card className="border shadow-none border-[#e5e7eb] w-full py-6 rounded-lg">
                <CardContent className="px-4">
                    <Form>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="title">Blog Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="My Blog Post"
                                    defaultValue={""}
                                    required
                                    {...register("title")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tag">Tag</Label>
                                <Input
                                    id="tag"
                                    type="text"
                                    name="tag"
                                    placeholder="Technology"
                                    defaultValue={""}
                                    required
                                    {...register("tag")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Write your blog content here..."
                                    className="resize-none min-h-[150px]"
                                    defaultValue={""}
                                    required
                                    {...register("description")}
                                />
                            </div>
                            {/* Image Upload Section */}
                            <div className="grid gap-2">
                                <Label htmlFor="photo">Upload Blog Image</Label>
                                {preview === "" ? (
                                    <div
                                        className="w-full md:w-[100%] flex items-center justify-center flex-col gap-4 border-blue-200 border rounded-md py-4 cursor-pointer"
                                        onClick={() => document.getElementById("file-input").click()}
                                    >
                                        <FaFileUpload className="text-[2rem] text-[#777777]" />
                                        <p className="text-gray-700">
                                            Browse To Upload Blog Image
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
                            <div className="flex justify-end gap-2">
                               
                                <Button>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setPreview("");
                                            setImage(null);
                                            setIsFormOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </span>
                                </Button>
                                <Button className="cursor-pointer" disabled={loading}>
                                    {loading ? "Adding..." : "Add Blog"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddBlogForm;
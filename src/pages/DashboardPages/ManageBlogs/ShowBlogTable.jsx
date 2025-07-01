import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { imgUpload } from "@/lib/imgUpload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DashboardBlogCard from "./BlogCard";

const ShowBlogTable = ({ blogs, isLoading, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  // Handle Delete
  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex gap-3 items-center">
          <div>
            <p>
              <b>Are you sure?</b>
            </p>
          </div>
          <div className="gap-2 flex">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  toast.loading("Deleting bed...", { position: "top-right" });
                  const { data } = await axiosSecure.delete(
                    `/blogs/delete/${id}`
                  );

                  if (data.data.deletedCount) {
                    refetch();
                    toast.dismiss();
                    toast.success("Blog deleted successfully!", {
                      position: "top-right",
                    });
                  } else {
                    toast.dismiss();
                    toast.error("No Blog was deleted.", {
                      position: "top-right",
                    });
                  }
                } catch (error) {
                  toast.dismiss();
                  toast.error(error.message || "Failed to delete the blog!", {
                    position: "top-right",
                  });
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded-md"
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

  // Handle Edit
  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsEditOpen(true);
    setPreview(blog.image);
    setValue("title", blog.title);
    setValue("tag", blog.tag);
    setValue("description", blog.description);
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  const onEditSubmit = async (data) => {
    setLoading(true);
    let imageUrl = selectedBlog.image;

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

    const updatedBlogData = {
      title: data.title,
      tag: data.tag,
      image: imageUrl,
      description: data.description,
      status: "published",
      author: selectedBlog.author,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    try {
      await toast.promise(
        axiosSecure.put(`/blogs/${selectedBlog._id}`, updatedBlogData),
        {
          loading: "Updating Blog...",
          success: <b>Blog Updated Successfully!</b>,
          error: <b>Unable to Update!</b>,
        }
      );
      setIsEditOpen(false);
      setPreview("");
      setImage(null);
      reset();
      refetch();
    } catch (error) {
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Blog Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 :::xl:grid-cols-4">
        {blogs?.map((blog, i) => (
          <DashboardBlogCard
            key={i}
            blog={blog}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>

      {/* Edit Blog Dialog */}
      {selectedBlog && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="w-[100%] max-w-none max-h-[80vh] overflow-y-auto p-6">
            <DialogHeader>
              <DialogTitle>Edit Blog</DialogTitle>
              <DialogDescription>
                Update the details of the blog post.
              </DialogDescription>
            </DialogHeader>
            <Form>
              <form
                onSubmit={handleSubmit(onEditSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="title">Blog Title</Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="My Blog Post"
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
                    required
                    {...register("tag")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Write your blog content here..."
                    className=":::resize-none :::min-h-[150px]"
                    required
                    {...register("description")}
                  />
                </div>
                {/* Image Upload Section */}
                <div className="grid gap-2">
                  <Label htmlFor="photo">Upload Blog Image</Label>
                  {preview === "" ? (
                    <div
                      className="w-full flex items-center justify-center flex-col gap-4 border-blue-200 border rounded-md py-4 cursor-pointer"
                      onClick={() =>
                        document.getElementById("file-input").click()
                      }
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
                    {loading ? "Updating..." : "Update Blog"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ShowBlogTable;

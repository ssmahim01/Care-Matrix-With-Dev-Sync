import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FaFileUpload } from "react-icons/fa";
import { imgUpload } from "@/lib/imgUpload";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";

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
    try {
      await toast.promise(axiosSecure.delete(`/blogs/${id}`), {
        loading: "Deleting Blog...",
        success: <b>Blog Deleted Successfully!</b>,
        error: <b>Unable to Delete!</b>,
      });
      refetch();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
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
    <div className="w-full mt-6">
      <div className="rounded-md">
        <Table>
        <TableCaption>A List of All Blogs</TableCaption>
          <TableHeader>
            <TableRow className="bg-base-200 hover:bg-base-200">
            <TableHead className="w-12">#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.length > 0 ? (
              blogs.map((blog,i) => (
                <TableRow key={blog._id}>
                     <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.tag}</TableCell>
                  <TableCell>
                    {blog.description.length > 50
                      ? `${blog.description.slice(0, 50)}...`
                      : blog.description}
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>{blog.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="bg-base-200 p-2 mx-0 rounded border border-border w-fit">
                          <MoreVertical className="cursor-pointer text-gray-700" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleEdit(blog)}
                        >
                          <Pencil className="w-4 h-4 mr-2" /> Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <Trash className="w-4 h-4 mr-2 text-red-500" />{" "} Delete
                        </DropdownMenuItem>

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No blogs available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Blog Dialog */}
      {selectedBlog && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
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
                    className="resize-none min-h-[150px]"
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

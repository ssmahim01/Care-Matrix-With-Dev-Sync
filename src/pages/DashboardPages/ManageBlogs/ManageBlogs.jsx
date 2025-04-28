import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { Newspaper } from "lucide-react";
import React, { useState } from "react";
import AddBlogForm from "./AddBlogForm";
import { Button } from "@/components/ui/button";
import ShowBlogTable from "./ShowBlogTable";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ManageBlogs = () => {
    const axiosSecure = useAxiosSecure();
  const [isFormOpen, setIsFormOpen] = useState(false);

    const { data: blogs = [], isLoading, refetch } = useQuery({
      queryKey: ["blogs"],
      queryFn: async () => {
        const { data } = await axiosSecure.get("/blogs");
        return data;
      },
    });

  return (
    <div className="px-7">
      <div className="flex items-center justify-between">
      <DashboardPagesHeader
        title={"Manage Blogs"}
        subtitle={"Easily add or manage Blogs and News"}
        icon={Newspaper}
      />
      {/* Add Blog Form */}
      <div className="">
        <Button
          disabled={isFormOpen}
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={"cursor-pointer"}
        >
          Assign New User
        </Button>
      </div>
      </div>
      {/* Assign User Form */}
      {isFormOpen && (
        <div className={`${isFormOpen ? "visible" : "hidden"} mt-4`}>
          <AddBlogForm
            refetch={refetch}
            setIsFormOpen={setIsFormOpen}
          />
        </div>
      )}
        {/* Blog Table */}
        <ShowBlogTable
            blogs={blogs}
            isLoading={isLoading}
            refetch={refetch}
        />

     
    </div>
  );
};

export default ManageBlogs;

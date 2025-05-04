import {
  Eye,
  MoreHorizontal,
  MoreVertical,
  Pencil,
  Trash,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardBlogCard = ({ blog, handleDelete, handleEdit }) => {
  return (
    <Card className="overflow-hidden shadow-sm w-full rounded-lg">
      <CardHeader className="p-0 relative h-48">
        <img
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          className="object-cover h-[220px] w-full"
        />
        <div className="absolute top-2 right-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <div className="bg-base-200 p-2 mx-0 rounded border border-border w-fit">
                <MoreVertical className="cursor-pointer text-gray-700" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="w-4 h-4 mr-2" /> Details
              </DropdownMenuItem>
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
                <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={blog.status === "published" ? "default" : "outline"}>
            {blog.status}
          </Badge>
          <span className="text-sm text-muted-foreground">{blog.date}</span>
        </div>
        <h3 className="text-lg font-semibold line-clamp-1 mb-2">
          {blog.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {blog.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 -mt-8 flex items-center">
        <div className="flex items-center">
          <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
            <img
              src={blog.authorImage || "/placeholder.svg?height=32&width=32"}
              alt={blog.author}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium">{blog.author}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardBlogCard;

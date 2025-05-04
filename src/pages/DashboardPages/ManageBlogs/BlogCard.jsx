import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

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

const DashboardBlogCard = ({ blog }) => {
  return (
    <Card className="overflow-hidden shadow-sm w-full rounded-lg">
      <CardHeader className="p-0 relative h-48">
        <img
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          className="object-cover h-[220px] w-full"
        />
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 hover:bg-white"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Update</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
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

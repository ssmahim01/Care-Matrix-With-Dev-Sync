import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function ContactMessageCard({ message, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
  });

  const handleDelete = async () => {
    // if (!onDelete) return;
    // try {
    //   setIsDeleting(true);
    //   await onDelete(message._id);
    //   toast({
    //     title: "Message deleted",
    //     description: "The contact message has been successfully deleted.",
    //   });
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to delete the message. Please try again.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsDeleting(false);
    // }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">
              {message.username}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-1 h-3 w-3" />
              {message.email}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{message.message}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-between items-center w-full">
          <span className="text-xs text-muted-foreground">
            {message.phoneNumber}
          </span>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

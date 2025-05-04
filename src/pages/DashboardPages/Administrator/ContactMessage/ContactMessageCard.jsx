import { Mail, MoreHorizontal, Phone } from "lucide-react";

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

import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import MessageDialog from "./MessageDialog";
import { useState } from "react";
import moment from "moment";

const ContactMessageCard = ({ message, deleteMessage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      className={"border shadow-sm border-[#e5e7eb] w-full py-4 rounded-lg"}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">
              {message?.username}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-1 h-3 w-3" />
              {message?.email}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Phone className="mr-1 h-3 w-3" />
              {message?.phoneNumber}
            </div>
          </div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className={"cursor-pointer"}>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Message
                </DropdownMenuItem>

                <MessageDialog
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  message={message?.message}
                />
              </>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${message?.email}`,
                    "_blank"
                  )
                }
              >
                <Pencil className="w-4 h-4 mr-2" /> Reply By Email
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteMessage(message?._id)}
                className={"cursor-pointer tracking-tight"}
              >
                <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete Message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className={"-mt-6"}>
        <p className="text-sm line-clamp-3">{message?.message}</p>
      </CardContent>
      <CardFooter className="-mt-4">
        <div className="flex flex-col items-end w-full">
          <span className="text-xs text-muted-foreground">
            {moment(message?.sentAt).fromNow()}
          </span>
          <span className="mt-1 text-xs text-muted-foreground">
            {new Date(message?.sentAt).toLocaleString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContactMessageCard;

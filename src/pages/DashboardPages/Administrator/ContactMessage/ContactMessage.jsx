import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { useQuery } from "@tanstack/react-query";
import { Eye, MailIcon, MoreVertical, Pencil, Trash } from "lucide-react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "date-fns";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MessageDialog from "./MessageDialog";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactMessage = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Fetch ContactMessage
  const {
    data: contacts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contact-message"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/contact`);
      return data;
    },
  });

  // Delete Message
  const deleteMessage = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/contact/${id}`
      );
      if (data.deletedCount) {
        refetch();
        toast.success("Message Deleted!");
      }
    } catch (error) {
      toast.error(error?.message || "Error Caught While Deleting Message");
    }
  };

  return (
    <div className="px-5">
      <DashboardPagesHeader
        title="Contact Messages"
        subtitle="View all messages sent by users through the contact form."
        icon={MailIcon}
      />
      {/* Contact Message Table */}
      <Table>
        <TableCaption>A List Of All Contact Message From Users</TableCaption>
        <TableHeader>
          <TableRow className={"bg-base-200 hover:bg-base-200"}>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Sent-At</TableHead>
            <TableHead></TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 7 }).map((_, j) => (
                  <TableCell key={j}>
                    <div className="skeleton h-8 rounded w-full"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : contacts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center font-medium text-gray-800 py-4 border-y"
              >
                No Contact Messages Available Now !!!
              </TableCell>
            </TableRow>
          ) : (
            contacts?.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact?.username}</TableCell>
                <TableCell>{contact?.email}</TableCell>
                <TableCell>{contact?.phoneNumber}</TableCell>
                <TableCell>
                  {new Date(contact?.sentAt).toLocaleString()}
                </TableCell>
                <TableCell>({moment(contact?.sentAt).fromNow()})</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      {/* Truncated message */}
                      <div className="w-[380px] truncate">
                        {contact?.message}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="whitespace-pre-line mr-8">
                      {/* Full message */}
                      {contact?.message}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className={"cursor-pointer"}>
                      <div
                        className={
                          "bg-base-200 p-2 rounded border border-border w-fit"
                        }
                      >
                        <MoreVertical className="cursor-pointer text-gray-700" />
                      </div>
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
                          message={contact?.message}
                        />
                      </>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          window.open(
                            `https://mail.google.com/mail/?view=cm&fs=1&to=${contact?.email}`,
                            "_blank"
                          )
                        }
                      >
                        <Pencil className="w-4 h-4 mr-2" /> Reply By Email
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteMessage(contact?._id)}
                        className={"cursor-pointer tracking-tight"}
                      >
                        <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete
                        Message
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactMessage;

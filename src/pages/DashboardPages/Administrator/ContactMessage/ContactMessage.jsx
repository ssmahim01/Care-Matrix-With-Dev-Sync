import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Eye, MailIcon, MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import MessageDialog from "./MessageDialog";
import { ContactMessageCard } from "./ContactMessageCard";

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
        subtitle="View all messages sent by users through the contact form"
        icon={MailIcon}
      />

      {/* Messages Cards */}
      <div className="mt-4 space-y-4">
        {contacts?.map((message, i) => (
          <ContactMessageCard key={i} message={message} />
        ))}
      </div>
    </div>
  );
};

export default ContactMessage;

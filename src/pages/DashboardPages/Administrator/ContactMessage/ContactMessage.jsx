import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import ContactMessageCard from "./ContactMessageCard";
import { useQuery } from "@tanstack/react-query";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import MessageCardSkeleton from "./MessageCardSkeleton";

const ContactMessage = () => {
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
        toast.success("Message Deleted Successfully!", {
          position: "top-right",
          duration: 1500,
        });
      }
    } catch (error) {
      toast.error(error?.message || "Error Caught While Deleting Message", {
        position: "top-right",
      });
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
        {isLoading
          ? [...Array(3)].map((_, i) => <MessageCardSkeleton key={i} />)
          : contacts?.map((message, i) => (
              <ContactMessageCard
                key={i}
                message={message}
                deleteMessage={deleteMessage}
              />
            ))}
      </div>
    </div>
  );
};

export default ContactMessage;

import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import ContactMessageCard from "./ContactMessageCard";
import MessageCardSkeleton from "./MessageCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { MailIcon, MailWarning } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import EmptyState from "../../PatientOverview/EmptyState";

const ContactMessage = () => {
  // Fetch ContactMessage
  const {
    data: contacts,
    isLoading,
    isError,
    refetch,
    error,
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

  if (isError) {
    const errorMessage =
      error?.message ||
      "An unexpected error occurred while fetching the doctor data";
    return toast.error("Error While Fetching Data!", {
      description: errorMessage,
      position: "top-right",
    });
  }

  return (
    <div className="px-5">
      <DashboardPagesHeader
        title="Contact Messages"
        subtitle="View all messages sent by users through the contact form"
        icon={MailIcon}
      />

      {/* Messages Cards */}
      <div className="mt-4 space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => <MessageCardSkeleton key={i} />)
        ) : contacts.length === 0 ? (
          <Card
            className={
              "mt-6 border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"
            }
          >
            <CardContent>
              <EmptyState
                icon={MailWarning}
                title="No Messages Found"
                description="You haven’t received any contact messages yet. Once users send you a message, they’ll show up here."
                actionLabel="Go to Dashboard"
                actionLink="/dashboard/administrator-overview"
              />
            </CardContent>
          </Card>
        ) : (
          contacts?.map((message, i) => (
            <ContactMessageCard
              key={i}
              message={message}
              deleteMessage={deleteMessage}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContactMessage;

import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { useQuery } from "@tanstack/react-query";
import { MailIcon } from "lucide-react";
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

  return (
    <div className="px-7">
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 13 }).map((_, j) => (
                    <TableCell key={j}>
                      <div className="skeleton h-8 rounded w-full"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : contacts?.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>{contact?.username}</TableCell>
                  <TableCell>{contact?.email}</TableCell>
                  <TableCell>{contact?.phoneNumber}</TableCell>
                  <TableCell>
                    {new Date(contact?.sentAt).toLocaleString()}{" "}
                    <sub>({moment(contact?.sentAt).fromNow()})</sub>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactMessage;

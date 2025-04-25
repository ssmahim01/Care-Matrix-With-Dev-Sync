import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import ChatDashboard from "@/components/ChatDashboard/ChatDashboard";
import { useAuthUser } from "@/redux/auth/authActions";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CalendarIcon, MessagesSquare } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import SkeletonChatDashboard from "@/components/ChatDashboard/SkeletonChatDashboard";

const DoctorChat = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();
  const currentDate = format(new Date(), "MMMM d, yyyy");

  // Fetch doctor details
  const {
    data: doctor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["doctor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/me?email=${user?.email}`);
      // console.log("Doctor data response:", res.data);
      return res.data.data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <SkeletonChatDashboard />;
  }

  if (error || !doctor) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="text-gray-700 font-semibold">
          Error: Could not load doctor details
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2 lg:w-full w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
        <div>
          <DashboardPagesHeader
            title={`Welcome, ${doctor.name}`}
            subtitle="Communicate with patients"
            icon={MessagesSquare}
          />
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-muted-foreground">
              <CalendarIcon className="mr-1 h-3 w-3" />
              {currentDate}
            </Badge>
          </div>
        </div>
      </div>

      <ChatDashboard userEmail={doctor.email} userRole="doctor" />
    </div>
  );
};

export default DoctorChat;

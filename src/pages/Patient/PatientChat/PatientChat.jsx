import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import ChatDashboard from "@/pages/Patient/ChatDashboard/ChatDashboard";
import { useAuthUser } from "@/redux/auth/authActions";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CalendarIcon, MessagesSquare } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const PatientChat = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();
  const currentDate = format(new Date(), "MMMM d, yyyy");

  // Fetch patient details
  const { data: patient, isLoading, error } = useQuery({
    queryKey: ["patient", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/me?email=${user?.email}`);
      // console.log("Patient data response:", res.data);
      return res.data.data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="text-gray-600 font-semibold">Loading...</span>
      </div>
    );
  }

  if (error || !patient) {
    return <div>Error: Could not load patient details.</div>;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
        <div>
          <DashboardPagesHeader
            title={`Welcome, ${patient.name}`}
            subtitle=" Manage your appointments and consult with doctors and pharmacists."
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

      <ChatDashboard userEmail={patient.email} userRole="patient" />
    </div>
  );
};

export default PatientChat;

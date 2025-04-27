import useAxiosSecure from "@/hooks/useAxiosSecure";
import ChatDashboard from "@/components/ChatDashboard/ChatDashboard";
import { useAuthUser } from "@/redux/auth/authActions";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CalendarIcon, MessagesSquare } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import SkeletonChatDashboard from "@/components/ChatDashboard/SkeletonChatDashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorFailure, fetchDoctorStart, fetchDoctorSuccess } from "@/redux/chat/chatSlice";
import { useEffect } from "react";

const DoctorChat = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const dispatch = useDispatch();

   // Get patient data from Redux store
   const { doctor, doctorStatus, doctorError } = useSelector(
    (state) => state.chats
  );

  // Fetch patient data
  useEffect(() => {
    if (!user?.email) return;

    const fetchDoctorData = async () => {
      dispatch(fetchDoctorStart());
      try {
        const res = await axiosSecure.get(`/users/me?email=${user?.email}`);
        dispatch(fetchDoctorSuccess(res.data.data));
      } catch (error) {
        dispatch(
          fetchDoctorFailure(error.message || "Failed to fetch doctor data")
        );
      }
    };

    fetchDoctorData();
  }, [user?.email, dispatch, axiosSecure]);

  if (doctorStatus === "loading") {
    return <SkeletonChatDashboard />;
  }

  if (doctorStatus === "failed" || !doctor) {
    return (
      <div>Error: {doctorError || "Could not load doctor data."}</div>
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

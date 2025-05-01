import useAxiosSecure from "@/hooks/useAxiosSecure";
import ChatDashboard from "@/components/ChatDashboard/ChatDashboard";
import { useAuthUser } from "@/redux/auth/authActions";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { CalendarIcon, MessagesSquare } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import SkeletonChatDashboard from "@/components/ChatDashboard/SkeletonChatDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPatientFailure, fetchPatientStart, fetchPatientSuccess } from "@/redux/chat/chatSlice";

const PatientChat = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();
  const dispatch = useDispatch();
  const currentDate = format(new Date(), "MMMM d, yyyy");

  // Get patient data from Redux store
  const { patient, patientStatus, patientError } = useSelector(
    (state) => state.chats
  );

  // Fetch patient data
  useEffect(() => {
    if (!user?.email) return;

    const fetchPatientData = async () => {
      dispatch(fetchPatientStart());
      try {
        const res = await axiosSecure.get(`/users/me?email=${user?.email}`);
        dispatch(fetchPatientSuccess(res.data.data));
      } catch (error) {
        dispatch(
          fetchPatientFailure(error.message || "Failed to fetch patient data")
        );
      }
    };

    fetchPatientData();
  }, [user?.email, dispatch, axiosSecure]);

  if (patientStatus === "loading") {
    return <SkeletonChatDashboard />;
  }

  if (patientStatus === "failed" || !patient) {
    return (
      <div>Error: {patientError || "Could not load patient details."}</div>
    );
  }

  return (
    <div className="space-y-2 lg:w-full w-11/12 max-w-[2500px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
        <div>
          <DashboardPagesHeader
            title={`Welcome, ${patient.name}`}
            subtitle="Consult with doctors and pharmacists"
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

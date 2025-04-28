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
import { fetchPharmacistFailure, fetchPharmacistStart, fetchPharmacistSuccess } from "@/redux/chat/chatSlice";

const PharmacistChat = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const dispatch = useDispatch();

  // Get pharmacist data from Redux store
  const { pharmacist, pharmacistStatus, pharmacistError } = useSelector(
   (state) => state.chats
 );

 // Fetch pharmacist data
 useEffect(() => {
   if (!user?.email) return;

   const fetchPharmacistData = async () => {
     dispatch(fetchPharmacistStart());
     try {
       const res = await axiosSecure.get(`/users/me?email=${user?.email}`);
       dispatch(fetchPharmacistSuccess(res.data.data));
     } catch (error) {
       dispatch(
         fetchPharmacistFailure(error.message || "Failed to fetch pharmacist data")
       );
     }
   };

   fetchPharmacistData();
 }, [user?.email, dispatch, axiosSecure]);

 if (pharmacistStatus === "loading") {
   return <SkeletonChatDashboard />;
 };

 if (pharmacistStatus === "failed" || !pharmacist) {
   return (
     <div>Error: {pharmacistError || "Could not load pharmacist data."}</div>
   );
 };

  return (
    <div className="space-y-2 lg:w-full w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
        <div>
          <DashboardPagesHeader
            title={`Welcome, ${pharmacist.name}`}
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

      <ChatDashboard userEmail={pharmacist.email} userRole="pharmacist" />
    </div>
  );
};

export default PharmacistChat;

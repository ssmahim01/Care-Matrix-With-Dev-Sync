import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OverviewCards from "./OverviewCards";
import { useAuthUser } from "@/redux/auth/authActions";
import SmartWaitTime from "./SmartWaitTime";

const PatientOverview = () => {
  // Fetch patient overview data
  const user = useAuthUser();
  const { data: patientStats = [], isLoading } = useQuery({
    queryKey: ["patient-stats", user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/patient/stats/${user?.email}`
      );
      return data;
    },
  });
  return (
    <div className="px-7">
      {/* Overview Cards */}
      <OverviewCards
        bedBookings={patientStats?.bedBookings}
        overviewStats={patientStats?.overviewStats}
        appointment={patientStats?.appointment}
      />
      {/* Smart Wait Time Prediction */}
      {patientStats.appointment && (
        <SmartWaitTime appointment={patientStats?.appointment} />
      )}
    </div>
  );
};

export default PatientOverview;

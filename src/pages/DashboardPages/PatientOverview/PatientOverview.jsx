import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthUser } from "@/redux/auth/authActions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import AppointmentsTab from "./AppointmentsTab";
import PurchaseHistoryTab from "./PurchaseHistoryTab";
import MedicineCartTab from "./MedicineCartTab";
import BedBookingsTab from "./BedBookingsTab";
import OverviewCards from "./OverviewCards";
import SmartWaitTime from "./SmartWaitTime";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientStats } from "@/redux/patient/patientSlice";
import { useEffect } from "react";
import PatientOverviewSkeleton from "./PatientOverviewSkeleton";
import { toast } from "sonner";

// Tan Stack Query Version
// const { data: patientStats = [], isLoading } = useQuery({
//   queryKey: ["patient-stats", user?.email],
//   queryFn: async () => {
//     const { data } = await axios(
//       `${import.meta.env.VITE_API_URL}/patient/stats/${user?.email}`
//     );
//     return data;
//   },
// });

const PatientOverview = () => {
  const user = useAuthUser();
  const dispatch = useDispatch();

  // Redux Version
  const { stats, isLoading, error } = useSelector(
    (state) => state.patientStats
  );
  const patientStats = stats || {};

  // Fetch PatientStats
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchPatientStats(user.email));
    }
  }, [dispatch, user?.email]);

  if (error) {
    const errorMessage = "An unexpected error occurred while fetching the data";
    return toast.error("Error While Fetching Data!", {
      description: errorMessage,
      position: "top-right",
    });
  }
  if (isLoading) return <PatientOverviewSkeleton />;

  // Format date for display
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Format currency
  function formatCurrency(amount) {
    if (!amount && amount !== 0) return "N/A";
    return typeof amount === "string" && amount.startsWith("$")
      ? amount
      : `৳${Number(amount).toFixed(2)}`;
  }

  return (
    <div className="px-5">
      {/* Overview Cards */}
      <OverviewCards
        bedBookings={patientStats?.bedBookings}
        overviewStats={patientStats?.overviewStats}
        appointment={patientStats?.appointment}
        formatDate={formatDate}
      />

      {/* Smart Wait Time Prediction */}
      {patientStats?.appointment && (
        <SmartWaitTime appointment={patientStats?.appointment} />
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="appointments" className="mt-8 space-y-2">
        {/* All TabList */}
        <TabsList className="border w-full">
          <TabsTrigger
            className={"cursor-pointer py-2 px-4"}
            value="appointments"
          >
            Appointments
          </TabsTrigger>
          <TabsTrigger className={"cursor-pointer py-2 px-4"} value="beds">
            Bed Bookings
          </TabsTrigger>
          <TabsTrigger
            className={"cursor-pointer py-2 px-4"}
            value="medications"
          >
            Medicine Cart{" "}
            {patientStats?.medicineCart && (
              <sub>({patientStats?.medicineCart?.length})</sub>
            )}
          </TabsTrigger>
          {patientStats?.purchaseHistory &&
            patientStats?.purchaseHistory?.length > 0 && (
              <TabsTrigger
                className={"cursor-pointer py-2 px-4"}
                value="history"
              >
                Purchase History
              </TabsTrigger>
            )}
        </TabsList>
        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-4">
          <AppointmentsTab
            appointment={patientStats?.appointment}
            formatDate={formatDate}
          />
        </TabsContent>
        {/* Bed Bookings Tab */}
        <TabsContent value="beds" className="space-y-4">
          <BedBookingsTab
            bedBookings={patientStats?.bedBookings}
            formatDate={formatDate}
          />
        </TabsContent>
        {/* Medications Tab */}
        <TabsContent value="medications" className="space-y-4">
          <MedicineCartTab
            medicineCart={patientStats?.medicineCart}
            formatCurrency={formatCurrency}
            overviewStats={patientStats?.overviewStats}
          />
        </TabsContent>
        {/* Purchase History Tab */}
        {patientStats?.purchaseHistory &&
          patientStats?.purchaseHistory?.length > 0 && (
            <TabsContent value="history" className="space-y-4">
              <PurchaseHistoryTab
                purchaseHistory={patientStats?.purchaseHistory}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
              />
            </TabsContent>
          )}
      </Tabs>
    </div>
  );
};

export default PatientOverview;

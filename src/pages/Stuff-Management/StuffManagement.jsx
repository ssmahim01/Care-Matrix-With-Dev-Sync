import { Suspense } from "react";
import { StaffManagementSkeleton } from "./staff-management-skeleton";
import { StaffManagement } from "./staff-management";
import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { Users } from "lucide-react";

const StuffManagement = () => {
  return (
    <div className="px-5">
      <DashboardPagesHeader
        title={"Manage-Users"}
        subtitle={
          "This section allows you to manage all registered users, including viewing profiles,updating roles, \n tracking activity, and controlling access to the system."
        }
        icon={Users}
      />
      <Suspense fallback={<StaffManagementSkeleton />}>
        <StaffManagement />
      </Suspense>
    </div>
  );
};

export default StuffManagement;

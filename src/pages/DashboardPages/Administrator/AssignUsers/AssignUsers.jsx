import DashboardPagesHeader from "@/shared/Section/DashboardPagesHeader";
import { UserPlus } from "lucide-react";

const AssignUsers = () => {
  return (
    <div className="px-7">
      <DashboardPagesHeader
        title={"Assign New Users"}
        subtitle={
          "Easily add and manage assigned users with specific roles like Doctor, Pharmacist, Receptionist, \n or Admin. View existing assignments and onboard new team members in one place."
        }
        icon={UserPlus}
      />
    </div>
  );
};

export default AssignUsers;
